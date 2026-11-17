import React from 'react';
import ProfessionGrid from '../components/ProfessionGrid';
import { SearchX, Filter } from 'lucide-react';

export default function ProfessionSelection({
  professions = [],
  counts = {},
  loading = false,
  selectedSector = 'All',
  onSelectSector,
  sectors = [],
  searchTerm = '',
  onClearSearch,
  onAdjustCount,
  onSelectProfession,
}) {
  return (
    <section id="professions" className="pt-2 pb-14 w-full">
      {/* Expansive width container with minimal side gaps */}
      <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-10">
        
        {/* Sector Filter Chips */}
        {sectors.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#77716B] mr-1">
              <Filter className="w-3.5 h-3.5 text-[#FF8A1F]" />
              <span>Sectors:</span>
            </div>
            {sectors.map((sec) => {
              const isActive = selectedSector === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onSelectSector?.(sec)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all select-none border ${
                    isActive
                      ? 'bg-[#FF8A1F] text-white border-[#FF8A1F] shadow-sm'
                      : 'bg-[#FFF2E5]/70 text-[#7C4D22] border-[#F2D7C2] hover:bg-[#FFE3CD] hover:border-[#FF8A1F]/50'
                  }`}
                >
                  {sec}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Search Feedback Banner */}
        {searchTerm.trim() && professions.length > 0 && (
          <div className="mb-5 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#FFF5EA] border border-[#FF8A1F]/30 text-xs font-bold text-[#8C4B14] shadow-sm animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF8A1F] animate-pulse" />
              <span>
                Found <strong className="text-[#FF8A1F]">{professions.length}</strong> {professions.length === 1 ? 'profession' : 'professions'} matching &ldquo;{searchTerm}&rdquo;
              </span>
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              className="text-[#FF8A1F] hover:text-[#C75A00] hover:underline ml-3 font-extrabold cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#77716B]">
            <div className="w-10 h-10 rounded-full border-4 border-[#FF8A1F] border-t-transparent animate-spin mb-3" />
            <p className="text-xs font-semibold">Loading Professional Grid...</p>
          </div>
        ) : professions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 rounded-[2.5rem] bg-[#FAF6EE] border border-[#E5DDD0] text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF0E0] flex items-center justify-center text-[#FF8A1F] mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#1F1F1F] mb-2">No Professions Found</h3>
            <p className="text-sm text-[#77716B] max-w-md mb-6">
              No matching roles found for &quot;{searchTerm}&quot; in {selectedSector === 'All' ? 'any sector' : selectedSector}.
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="px-6 py-2.5 rounded-full bg-[#FF8A1F] hover:bg-[#E8750E] text-white text-sm font-bold shadow-sm transition-all"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <ProfessionGrid
            professions={professions}
            counts={counts}
            onAdjustCount={onAdjustCount}
            onSelectProfession={onSelectProfession}
          />
        )}
      </div>
    </section>
  );
}
