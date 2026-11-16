import React, { useState } from 'react';
import { ArrowUpRight, Users } from 'lucide-react';
import AnimalImage from './AnimalImage';

export default function ProfessionCard({ profession, count = 0, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(profession)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(profession);
        }
      }}
      className={`group relative flex flex-col justify-between bg-[#FFFFFF] rounded-[2.25rem] p-4 sm:p-5 transition-all duration-300 ease-out border text-left cursor-pointer outline-none select-none hover:scale-[1.018] hover:-translate-y-1 hover:shadow-[0_20px_42px_-12px_rgba(40,25,10,0.14)] hover:border-[#FF8A1F] ${
        isHovered
          ? 'border-[#FF8A1F] shadow-[0_20px_42px_-12px_rgba(40,25,10,0.14)]'
          : 'border-[#EAE3D7] shadow-soft hover:border-[#FF8A1F]/60'
      }`}
    >
      {/* ── Expansive Recessed Showcase Niche with 3D Depth ── */}
      <div className="relative w-full h-60 sm:h-72 lg:h-80 rounded-[1.75rem] bg-gradient-to-b from-[#E7E0D3] via-[#F2ECE1] to-[#FBF8F3] p-4 flex flex-col justify-between overflow-hidden border border-[#DCD3C4] shadow-[inset_0_5px_14px_rgba(0,0,0,0.08),inset_0_-2px_6px_rgba(255,255,255,0.85)]">
        {/* Subtle Ambient Backing Vignette */}
        <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-black/[0.02] to-white/40 pointer-events-none" />

        {/* Top Header Bar inside Niche: Category Pill (z-30 ensures it is NEVER overlapped) */}
        <div className="relative z-30 flex items-center justify-between w-full pointer-events-none">
          <span className="text-[10px] font-bold text-[#8A7D70] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/5 backdrop-blur-sm">
            {profession.sector}
          </span>
          <div className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#554F47] border border-[#E0D5C7] shadow-sm select-none pointer-events-auto">
            {profession.badge}
          </div>
        </div>

        {/* Mascot Figurine Area (Centered in remaining space, well clear of the badge) */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center pt-1 pb-2 transition-transform duration-300 ease-out group-hover:scale-105">
          {/* Soft 3D Ground Contact Shadow */}
          <div className="absolute bottom-2 w-36 sm:w-44 h-5 rounded-[100%] bg-black/16 blur-md pointer-events-none" />

          <AnimalImage
            species={profession.species}
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 object-contain filter drop-shadow-[0_16px_22px_rgba(25,15,5,0.22)]"
          />
        </div>
      </div>

      {/* ── Systematic Typography Below Niche ── */}
      <div className="mt-4 px-1.5 flex flex-col justify-between flex-grow pb-1">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#FF8A1F]">
                {profession.animal}
              </span>
              {profession.sector && (
                <span className="text-[10px] font-bold text-[#77716B] px-2 py-0.5 rounded-full bg-[#F4EDE2] border border-[#E7DFD2]">
                  {profession.sector}
                </span>
              )}
            </div>
            <div className="w-6 h-6 rounded-full bg-[#FFF8F1] flex items-center justify-center text-[#B8ACA0] group-hover:text-[#FF8A1F] group-hover:bg-[#FF8A1F]/15 transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-[#1D1D1F] tracking-tight leading-snug mt-1 group-hover:text-[#FF8A1F] transition-colors">
            {profession.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#77716B] font-medium mt-1 line-clamp-1">
            {profession.gear}
          </p>
        </div>
      </div>

      {/* ── Overlapping Count Badge (Smoothly enlarges a little on hover) ── */}
      <div
        className="absolute -bottom-3.5 -right-2.5 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF8A1F] text-white text-xs font-black shadow-md border-2 border-white select-none transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg cursor-default"
      >
        <Users className="w-3.5 h-3.5 text-white shrink-0" />
        <span>{count} Registered</span>
      </div>
    </div>
  );
}
