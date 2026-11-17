import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAE2D5] py-8 text-xs text-[#77716B] mt-auto">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.webp"
            alt="Karyah – कर्मशील भव:"
            className="h-8 w-auto object-contain"
          />
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#77716B]">Multi-Sector Professional Network</span>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Karyah Network. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

