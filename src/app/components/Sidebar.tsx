import { Users, TrendingUp, Eye, FileText, ShoppingCart, Zap, UserCog, LayoutDashboard } from 'lucide-react';

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

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-[#EAEAEA] flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 800, color: '#3d1f0f', letterSpacing: 1, lineHeight: 1.1 }}>OAK &amp;</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 800, color: '#3d1f0f', letterSpacing: 1, lineHeight: 1.1 }}>CHISEL</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <div style={{ width: 48, height: 1.5, background: '#8B4513' }} />
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 9, color: '#8B4513', letterSpacing: 1 }}>EST° 2020</span>
          </div>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 7.5, color: '#8B4513', letterSpacing: 2, marginTop: 2 }}>HANDCRAFTED WOODEN FURNITURE</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer
                ${isActive
                  ? 'bg-[#6A4A3C] text-white'
                  : 'text-[#777777] hover:bg-[#F5F5F7]'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
