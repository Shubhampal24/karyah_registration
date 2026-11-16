import React, { useRef } from 'react';
import { Search, X, Layers } from 'lucide-react';

export default function Header({
  searchTerm = '',
  onSearchChange,
  matchCount,
  totalCount,
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    if (onSearchChange) {
      onSearchChange('');
    }
    inputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-[#EAE2D5] bg-[#FFF9F2]/95 backdrop-blur-md">
      <div className="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-10 py-3 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <a href="#" className="flex flex-col select-none group">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black tracking-tight text-[#FF8A1F] font-sans">
                karyah<span className="text-[#202020]">:</span>
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-[#77716B] -mt-1 font-serif">
              | कर्मशील भव: |
            </span>
          </a>

          {/* Mobile Badge */}
          <div className="sm:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E5] text-[#FF8A1F] text-[11px] font-black border border-[#FF8A1F]/30">
            <Layers className="w-3 h-3" />
            <span>{matchCount ?? totalCount} Roles</span>
          </div>
        </div>

        {/* ── Real-Time Profession Search Bar ── */}
        <div className="w-full sm:max-w-xl md:max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#9E9589] absolute left-4 pointer-events-none transition-colors group-focus-within:text-[#FF8A1F]" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search IT, Civil, Mechanical, Electrical, Project Roles..."
              aria-label="Search professions"
              className="w-full pl-12 pr-10 py-2.5 sm:py-3 rounded-full bg-[#FAF5EC] border-2 border-[#E7DFD2] focus:border-[#FF8A1F] focus:bg-white text-sm sm:text-base font-semibold text-[#1F1F1F] placeholder:text-[#A09689] shadow-inner focus:outline-none focus:ring-4 focus:ring-[#FF8A1F]/15 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-full text-[#A09689] hover:text-[#1F1F1F] hover:bg-[#EAE2D5] transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Registry Sector Tag */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFF1E5] text-[#FF8A1F] text-xs font-black border border-[#FF8A1F]/30 shadow-sm shrink-0">
          <Layers className="w-4 h-4" />
          <span>
            {searchTerm ? `${matchCount} Matches Found` : `Multi-Sector Network (${totalCount || 24})`}
          </span>
        </div>

      </div>
    </header>
  );
}
