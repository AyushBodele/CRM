import { Search, Bell, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

export function Header({ activeTab }: HeaderProps) {
  return (
    <div className="h-20 bg-white border-b border-[#EAEAEA] flex items-center justify-between px-8">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="font-bold text-[24px]">{activeTab}</h1>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full h-12 pl-12 pr-4 bg-[#F5F5F7] border border-[#EAEAEA] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#F5F5F7] transition-colors">
          <Globe className="w-5 h-5 text-[#777777]" />
          <span className="text-sm font-medium text-[#777777]">Eng (US)</span>
        </button>

        <button className="relative p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors">
          <Bell className="w-5 h-5 text-[#777777]" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-[#E74C3C] rounded-full"></div>
        </button>

        <div className="flex items-center gap-3 ml-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6A4A3C] to-[#50372D] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AS</span>
          </div>
          <div className="text-left">
            <div className="font-semibold text-sm">Anurag</div>
            <div className="text-xs text-[#A0A0A0]">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
