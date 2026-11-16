import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAE2D5] py-8 text-xs text-[#77716B] mt-auto">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[#FF8A1F] text-base">karyah:</span>
          <span className="font-serif text-[10px] text-[#77716B]">| कर्मशील भव: |</span>
          <span className="text-gray-300">|</span>
          <span>Civil & Construction Professional Network</span>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Karyah Network. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
