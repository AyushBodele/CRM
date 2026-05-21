"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import imageCompression from 'browser-image-compression';
import {
  Smartphone, Send, Check, Sparkles, Camera, X, Upload,
  Image as ImageIcon, Download, RotateCcw, Trash2, Copy,
  ZoomIn, ZoomOut, Home, Plus, Package, Share2, Eye,
  FlipHorizontal, FlipVertical
} from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface PremiumProduct {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  price: string;
  color: string;
  qrUrl: string;
  png: string;
}

const premiumProducts: PremiumProduct[] = [
  {
    id: 'prod-sofa',
    name: 'Emperor Chesterfield Sofa',
    category: 'Living Room',
    dimensions: '82" W x 38" D x 30" H',
    price: '₹1,25,000',
    color: 'from-[#12427a]/90 to-[#0b2b4f]/95',
    qrUrl: 'https://modelviewer.dev/examples/augmentedreality/#ar',
    png: 'https://cdn.pixabay.com/photo/2013/07/12/19/20/sofa-154584_1280.png',
  },
  {
    id: 'prod-dining',
    name: 'Royal Teak 8-Seater Dining Table',
    category: 'Dining Room',
    dimensions: '96" L x 42" W x 30" H',
    price: '₹1,85,000',
    color: 'from-[#b87d3b]/90 to-[#804f1c]/95',
    qrUrl: 'https://modelviewer.dev/examples/augmentedreality/#customButton',
    png: 'https://cdn.pixabay.com/photo/2013/07/12/11/58/table-145068_1280.png',
  },
  {
    id: 'prod-bed',
    name: 'Imperial Canopy Bed Frame',
    category: 'Bedroom',
    dimensions: '78" W x 84" L x 88" H',
    price: '₹2,10,000',
    color: 'from-[#3b2a21]/90 to-[#211712]/95',
    qrUrl: 'https://modelviewer.dev/examples/augmentedreality/index.html',
    png: 'https://cdn.pixabay.com/photo/2014/12/21/23/34/bed-575791_1280.png',
  }
];

// ─── Single Draggable Furniture Item on Canvas (2D) ──────────────────────────
function FurnitureItem({ item, isSelected, onSelect, onChange, stageW }: {
  item: any;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onChange: (id: string, patch: any) => void;
  stageW: number;
}) {
  const isDataUrl = item.png && item.png.startsWith('data:');
  const [img] = useImage(item.png, isDataUrl ? undefined : 'anonymous');
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, img]);

  const naturalW = img ? img.naturalWidth || img.width : 200;
  const naturalH = img ? img.naturalHeight || img.height : 200;
  const scale = (stageW * 0.22) / naturalW;

  useEffect(() => {
    if (img && (item.scaleX === null || item.scaleY === null)) {
      const naturalWVal = img.naturalWidth || img.width;
      const calculatedScale = (stageW * 0.22) / naturalWVal;
      onChange(item.id, { scaleX: calculatedScale, scaleY: calculatedScale });
    }
  }, [img, item.scaleX, item.scaleY, stageW, item.id, onChange]);

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.forceUpdate();
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, item.rotation, item.scaleX, item.scaleY, item.x, item.y]);

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        image={img}
        x={item.x}
        y={item.y}
        width={naturalW}
        height={naturalH}
        offsetX={naturalW / 2}
        offsetY={naturalH / 2}
        scaleX={item.scaleX ?? scale}
        scaleY={item.scaleY ?? scale}
        rotation={item.rotation ?? 0}
        draggable
        onClick={(e: any) => { e.cancelBubble = true; onSelect(item.id); }}
        onTap={(e: any) => { e.cancelBubble = true; onSelect(item.id); }}
        onDragEnd={(e: any) => onChange(item.id, { x: e.target.x(), y: e.target.y() })}
        onTransformEnd={() => {
          const node = shapeRef.current;
          onChange(item.id, {
            x: node.x(), y: node.y(),
            scaleX: node.scaleX(), scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled
          enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            if (newBox.width < 30 || newBox.height < 30) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
}

// ─── Room Background ──────────────────────────────────────────────────────────
function RoomBackground({ src, videoElement, stageW, stageH }: {
  src: string | null;
  videoElement: HTMLVideoElement | null;
  stageW: number;
  stageH: number;
}) {
  const isDataUrl = src && src.startsWith('data:');
  const [img] = useImage(src || '', isDataUrl ? undefined : 'anonymous');
  const imageRef = useRef<any>(null);

  useEffect(() => {
    if (videoElement && imageRef.current) {
      const node = imageRef.current;
      node.image(videoElement);
      let animId: number;
      const update = () => {
        if (videoElement.readyState >= videoElement.HAVE_CURRENT_DATA) {
          node.getLayer()?.batchDraw();
        }
        animId = requestAnimationFrame(update);
      };
      update();
      return () => cancelAnimationFrame(animId);
    }
  }, [videoElement]);

  if (videoElement) {
    return <KonvaImage ref={imageRef} image={undefined as any} x={0} y={0} width={stageW} height={stageH} />;
  }
  return img ? <KonvaImage image={img} x={0} y={0} width={stageW} height={stageH} /> : null;
}

// ─── Draggable 3D Model Viewer ────────────────────────────────────────────────
function Draggable3DModel({ item, glbUrl, onPositionChange, onSelect, onDelete, isSelected, containerRef }: {
  item: any;
  glbUrl: string;
  onPositionChange: (id: string, patch: any) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const mvRef = useRef<any>(null);
  const posRef = useRef({ x: item.x, y: item.y });
  const dragState = useRef<{ active: boolean; startX: number; startY: number; offsetX: number; offsetY: number; moved: boolean }>({
    active: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0, moved: false,
  });

  useEffect(() => {
    posRef.current = { x: item.x, y: item.y };
  }, [item.x, item.y]);

  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;

    const onMouseDown = (e: MouseEvent) => {
      dragState.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        offsetX: e.clientX - posRef.current.x,
        offsetY: e.clientY - posRef.current.y,
        moved: false,
      };
      // Don't preventDefault — let model-viewer also get this event for rotate start
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current.active) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        // It's a drag — move the model on canvas
        dragState.current.moved = true;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newX = Math.max(50, Math.min(e.clientX - dragState.current.offsetX, rect.width - 50));
        const newY = Math.max(50, Math.min(e.clientY - dragState.current.offsetY, rect.height - 50));
        posRef.current = { x: newX, y: newY };
        onPositionChange(item.id, { x: newX, y: newY });
        // Block model-viewer from rotating during canvas drag
        if (mv.style.pointerEvents !== 'none') mv.style.pointerEvents = 'none';
      }
    };

    const onMouseUp = () => {
      if (!dragState.current.moved) {
        // It was a click — select
        onSelect(item.id);
      }
      // Restore model-viewer events
      mv.style.pointerEvents = '';
      dragState.current.active = false;
      dragState.current.moved = false;
    };

    mv.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      mv.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [item.id, onPositionChange, onSelect, containerRef]);

  return (
    <div
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        transform: 'translate(-50%, -50%)',
        width: 360,
        height: 360,
        zIndex: isSelected ? 15 : 10,
        userSelect: 'none',
      }}
    >
      {/* model-viewer — handles both drag (canvas move) and rotate/zoom */}
      <model-viewer
        ref={mvRef}
        src={glbUrl}
        alt={item.name || '3D Furniture'}
        camera-controls
        ar
        ar-modes="webxr scene-viewer quick-look"
        shadow-intensity="1"
        exposure="1"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          borderRadius: 12,
          border: isSelected ? '2px solid rgba(106,74,60,0.8)' : '2px solid rgba(255,255,255,0.15)',
        }}
      />

      {/* Delete button — only when selected */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
        style={{
          position: 'absolute',
          top: -10, right: -10,
          width: 26, height: 26,
          borderRadius: '50%',
          background: '#ef4444',
          border: '2px solid #fff',
          color: '#fff',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 20,
          lineHeight: 1,
          opacity: isSelected ? 1 : 0,
          visibility: isSelected ? 'visible' : 'hidden',
          transition: 'opacity 0.15s ease',
          pointerEvents: isSelected ? 'auto' : 'none',
        }}
      >
        ×
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ARPreview() {
  const [roomSrc, setRoomSrc] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadedFurnitures, setUploadedFurnitures] = useState<any[]>([]);
  const [activeLeftTab, setActiveLeftTab] = useState<'catalog' | 'share'>('catalog');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [useDemoRoom, setUseDemoRoom] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const stageRef = useRef<any>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const roomFileRef = useRef<HTMLInputElement>(null);
  const furnitureFileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const STAGE_W = 780;
  const STAGE_H = 520;
  const showroomSrc = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80";

  // Load model-viewer script
  useEffect(() => {
    if (!document.querySelector('script[data-mv]')) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      s.setAttribute('data-mv', '1');
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop());
      }
    };
  }, []);

  // ── Room Upload ──────────────────────────────────────────────────────────
  const handleRoomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 1.2, maxWidthOrHeight: 1400 });
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setRoomSrc(ev.target.result as string);
          setUseDemoRoom(false);
          setSuccessMsg("Room background uploaded!");
          setTimeout(() => setSuccessMsg(null), 3000);
        }
      };
      reader.readAsDataURL(compressed);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Furniture Upload ──────────────────────────────────────────────────────
  const handleFurnitureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const isGlb = file.name.toLowerCase().endsWith('.glb');
      if (isGlb) {
        const blobUrl = URL.createObjectURL(file);
        const placeholder = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%231E1E24'/><path d='M50 20L75 35V65L50 80L25 65V35Z' fill='%236A4A3C' stroke='%23fff' stroke-width='1.5'/><text x='50' y='92' font-family='sans-serif' font-size='8' font-weight='bold' fill='%23fff' text-anchor='middle'>3D GLB</text></svg>`;
        setUploadedFurnitures((prev) => [...prev, {
          id: `furn-${Date.now()}-${Math.random()}`,
          name: file.name.replace(/\.[^.]+$/, ''),
          png: placeholder,
          isGlb: true,
          glbData: blobUrl,
        }]);
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = ev.target?.result;
          if (result) {
            setUploadedFurnitures((prev) => [...prev, {
              id: `furn-${Date.now()}-${Math.random()}`,
              name: file.name.replace(/\.[^.]+$/, ''),
              png: result as string,
              isGlb: false,
            }]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
    setSuccessMsg('Furniture uploaded! Click to place on canvas.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // ── Add to canvas ────────────────────────────────────────────────────────
  const addFurniture = (product: any) => {
    const id = `${product.id}-${Date.now()}`;
    setItems((prev) => [...prev, {
      id, png: product.png, name: product.name,
      x: STAGE_W * 0.5, y: STAGE_H * 0.5,
      scaleX: null, scaleY: null, rotation: 0,
      isGlb: product.isGlb, glbData: product.glbData,
    }]);
    setSelectedId(id);
    if (product.isGlb) setViewMode('3d');
  };

  const removeFromList = (furnId: string) => {
    setUploadedFurnitures((prev) => prev.filter((f) => f.id !== furnId));
  };

  const updateItem = useCallback((id: string, patch: any) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, ...patch } : it));
  }, []);

  // ── Item Controls ────────────────────────────────────────────────────────
  const deleteSelected = () => { setItems((prev) => prev.filter((it) => it.id !== selectedId)); setSelectedId(null); };
  const duplicateSelected = () => {
    const src = items.find((it) => it.id === selectedId);
    if (!src) return;
    const newId = `${src.id}-copy-${Date.now()}`;
    setItems((prev) => [...prev, { ...src, id: newId, x: src.x + 35, y: src.y + 35 }]);
    setSelectedId(newId);
  };
  const rotateSelected = (dir: number) => {
    const src = items.find((it) => it.id === selectedId);
    if (!src) return;
    updateItem(src.id, { rotation: (src.rotation ?? 0) + dir * 15 });
  };
  const scaleSelected = (factor: number) => {
    const src = items.find((it) => it.id === selectedId);
    if (!src) return;
    const base = src.scaleX ?? 0.3;
    updateItem(src.id, { scaleX: base * factor, scaleY: (src.scaleY ?? base) * factor });
  };
  // Flip handlers
  const flipHorizontal = () => {
    const src = items.find((it) => it.id === selectedId);
    if (!src) return;
    const base = src.scaleX ?? 0.3;
    updateItem(src.id, { scaleX: -base, scaleY: src.scaleY ?? base });
  };
  const flipVertical = () => {
    const src = items.find((it) => it.id === selectedId);
    if (!src) return;
    const base = src.scaleY ?? 0.3;
    updateItem(src.id, { scaleX: src.scaleX ?? base, scaleY: -base });
  };

  // ── Camera ───────────────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setUseDemoRoom(false);
      setIsCameraActive(true);
      setSuccessMsg('Live camera active!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setUseDemoRoom(true);
      setIsCameraActive(true);
    }
  };
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t: MediaStreamTrack) => t.stop());
    streamRef.current = null;
    setVideoElement(null);
    setIsCameraActive(false);
    setUseDemoRoom(true);
  };

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setSelectedId(null);
    await new Promise((r) => setTimeout(r, 200));
    try {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      const a = document.createElement('a');
      a.href = uri;
      a.download = 'room-design.png';
      a.click();
      setSuccessMsg('Design saved!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const handleSendWA = () => {
    setSuccessMsg("AR link sent to client's WhatsApp!");
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const selectedItem = items.find((it) => it.id === selectedId);

  // GLB url for selected item
  const getGlbUrl = (item: any) => {
    if (!item) return '';
    if (item.isGlb && item.glbData) return item.glbData;
    if (item.id.startsWith('prod-sofa')) return 'https://modelviewer.dev/shared-assets/models/Chair.glb';
    if (item.id.startsWith('prod-dining')) return 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb';
    if (item.id.startsWith('prod-bed')) return 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb';
    return '';
  };

  // All GLB items on canvas (for 3D mode)
  const glbItems = items.filter((it) => it.isGlb || it.id.startsWith('prod-'));

  const dynamicQrUrl = 'https://modelviewer.dev/examples/augmentedreality/#ar';
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=6A4A3C&data=${encodeURIComponent(dynamicQrUrl)}`;

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto pr-2 font-sans text-[#333333]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6">
        <div>
          <h3 className="text-[24px] font-bold text-[#111111] flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-[#6A4A3C] animate-pulse" />
            AR Projection & Interactive Visualizer
          </h3>
          <p className="text-sm font-semibold text-[#666666] mt-1">
            Place catalog models or upload PNG / GLB files to visualize furniture in your room.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-3.5 rounded-xl text-sm font-bold animate-in fade-in duration-200 shadow-sm">
          <Check className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6 items-start">

        {/* ── Left Panel ── */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-6">

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-[#F5F5F7] rounded-xl border border-[#EAEAEA]">
            {(['catalog', 'share'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveLeftTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeLeftTab === tab ? 'bg-white text-[#111111] shadow-sm' : 'text-[#777777] hover:text-[#111111]'}`}
              >
                {tab === 'catalog' ? <><Package className="w-4 h-4" /> Place Furniture</> : <><Share2 className="w-4 h-4" /> Share & AR</>}
              </button>
            ))}
          </div>

          {activeLeftTab === 'catalog' ? (
            <div className="flex flex-col gap-5">

              {/* Room Background */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-extrabold text-[#777777] uppercase tracking-wider">Room Background</span>
                <div className="grid grid-cols-2 gap-2">
                  <input ref={roomFileRef} type="file" accept="image/*" onChange={handleRoomUpload} className="hidden" />
                  <button onClick={() => roomFileRef.current?.click()}
                    className="flex items-center justify-center gap-2 py-3 px-3 bg-[#F9F9FB] hover:bg-[#F0F0F3] border border-[#EAEAEA] rounded-xl text-xs font-bold text-[#111111] transition-all cursor-pointer shadow-sm">
                    <Home className="w-4 h-4 text-[#6A4A3C]" /> Upload Room
                  </button>
                  {isCameraActive ? (
                    <button onClick={stopCamera}
                      className="flex items-center justify-center gap-2 py-3 px-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold text-red-600 transition-all cursor-pointer">
                      <X className="w-4 h-4" /> Close Camera
                    </button>
                  ) : (
                    <button onClick={startCamera}
                      className="flex items-center justify-center gap-2 py-3 px-3 bg-[#111111] hover:bg-neutral-800 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md">
                      <Camera className="w-4 h-4 text-amber-400" /> Launch Camera
                    </button>
                  )}
                </div>
                {roomSrc && !isCameraActive && (
                  <div className="flex justify-between items-center mt-1 p-2 bg-[#F9F9FB] rounded-xl border border-[#EAEAEA]">
                    <span className="text-xs font-semibold text-[#777777]">Custom room loaded ✓</span>
                    <button onClick={() => { setRoomSrc(null); setUseDemoRoom(true); }} className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer">Reset</button>
                  </div>
                )}
              </div>

              {/* Catalog */}
              <div className="flex flex-col gap-3 pt-2 border-t border-[#F0F0F3]">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-extrabold text-[#777777] uppercase tracking-wider">Showroom Catalog</span>
                  <span className="text-[10px] font-bold text-[#6A4A3C] bg-[#6A4A3C]/10 px-2 py-0.5 rounded-full uppercase">1:1 Scale</span>
                </div>
                <div className="flex flex-col gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {premiumProducts.map((p) => (
                    <div key={p.id} className="p-3 bg-white hover:bg-[#F9F9FB] rounded-2xl border border-[#EAEAEA] flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F9F9FB] border border-[#EAEAEA] p-1 flex items-center justify-center overflow-hidden">
                          <img src={p.png} alt={p.name} className="w-full h-full object-contain drop-shadow-sm" />
                        </div>
                        <div>
                          <h5 className="text-xs font-extrabold text-[#111111] line-clamp-1">{p.name}</h5>
                          <span className="text-[10px] text-[#777777] font-semibold block">{p.dimensions}</span>
                          <span className="text-[11px] text-[#6A4A3C] font-bold mt-0.5 block">{p.price}</span>
                        </div>
                      </div>
                      <button onClick={() => addFurniture(p)}
                        className="p-2 bg-[#6A4A3C]/10 text-[#6A4A3C] hover:bg-[#6A4A3C] hover:text-white rounded-xl transition-all cursor-pointer">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom upload */}
              <div className="flex flex-col gap-3 pt-3 border-t border-[#F0F0F3]">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-extrabold text-[#777777] uppercase tracking-wider">Your Files</span>
                  <input ref={furnitureFileRef} type="file" accept="image/png,image/*,.glb" multiple onChange={handleFurnitureUpload} className="hidden" />
                  <button onClick={() => furnitureFileRef.current?.click()}
                    className="flex items-center gap-1 text-[11px] font-extrabold text-[#6A4A3C] hover:underline cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Upload (.png / .glb)
                  </button>
                </div>
                {uploadedFurnitures.length === 0 ? (
                  <div onClick={() => furnitureFileRef.current?.click()}
                    className="border-2 border-dashed border-[#EAEAEA] hover:border-[#6A4A3C] rounded-2xl p-4 text-center bg-[#F9F9FB]/50 cursor-pointer transition-all flex flex-col items-center gap-1.5">
                    <Upload className="w-5 h-5 text-[#777777]" />
                    <span className="text-[11px] font-bold text-[#111111]">Upload PNG or GLB file</span>
                    <span className="text-[9px] text-[#777777] font-semibold">Transparent PNG cutouts or .glb 3D models</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1">
                    {uploadedFurnitures.map((f) => (
                      <div key={f.id} className="relative group rounded-xl border border-[#EAEAEA] p-1 bg-white flex flex-col items-center">
                        <button onClick={() => addFurniture(f)} className="w-full flex flex-col items-center text-center cursor-pointer">
                          <div className="w-full h-12 rounded-lg bg-[#F9F9FB] p-1 flex items-center justify-center overflow-hidden">
                            <img src={f.png} alt={f.name} className="h-full object-contain" />
                          </div>
                          <span className="text-[9px] font-bold text-[#111111] truncate w-full mt-1 px-0.5">{f.name}</span>
                          {f.isGlb && <span className="text-[8px] font-bold text-[#6A4A3C] bg-[#6A4A3C]/10 px-1.5 py-0.5 rounded-full mt-0.5">3D GLB</span>}
                        </button>
                        <button onClick={() => removeFromList(f.id)}
                          className="absolute -top-1 -right-1 bg-neutral-900 text-white rounded-full p-0.5 hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-full flex flex-col items-center gap-4 bg-[#F9F9FB] border border-[#EAEAEA] rounded-3xl p-6 relative overflow-hidden group">
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  Interactive Web-AR QR Active
                </span>
                <div className="w-44 h-44 bg-white border border-[#EAEAEA] rounded-2xl flex items-center justify-center p-2.5 shadow-md relative transition-transform group-hover:scale-105 duration-300">
                  <img src={qrImageSrc} alt="AR QR Code" className="w-full h-full object-contain" />
                  <div className="absolute left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_12px_#F59E0B] top-1/2 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-[15px] font-extrabold text-[#111111]">Scan on Mobile for WebXR</h4>
                  <p className="text-[11px] font-semibold text-[#777777] mt-1 px-2">View furniture in 1:1 AR inside your real room.</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <button onClick={handleSendWA}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#6A4A3C] hover:bg-[#50372D] text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer w-full">
                  <Smartphone className="w-4 h-4" /> Send AR Link to Client
                </button>
                <button onClick={() => { setSuccessMsg('Link copied!'); setTimeout(() => setSuccessMsg(null), 3000); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#F9F9FB] hover:bg-[#F0F0F3] border border-[#EAEAEA] text-[#111111] font-bold text-xs rounded-xl transition-all cursor-pointer w-full">
                  <Send className="w-4 h-4 text-[#777777]" /> Copy Presentation URL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Canvas ── */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">

          {/* Toolbar */}
          <div className="flex items-center gap-2.5 flex-wrap bg-white rounded-2xl border border-[#EAEAEA] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">

            {/* Status badge */}
            <div className="flex items-center gap-1.5 bg-[#F9F9FB] border border-[#EAEAEA] rounded-xl px-3 py-1.5">
              <span className={`w-2 h-2 rounded-full ${isCameraActive && !useDemoRoom ? 'bg-green-500 animate-ping' : 'bg-[#6A4A3C]'}`} />
              <span className="text-[11px] font-extrabold text-[#111111] uppercase tracking-wider">
                {isCameraActive && !useDemoRoom ? 'Live Camera' : roomSrc ? 'Custom Room' : 'Demo Room'}
              </span>
            </div>

            {isCameraActive && (
              <button onClick={() => setUseDemoRoom(!useDemoRoom)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#111111] border border-[#EAEAEA] rounded-xl text-xs font-bold transition-all cursor-pointer">
                <Eye className="w-3.5 h-3.5" />
                {useDemoRoom ? 'Use Live Feed' : 'Use Showroom'}
              </button>
            )}

            <div className="flex-1 min-w-[10px]" />

            {/* Item controls */}
            {selectedItem && viewMode === '2d' ? (
              <div className="flex items-center gap-1 bg-[#F9F9FB] border border-[#EAEAEA] rounded-xl p-0.5">
                <button onClick={() => rotateSelected(-1)} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Rotate Left"><RotateCcw className="w-4 h-4" /></button>
                <button onClick={() => rotateSelected(1)} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer transform scale-x-[-1]" title="Rotate Right"><RotateCcw className="w-4 h-4" /></button>
                <button onClick={() => scaleSelected(1.1)} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Scale Up"><ZoomIn className="w-4 h-4" /></button>
                <button onClick={() => scaleSelected(0.9)} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Scale Down"><ZoomOut className="w-4 h-4" /></button>
                {/* Flip buttons */}
                <button onClick={flipHorizontal} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Flip Horizontal"><FlipHorizontal className="w-4 h-4" /></button>
                <button onClick={flipVertical} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Flip Vertical"><FlipVertical className="w-4 h-4" /></button>
                <button onClick={duplicateSelected} className="p-1.5 hover:bg-white text-[#6A4A3C] rounded-lg transition-all cursor-pointer" title="Duplicate"><Copy className="w-4 h-4" /></button>
                <button onClick={deleteSelected} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-all cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            ) : null}

            <button onClick={handleSave} disabled={saving}
              className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm">
              <Download className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save Image'}
            </button>
          </div>

          {/* Canvas */}
          <div
            ref={canvasContainerRef}
            className="w-full overflow-hidden border border-[#EAEAEA] rounded-3xl shadow-xl bg-neutral-900 relative group"
            style={{
              height: STAGE_H,
              backgroundImage: viewMode === '3d' && (useDemoRoom ? showroomSrc : roomSrc) ? `url(${useDemoRoom ? showroomSrc : roomSrc})` : 'none',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            onWheel={(e) => { if (viewMode === '3d') e.preventDefault(); }}
            onClick={() => { if (viewMode === '3d') setSelectedId(null); }}
          >
            {viewMode === '3d' ? (
              <>
                {/* Show all GLB items as draggable 3D models */}
                {glbItems.length > 0 ? (
                  glbItems.map((item) => {
                    const glbUrl = getGlbUrl(item);
                    if (!glbUrl) return null;
                    return (
                      <Draggable3DModel
                        key={item.id}
                        item={item}
                        glbUrl={glbUrl}
                        onPositionChange={updateItem}
                        onSelect={setSelectedId}
                        onDelete={(id) => { setItems((prev) => prev.filter((it) => it.id !== id)); setSelectedId(null); }}
                        isSelected={selectedId === item.id}
                        containerRef={canvasContainerRef}
                      />
                    );
                  })
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 bg-black/80 backdrop-blur-sm">
                    <Sparkles className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
                    <p className="text-base font-bold">No 3D models added yet</p>
                    <p className="text-xs text-white/60 mt-1 max-w-md">
                      Add a product from the catalog or upload a .glb file — then drag to position it in 3D mode.
                    </p>
                  </div>
                )}

              </>
            ) : (
              <>
                {/* Camera video element */}
                {isCameraActive && !useDemoRoom && (
                  <video ref={videoRef} autoPlay playsInline muted style={{ display: 'none' }}
                    onLoadedMetadata={() => { if (videoRef.current) setVideoElement(videoRef.current); }} />
                )}

                {/* Empty state */}
                {!roomSrc && useDemoRoom && !isCameraActive && (
                  <div onClick={() => roomFileRef.current?.click()}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer gap-3 bg-black/60 backdrop-blur-sm hover:bg-black/55 transition-all">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/40 text-white">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <div className="text-center text-white px-6">
                      <p className="text-base font-bold">Upload a room photo</p>
                      <p className="text-xs text-white/60 mt-1">Or launch camera / use demo room</p>
                    </div>
                  </div>
                )}

                {/* Konva Stage */}
                <Stage ref={stageRef} width={STAGE_W} height={STAGE_H}
                  onClick={(e: any) => { if (e.target === e.target.getStage()) setSelectedId(null); }}
                  style={{ display: 'block' }}>
                  <Layer>
                    <RoomBackground
                      src={isCameraActive && !useDemoRoom ? null : (useDemoRoom ? showroomSrc : roomSrc)}
                      videoElement={isCameraActive && !useDemoRoom ? videoElement : null}
                      stageW={STAGE_W} stageH={STAGE_H}
                    />
                    {items.map((item) => (
                      <FurnitureItem key={item.id} item={item}
                        isSelected={selectedId === item.id}
                        onSelect={setSelectedId} onChange={updateItem} stageW={STAGE_W} />
                    ))}
                  </Layer>
                </Stage>

                {/* Hint */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl text-center pointer-events-none opacity-80 group-hover:opacity-100">
                  <p className="text-[10px] font-bold text-white">
                    💡 Drag furniture • Resize with corner handles • Rotate/flip from toolbar
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}