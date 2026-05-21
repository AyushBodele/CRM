import { Users, TrendingUp, Eye, FileText, ShoppingCart, Zap, UserCog, LayoutDashboard, X, Menu } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Clients' },
  { icon: TrendingUp, label: 'Pipeline' },
  { icon: Eye, label: 'AR Preview' },
  { icon: FileText, label: 'Quotation' },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: Zap, label: 'Triggers' },
  { icon: UserCog, label: 'Staff' },
];

// Bottom nav shows only first 5 items on mobile
const bottomNavItems = menuItems.slice(0, 5);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    setMobileOpen(false);
  };

  const Logo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 800, color: '#3d1f0f', letterSpacing: 1, lineHeight: 1.1 }}>OAK &amp;</span>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 800, color: '#3d1f0f', letterSpacing: 1, lineHeight: 1.1 }}>CHISEL</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
        <div style={{ width: 48, height: 1.5, background: '#8B4513' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 9, color: '#8B4513', letterSpacing: 1 }}>EST° 2020</span>
      </div>
      <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 7.5, color: '#8B4513', letterSpacing: 2, marginTop: 2 }}>HANDCRAFTED WOODEN FURNITURE</span>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar (md+) ── */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-[#EAEAEA] flex-col p-6 z-40">
        <div className="flex items-center gap-3 mb-10">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleTabChange(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer
                  ${isActive ? 'bg-[#6A4A3C] text-white' : 'text-[#777777] hover:bg-[#F5F5F7]'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EAEAEA] flex items-center justify-between px-4 z-40">
        <Logo />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#6A4A3C]" />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col p-6 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#777777]" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleTabChange(item.label)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all cursor-pointer text-left
                      ${isActive ? 'bg-[#6A4A3C] text-white' : 'text-[#777777] hover:bg-[#F5F5F7]'}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* ── Mobile Bottom Nav (quick access) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEAEA] z-40 flex items-center justify-around px-2 py-2 safe-area-pb">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => handleTabChange(item.label)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-w-0
                ${isActive ? 'text-[#6A4A3C]' : 'text-[#A0A0A0]'}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[9px] font-bold truncate max-w-[52px]">{item.label}</span>
            </button>
          );
        })}
        {/* "More" button to open drawer for remaining items */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer text-[#A0A0A0]"
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
          <span className="text-[9px] font-bold">More</span>
        </button>
      </div>
    </>
  );
}
