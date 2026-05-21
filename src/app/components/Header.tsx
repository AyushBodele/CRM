import { Search, Bell, Globe } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
}

export function Header({ activeTab }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="bg-white border-b border-[#EAEAEA] z-30 sticky top-0">
      {/* Main header row */}
      <div className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 gap-4">
        {/* Left: Page title + search (desktop) */}
        <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
          <h1 className="font-bold text-lg md:text-[24px] whitespace-nowrap truncate">{activeTab}</h1>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <input
              type="text"
              placeholder="Search here"
              className="w-full h-12 pl-12 pr-4 bg-[#F5F5F7] border border-[#EAEAEA] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Mobile search toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5 text-[#777777]" />
          </button>

          {/* Language — hidden on mobile */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#F5F5F7] transition-colors">
            <Globe className="w-5 h-5 text-[#777777]" />
            <span className="text-sm font-medium text-[#777777]">Eng (US)</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors">
            <Bell className="w-5 h-5 text-[#777777]" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#E74C3C] rounded-full"></div>
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-2 md:gap-3 ml-1">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#6A4A3C] to-[#50372D] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-xs md:text-sm">AS</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-semibold text-sm">Anurag</div>
              <div className="text-xs text-[#A0A0A0]">Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile expandable search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 animate-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <input
              autoFocus
              type="text"
              placeholder="Search here"
              className="w-full h-11 pl-12 pr-4 bg-[#F5F5F7] border border-[#EAEAEA] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
