import React from 'react';
import ProfessionCard from './ProfessionCard';

export default function ProfessionGrid({
  professions,
  counts = {},
  onSelectProfession,
}) {
  return (
    <div className="w-full">
      {/* ── Expansive Showcase Chassis with minimal side margins ── */}
      <div className="p-4 sm:p-7 lg:p-9 rounded-[2.75rem] bg-[#FAF6EE] border border-[#E5DDD0] shadow-[0_14px_45px_-10px_rgba(40,30,20,0.07),0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Strictly 3-column layout on desktop & tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {professions.map((prof) => (
            <ProfessionCard
              key={prof.id || prof.slug}
              profession={prof}
              count={counts[prof.id] || 0}
              onSelect={onSelectProfession}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
