import { Plus, Trash2, Send, FileText, CheckCircle2, AlertCircle, Eye, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface QuoteItem {
  id: string;
  name: string;
  material: string;
  qty: number;
  price: number;
}

interface QuotationData {
  id: string;
  client: string;
  date: string;
  total: string;
  status: 'Sent' | 'Approved' | 'Draft';
  items: QuoteItem[];
  discount: number;
}

const mockClients = ['Rakesh Agarwal', 'Priya Sharma', 'Nikhil Deshmukh', 'Sonal Mehta', 'Arjun Kapoor'];

const initialQuotes: QuotationData[] = [
  {
    id: 'QT-2026-001',
    client: 'Rakesh Agarwal',
    date: '19 May 2026',
    total: '₹1,59,300',
    status: 'Sent',
    discount: 0,
    items: [
      { id: '1', name: 'Chesterfield Sofa (3 Seater)', material: 'Premium Brown Leather / Solid Oak Legs', qty: 1, price: 85000 },
      { id: '2', name: 'Teak Coffee Table', material: 'Solid Teak Wood / Glass Top', qty: 1, price: 50000 },
    ]
  },
  {
    id: 'QT-2026-002',
    client: 'Priya Sharma',
    date: '18 May 2026',
    total: '₹53,100',
    status: 'Approved',
    discount: 5000,
    items: [
      { id: '1', name: 'King Size Bed', material: 'Walnut Wood Finish', qty: 1, price: 50000 },
    ]
  },
  {
    id: 'QT-2026-003',
    client: 'Nikhil Deshmukh',
    date: '16 May 2026',
    total: '₹3,42,200',
    status: 'Draft',
    discount: 10000,
    items: [
      { id: '1', name: 'Conference Table', material: 'Mahogany veneer / Metal legs', qty: 1, price: 200000 },
      { id: '2', name: 'Executive Chairs', material: 'Ergonomic mesh', qty: 6, price: 15000 },
    ]
  },
];

export function Quotation() {
  const [quotes, setQuotes] = useState<QuotationData[]>(initialQuotes);
  const [activeSubTab, setActiveSubTab] = useState<'Builder' | 'Draft' | 'Sent' | 'Approved'>('Builder');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<QuotationData | null>(null);

  // Form State
  const [client, setClient] = useState(mockClients[0]);
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', name: 'Chesterfield Sofa (3 Seater)', material: 'Premium Brown Leather / Solid Oak Legs', qty: 1, price: 85000 },
  ]);
  const [discount, setDiscount] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: 'New Furniture Item', material: 'Teak Wood / Walnut Finish', qty: 1, price: 15000 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Calculations for Form
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = Math.max(0, subtotal + gst - discount);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSaveQuote = (status: 'Sent' | 'Approved' | 'Draft') => {
    const newQuote: QuotationData = {
      id: `QT-2026-00${quotes.length + 1}`,
      client,
      date: 'Today',
      total: formatCurrency(grandTotal),
      status,
      items: [...items],
      discount,
    };
    setQuotes([newQuote, ...quotes]);
    setSuccessMsg(`Quotation ${newQuote.id} successfully saved as ${status}!`);
    
    // Reset Form
    setItems([{ id: '1', name: 'Chesterfield Sofa (3 Seater)', material: 'Premium Brown Leather / Solid Oak Legs', qty: 1, price: 85000 }]);
    setDiscount(0);
    
    // Redirect to the tab of the saved quote to see it
    setActiveSubTab(status);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'Sent': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredQuotes = quotes.filter(q => {
    if (activeSubTab === 'Builder') return true;
    return q.status === activeSubTab;
  });

  return (
    <div className="flex flex-col gap-6 overflow-y-auto pr-1 md:pr-2">
      {/* Title & Sub tabs */}
      <div className="flex flex-col gap-4 border-b border-[#EAEAEA] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[18px] md:text-[20px] font-bold text-[#111111]">Quotation Builder</h3>
            <p className="text-xs md:text-sm text-[#A0A0A0]">Manage quotes and book orders for Oak & Chisel</p>
          </div>
        </div>

        {/* Sub-tab buttons — scrollable on mobile */}
        <div className="flex gap-2 bg-[#F5F5F7] p-1.5 rounded-2xl shadow-sm overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveSubTab('Builder'); setSelectedQuoteDetail(null); }}
            className={`px-3 md:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
              activeSubTab === 'Builder' ? 'bg-[#6A4A3C] text-white shadow-md' : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Create New
          </button>
          <button
            onClick={() => { setActiveSubTab('Draft'); setSelectedQuoteDetail(null); }}
            className={`px-3 md:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeSubTab === 'Draft' ? 'bg-[#6A4A3C] text-white shadow-md' : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Drafts ({quotes.filter(q => q.status === 'Draft').length})
          </button>
          <button
            onClick={() => { setActiveSubTab('Sent'); setSelectedQuoteDetail(null); }}
            className={`px-3 md:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeSubTab === 'Sent' ? 'bg-[#6A4A3C] text-white shadow-md' : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Sent ({quotes.filter(q => q.status === 'Sent').length})
          </button>
          <button
            onClick={() => { setActiveSubTab('Approved'); setSelectedQuoteDetail(null); }}
            className={`px-3 md:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeSubTab === 'Approved' ? 'bg-[#6A4A3C] text-white shadow-md' : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Approved ({quotes.filter(q => q.status === 'Approved').length})
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Render Main Content dynamically depending on the selected tab */}
      {activeSubTab === 'Builder' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quotation Creator Form */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EAEAEA] flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between border-b border-[#F5F5F7] pb-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-bold text-[#A0A0A0] uppercase">Select Client</label>
                <select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20 font-semibold text-[#111111] cursor-pointer"
                >
                  {mockClients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-bold text-[#A0A0A0] uppercase">Quote ID</label>
                <div className="px-4 py-2.5 bg-[#F5F5F7] border border-[#EAEAEA] rounded-xl text-sm text-[#777777] font-semibold">
                  QT-2026-00{quotes.length + 1} (Auto-generated)
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[#111111] text-base">Furniture Line Items</h4>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#6A4A3C] text-[#6A4A3C] rounded-lg text-xs font-bold hover:bg-[#6A4A3C]/10 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-3 items-start bg-[#F9F9FB] p-4 rounded-2xl border border-[#EAEAEA] relative group">
                    <div className="flex-1 flex flex-col gap-1 w-full">
                      <label className="text-[10px] font-bold text-[#A0A0A0] uppercase">Item Description</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-lg text-sm focus:outline-none font-semibold text-[#111111]"
                      />
                    </div>

                    <div className="flex-[1.5] flex flex-col gap-1 w-full">
                      <label className="text-[10px] font-bold text-[#A0A0A0] uppercase">Material Specification / Finish</label>
                      <input
                        type="text"
                        value={item.material}
                        onChange={(e) => updateItem(item.id, 'material', e.target.value)}
                        className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-lg text-sm focus:outline-none text-[#555555]"
                      />
                    </div>

                    <div className="w-20 flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#A0A0A0] uppercase">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                        className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-lg text-sm text-center focus:outline-none font-semibold text-[#111111]"
                      />
                    </div>

                    <div className="w-32 flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#A0A0A0] uppercase">Unit Price (₹)</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                        className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-lg text-sm focus:outline-none font-semibold text-[#111111]"
                      />
                    </div>

                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg md:self-end cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quotation Summary */}
            <div className="mt-4 border-t border-[#F5F5F7] pt-4 flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1 max-w-[200px]">
                  <label className="text-[10px] font-bold text-[#A0A0A0] uppercase">Custom Discount (₹)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-lg text-sm focus:outline-none font-semibold text-[#111111]"
                  />
                </div>
                <div className="flex gap-2 text-xs text-[#A0A0A0] items-center">
                  <AlertCircle className="w-4 h-4" />
                  <span>GST calculated automatically at standard 18% for furniture.</span>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-2.5">
                <div className="flex justify-between text-sm text-[#777777]">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-[#111111]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#777777]">
                  <span>GST (18%):</span>
                  <span className="font-semibold text-[#111111]">{formatCurrency(gst)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-red-500 font-medium">
                    <span>Discount:</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="border-t border-[#EAEAEA] my-1"></div>
                <div className="flex justify-between text-lg font-bold text-[#111111]">
                  <span>Grand Total:</span>
                  <span className="text-[#6A4A3C]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-end border-t border-[#F5F5F7] pt-4">
              <button
                onClick={() => handleSaveQuote('Draft')}
                className="px-4 py-2 border border-[#EAEAEA] hover:border-[#6A4A3C] text-[#555555] hover:text-[#6A4A3C] rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSaveQuote('Sent')}
                className="px-4 py-2 bg-white border border-[#10B981] hover:bg-[#10B981]/10 text-[#10B981] rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                WhatsApp to Client
              </button>
              <button
                onClick={() => handleSaveQuote('Approved')}
                className="px-5 py-2 bg-[#6A4A3C] hover:bg-[#50372D] text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Book Order
              </button>
            </div>
          </div>

          {/* Quick List Side Panel */}
          <div className="xl:col-span-1 bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EAEAEA] self-start">
            <h4 className="font-bold text-[#111111] text-base mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#6A4A3C]" />
              Recent Quotes Log
            </h4>
            <div className="flex flex-col gap-3">
              {quotes.slice(0, 4).map((quote) => (
                <div
                  key={quote.id}
                  onClick={() => {
                    setSelectedQuoteDetail(quote);
                    setActiveSubTab(quote.status);
                  }}
                  className="p-3.5 rounded-xl border border-[#EAEAEA] hover:border-[#6A4A3C] transition-all cursor-pointer bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#A0A0A0]">{quote.id}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-sm text-[#111111] mb-1">{quote.client}</h5>
                  <div className="flex justify-between items-center text-xs text-[#777777] mt-3">
                    <span>{quote.date}</span>
                    <span className="font-bold text-[#6A4A3C]">{quote.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Status Lists (Draft, Sent, Approved Tab Contents) */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EAEAEA]">
            <h4 className="font-bold text-lg text-[#111111] mb-4">
              {activeSubTab} Quotations ({filteredQuotes.length})
            </h4>

            {filteredQuotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-[#A0A0A0]">
                <FileText className="w-12 h-12 mb-3 opacity-30 text-[#6A4A3C]" />
                <p className="text-sm font-semibold">No quotations found in {activeSubTab} stage.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#EAEAEA] rounded-2xl">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EAEAEA] bg-[#F5F5F7]/50">
                      <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Quote ID</th>
                      <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Client Name</th>
                      <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Created Date</th>
                      <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Total Value</th>
                      <th className="text-right p-4 text-xs font-bold text-[#A0A0A0] uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-[#EAEAEA] last:border-b-0 hover:bg-[#F9F9FB]/50">
                        <td className="p-4 text-sm font-bold text-[#6A4A3C]">{quote.id}</td>
                        <td className="p-4 text-sm font-bold text-[#111111]">{quote.client}</td>
                        <td className="p-4 text-sm text-[#555555]">{quote.date}</td>
                        <td className="p-4 text-sm font-bold text-[#111111]">{quote.total}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedQuoteDetail(quote)}
                            className="px-3 py-1.5 bg-[#F5F5F7] hover:bg-[#6A4A3C] text-[#555555] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Items
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quotation Detail Drawer (Displays specific items of selected quote) */}
          <div className="xl:col-span-1">
            {selectedQuoteDetail ? (
              <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EAEAEA] flex flex-col gap-5 animate-in slide-in-from-right-4 duration-200">
                <div className="flex justify-between items-start border-b border-[#F5F5F7] pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#A0A0A0] block">{selectedQuoteDetail.id}</span>
                    <h4 className="font-bold text-lg text-[#111111]">{selectedQuoteDetail.client}</h4>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${getStatusColor(selectedQuoteDetail.status)}`}>
                    {selectedQuoteDetail.status}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <h5 className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider">Ordered Furniture</h5>
                  <div className="flex flex-col gap-3">
                    {selectedQuoteDetail.items.map((item, idx) => (
                      <div key={idx} className="bg-[#F9F9FB] p-3.5 rounded-xl border border-[#EAEAEA] flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-sm text-[#111111]">{item.name}</span>
                          <span className="text-xs font-bold text-[#6A4A3C]">x{item.qty}</span>
                        </div>
                        <span className="text-xs text-[#777777]">{item.material}</span>
                        <span className="text-xs font-semibold text-[#111111] self-end mt-1">{formatCurrency(item.price)} each</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#F5F5F7] pt-4 flex flex-col gap-2 text-sm text-[#555555]">
                  {selectedQuoteDetail.discount > 0 && (
                    <div className="flex justify-between text-red-500 font-medium">
                      <span>Discount Given:</span>
                      <span>-{formatCurrency(selectedQuoteDetail.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-[#111111] mt-1">
                    <span>Quoted Total:</span>
                    <span className="text-[#6A4A3C]">{selectedQuoteDetail.total}</span>
                  </div>
                </div>

                {/* Workflow Actions */}
                {selectedQuoteDetail.status !== 'Approved' && (
                  <div className="border-t border-[#F5F5F7] pt-4 flex flex-col gap-2.5">
                    {selectedQuoteDetail.status === 'Draft' && (
                      <button
                        onClick={() => {
                          const updated = quotes.map(q => q.id === selectedQuoteDetail.id ? { ...q, status: 'Sent' as const } : q);
                          setQuotes(updated);
                          setSelectedQuoteDetail({ ...selectedQuoteDetail, status: 'Sent' });
                          setSuccessMsg(`Quote ${selectedQuoteDetail.id} sent successfully!`);
                          setTimeout(() => setSuccessMsg(null), 3000);
                        }}
                        className="w-full py-2 bg-white border border-[#10B981] hover:bg-[#10B981]/10 text-[#10B981] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send/WhatsApp to Client
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const updated = quotes.map(q => q.id === selectedQuoteDetail.id ? { ...q, status: 'Approved' as const } : q);
                        setQuotes(updated);
                        setSelectedQuoteDetail({ ...selectedQuoteDetail, status: 'Approved' });
                        setSuccessMsg(`Order successfully booked for ${selectedQuoteDetail.client}!`);
                        setTimeout(() => setSuccessMsg(null), 3000);
                      }}
                      className="w-full py-2 bg-[#6A4A3C] hover:bg-[#50372D] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Approve & Book Order
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#F5F5F7]/30 border-2 border-dashed border-[#EAEAEA] rounded-3xl p-8 text-center text-[#A0A0A0] flex flex-col items-center justify-center h-48">
                <Eye className="w-8 h-8 mb-2 opacity-30 text-[#6A4A3C]" />
                <p className="text-xs font-semibold">Select a quote to see its specific furniture items & details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
