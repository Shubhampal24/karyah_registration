import React, { useState } from 'react';

/**
 * 3D Animal & Bird Mascot Visual Component
 * Checks for generated 3D image file in /images/${species}.png first,
 * and gracefully falls back to the volumetric sculpted clay render.
 */
export default function AnimalImage({ species, className = "w-full h-full" }) {
  const [formatIndex, setFormatIndex] = useState(0);
  const extensions = ['.jpg', '.png'];

  const handleImgError = () => {
    setFormatIndex(prev => prev + 1);
  };

  // If we've exhausted all image formats, safely fall back to a verified real 3D image
  if (formatIndex >= extensions.length) {
    return (
      <img
        src="/images/bear.jpg"
        alt={`${species} mascot`}
        className={`${className} object-contain rounded-2xl transition-transform duration-300 filter drop-shadow-md`}
        loading="lazy"
      />
    );
  }

  const imageSrc = `/images/${species}${extensions[formatIndex]}`;

  return (
    <img
      src={imageSrc}
      alt={`${species} construction mascot`}
      onError={handleImgError}
      className={`${className} object-contain rounded-2xl transition-transform duration-300 filter drop-shadow-md`}
      loading="lazy"
    />
  );
}

function FallbackClayMascot({ species, className }) {
  switch (species) {
    case 'bear':
      return <SculptedBear className={className} />;
    case 'cat':
      return <SculptedCat className={className} />;
    case 'owl':
      return <SculptedOwl className={className} />;
    case 'beaver':
      return <SculptedBeaver className={className} />;
    case 'fox':
      return <SculptedFox className={className} />;
    case 'otter':
      return <SculptedOtter className={className} />;
    case 'dog':
      return <SculptedDog className={className} />;
    case 'rabbit':
      return <SculptedRabbit className={className} />;
    case 'lion':
      return <SculptedLion className={className} />;
    case 'rhino':
      return <SculptedRhino className={className} />;
    case 'squirrel':
      return <SculptedSquirrel className={className} />;
    case 'elephant':
      return <SculptedElephant className={className} />;
    case 'hamster':
      return <SculptedHamster className={className} />;
    case 'bulldog':
      return <SculptedBulldog className={className} />;
    case 'bull':
      return <SculptedBull className={className} />;
    case 'badger':
      return <SculptedBadger className={className} />;
    case 'tortoise':
      return <SculptedTortoise className={className} />;
    case 'dove':
      return <SculptedDove className={className} />;
    case 'penguin':
      return <SculptedPenguin className={className} />;
    case 'eagle':
      return <SculptedEagle className={className} />;
    case 'horse':
      return <SculptedHorse className={className} />;
    case 'koala':
      return <SculptedKoala className={className} />;
    case 'chameleon':
      return <SculptedChameleon className={className} />;
    default:
      return <SculptedBear className={className} />;
  }
}

// 1. Civil Contractor – Builder Bear
function SculptedBear({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="bearFur3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C97A2E" />
          <stop offset="65%" stopColor="#964C10" />
          <stop offset="100%" stopColor="#632E05" />
        </radialGradient>
        <radialGradient id="helmetYellow3D" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#CA8A04" />
        </radialGradient>
        <radialGradient id="vestOrange3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFA64D" />
          <stop offset="70%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#C74F00" />
        </radialGradient>
        <filter id="studioShadow" x="-20%" y="-15%" width="140%" height="145%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#2A1B12" floodOpacity="0.25" />
        </filter>
      </defs>
      <ellipse cx="120" cy="208" rx="65" ry="14" fill="#000000" opacity="0.14" />
      <ellipse cx="120" cy="206" rx="45" ry="8" fill="#000000" opacity="0.22" />
      <g filter="url(#studioShadow)">
        <ellipse cx="120" cy="160" rx="52" ry="42" fill="url(#bearFur3D)" />
        <path d="M78 138 C80 128 160 128 162 138 L168 188 C168 196 72 196 72 188 Z" fill="url(#vestOrange3D)" />
        <rect x="92" y="138" width="10" height="52" fill="#FFFFFF" opacity="0.95" rx="2" />
        <rect x="138" y="138" width="10" height="52" fill="#FFFFFF" opacity="0.95" rx="2" />
        <rect x="76" y="162" width="88" height="8" fill="#FFFFFF" opacity="0.9" />
        <rect x="156" y="146" width="34" height="14" rx="5" transform="rotate(-25 156 146)" fill="#0284C7" />
        <ellipse cx="158" cy="144" rx="4" ry="7" transform="rotate(-25 158 144)" fill="#BAE6FD" />
        <circle cx="78" cy="80" r="20" fill="url(#bearFur3D)" />
        <circle cx="78" cy="80" r="11" fill="#FDE68A" opacity="0.9" />
        <circle cx="162" cy="80" r="20" fill="url(#bearFur3D)" />
        <circle cx="162" cy="80" r="11" fill="#FDE68A" opacity="0.9" />
        <circle cx="120" cy="106" r="48" fill="url(#bearFur3D)" />
        <ellipse cx="120" cy="122" rx="24" ry="18" fill="#FDE68A" />
        <path d="M112 112 C114 108 126 108 128 112 C128 118 120 124 120 124 C120 124 112 118 112 112 Z" fill="#1C1917" />
        <ellipse cx="118" cy="111" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.6" />
        <ellipse cx="102" cy="100" rx="6" ry="7" fill="#1C1917" />
        <circle cx="104" cy="98" r="2" fill="#FFFFFF" />
        <ellipse cx="138" cy="100" rx="6" ry="7" fill="#1C1917" />
        <circle cx="140" cy="98" r="2" fill="#FFFFFF" />
        <path d="M72 82 C72 48 168 48 168 82 Z" fill="url(#helmetYellow3D)" />
        <path d="M116 52 C116 48 124 48 124 52 L125 80 L115 80 Z" fill="#EAB308" />
        <ellipse cx="120" cy="82" rx="54" ry="9" fill="#FACC15" />
      </g>
    </svg>
  );
}

// 2. Interior Designer – Designer Cat
function SculptedCat({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="catFur3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="60%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
        <radialGradient id="beretIndigo" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="60%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#312E81" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="162" rx="48" ry="38" fill="url(#catFur3D)" />
        <path d="M86 138 C86 156 154 156 154 138 Z" fill="#E11D48" />
        <circle cx="120" cy="150" r="5" fill="#FDE047" />
        <polygon points="76,92 94,42 114,84" fill="url(#catFur3D)" />
        <polygon points="84,86 94,54 108,82" fill="#FDA4AF" />
        <polygon points="164,92 146,42 126,84" fill="url(#catFur3D)" />
        <polygon points="156,86 146,54 132,82" fill="#FDA4AF" />
        <circle cx="120" cy="106" r="46" fill="url(#catFur3D)" />
        <circle cx="100" cy="102" r="14" stroke="#0D9488" strokeWidth="3" fill="#CCFBF1" fillOpacity="0.4" />
        <circle cx="140" cy="102" r="14" stroke="#0D9488" strokeWidth="3" fill="#CCFBF1" fillOpacity="0.4" />
        <line x1="114" y1="102" x2="126" y2="102" stroke="#0D9488" strokeWidth="3" />
        <circle cx="100" cy="102" r="5" fill="#0F766E" />
        <circle cx="140" cy="102" r="5" fill="#0F766E" />
        <circle cx="102" cy="100" r="1.5" fill="#FFFFFF" />
        <circle cx="142" cy="100" r="1.5" fill="#FFFFFF" />
        <polygon points="116,116 124,116 120,121" fill="#F43F5E" />
        <line x1="68" y1="116" x2="94" y2="117" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="124" x2="94" y2="122" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        <line x1="172" y1="116" x2="146" y2="117" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        <line x1="172" y1="124" x2="146" y2="122" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="108" cy="68" rx="42" ry="18" transform="rotate(-16 108 68)" fill="url(#beretIndigo)" />
        <circle cx="102" cy="50" r="4.5" fill="#312E81" />
      </g>
    </svg>
  );
}

// 3. Architect – Wise Owl Bird
function SculptedOwl({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="154" rx="50" ry="52" fill="#334155" />
        <ellipse cx="120" cy="162" rx="32" ry="36" fill="#F1F5F9" />
        <polygon points="84,88 98,52 110,84" fill="#1E293B" />
        <polygon points="156,88 142,52 130,84" fill="#1E293B" />
        <circle cx="94" cy="108" r="24" fill="#FEF08A" stroke="#B45309" strokeWidth="4" />
        <circle cx="94" cy="108" r="12" fill="#0F172A" />
        <circle cx="97" cy="104" r="4" fill="#FFFFFF" />
        <circle cx="146" cy="108" r="24" fill="#FEF08A" stroke="#B45309" strokeWidth="4" />
        <circle cx="146" cy="108" r="12" fill="#0F172A" />
        <circle cx="149" cy="104" r="4" fill="#FFFFFF" />
        <path d="M118 108 Q120 102 122 108" stroke="#B45309" strokeWidth="4" fill="none" />
        <polygon points="115,124 125,124 120,138" fill="#F97316" />
        <path d="M88 78 C88 56 152 56 152 78 Z" fill="#2563EB" />
        <ellipse cx="120" cy="78" rx="40" ry="7" fill="#1D4ED8" />
        <rect x="150" y="144" width="34" height="14" rx="4" transform="rotate(-30 150 144)" fill="#38BDF8" />
      </g>
    </svg>
  );
}

// 4. Carpenter – Craftsman Beaver
function SculptedBeaver({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="158" rx="52" ry="40" fill="#78350F" />
        <circle cx="84" cy="88" r="16" fill="#451A03" />
        <circle cx="156" cy="88" r="16" fill="#451A03" />
        <circle cx="120" cy="112" r="46" fill="#78350F" />
        <ellipse cx="120" cy="126" rx="26" ry="18" fill="#B45309" />
        <circle cx="120" cy="120" r="7" fill="#1C1917" />
        <rect x="113" y="138" width="6" height="12" rx="1.5" fill="#FFFFFF" />
        <rect x="121" y="138" width="6" height="12" rx="1.5" fill="#FFFFFF" />
        <circle cx="102" cy="108" r="5.5" fill="#1C1917" />
        <circle cx="138" cy="108" r="5.5" fill="#1C1917" />
        <path d="M92 80 C92 62 148 62 148 80 Z" fill="#DC2626" />
        <ellipse cx="120" cy="80" rx="38" ry="12" fill="#B91C1C" />
      </g>
    </svg>
  );
}

// 5. Electrician – Sparks Fox
function SculptedFox({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="48" ry="38" fill="#EA580C" />
        <polygon points="78,92 92,38 114,88" fill="#EA580C" />
        <polygon points="88,58 92,38 100,56" fill="#FFFBEB" />
        <polygon points="162,92 148,38 126,88" fill="#EA580C" />
        <polygon points="152,58 148,38 140,56" fill="#FFFBEB" />
        <circle cx="120" cy="108" r="44" fill="#EA580C" />
        <polygon points="104,110 136,110 120,134" fill="#FFFBEB" />
        <circle cx="120" cy="130" r="5" fill="#1C1917" />
        <rect x="90" y="84" width="60" height="18" rx="7" fill="#0284C7" />
        <circle cx="104" cy="93" r="6" fill="#7DD3FC" opacity="0.9" />
        <circle cx="136" cy="93" r="6" fill="#7DD3FC" opacity="0.9" />
      </g>
    </svg>
  );
}

// 6. Plumber – River Otter
function SculptedOtter({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="158" rx="48" ry="42" fill="#78350F" />
        <circle cx="84" cy="94" r="14" fill="#582506" />
        <circle cx="156" cy="94" r="14" fill="#582506" />
        <circle cx="120" cy="112" r="44" fill="#78350F" />
        <ellipse cx="120" cy="126" rx="24" ry="16" fill="#FEF3C7" />
        <circle cx="120" cy="120" r="6.5" fill="#1C1917" />
        <ellipse cx="120" cy="82" rx="40" ry="12" fill="#0284C7" />
        <path d="M90 82 C90 64 150 64 150 82 Z" fill="#0369A1" />
        <rect x="146" y="142" width="36" height="12" rx="4" transform="rotate(-35 146 142)" fill="#DC2626" />
      </g>
    </svg>
  );
}

// 7. Site Supervisor – Guardian Dog
function SculptedDog({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="50" ry="40" fill="#D97706" />
        <path d="M84 136 C86 128 154 128 156 136 L164 186 C164 194 76 194 76 186 Z" fill="#FF8A1F" />
        <ellipse cx="80" cy="108" rx="14" ry="28" transform="rotate(22 80 108)" fill="#92400E" />
        <ellipse cx="160" cy="108" rx="14" ry="28" transform="rotate(-22 160 108)" fill="#92400E" />
        <circle cx="120" cy="110" r="44" fill="#D97706" />
        <ellipse cx="120" cy="126" rx="22" ry="16" fill="#FDE68A" />
        <circle cx="120" cy="120" r="7" fill="#1C1917" />
        <path d="M82 86 C82 58 158 58 158 86 Z" fill="#FACC15" />
        <ellipse cx="120" cy="86" rx="44" ry="7" fill="#EAB308" />
      </g>
    </svg>
  );
}

// 8. Painter – Artisan Rabbit
function SculptedRabbit({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="46" ry="38" fill="#F8FAFC" />
        <ellipse cx="98" cy="50" rx="12" ry="40" transform="rotate(-8 98 50)" fill="#F8FAFC" />
        <ellipse cx="98" cy="50" rx="6" ry="30" transform="rotate(-8 98 50)" fill="#F472B6" />
        <ellipse cx="142" cy="50" rx="12" ry="40" transform="rotate(8 142 50)" fill="#F8FAFC" />
        <ellipse cx="142" cy="50" rx="6" ry="30" transform="rotate(8 142 50)" fill="#F472B6" />
        <circle cx="120" cy="112" r="42" fill="#F8FAFC" />
        <polygon points="116,118 124,118 120,123" fill="#F43F5E" />
        <rect x="154" y="132" width="18" height="34" rx="5" transform="rotate(25 154 132)" fill="#FF8A1F" />
      </g>
    </svg>
  );
}

// 9. Project Manager – Leader Lion
function SculptedLion({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="62" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="162" rx="52" ry="40" fill="#F59E0B" />
        <circle cx="120" cy="110" r="56" fill="#B45309" />
        <circle cx="120" cy="110" r="42" fill="#F59E0B" />
        <ellipse cx="120" cy="124" rx="22" ry="16" fill="#FEF3C7" />
        <polygon points="114,118 126,118 120,125" fill="#1C1917" />
        <path d="M88 84 C88 60 152 60 152 84 Z" fill="#3B82F6" />
        <ellipse cx="120" cy="84" rx="42" ry="7" fill="#2563EB" />
      </g>
    </svg>
  );
}

// 10. Structural Engineer – Titan Rhino
function SculptedRhino({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="64" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="54" ry="42" fill="#64748B" />
        <circle cx="120" cy="112" r="46" fill="#64748B" />
        <polygon points="114,120 126,120 120,86" fill="#E2E8F0" />
        <path d="M84 86 C84 60 156 60 156 86 Z" fill="#4F46E5" />
        <ellipse cx="120" cy="86" rx="46" ry="8" fill="#4338CA" />
      </g>
    </svg>
  );
}

// 11. Procurement – Cargo Squirrel
function SculptedSquirrel({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <path d="M140 170 C190 150 195 70 160 60 C140 55 130 80 135 110 Z" fill="#9A3412" />
        <ellipse cx="112" cy="160" rx="46" ry="38" fill="#9A3412" />
        <circle cx="112" cy="112" r="40" fill="#9A3412" />
        <rect x="92" y="146" width="40" height="34" rx="4" fill="#D97706" />
      </g>
    </svg>
  );
}

// 12. Material Supplier – Logistics Elephant
function SculptedElephant({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="64" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="56" ry="42" fill="#94A3B8" />
        <ellipse cx="70" cy="110" rx="26" ry="36" fill="#94A3B8" />
        <ellipse cx="170" cy="110" rx="26" ry="36" fill="#94A3B8" />
        <circle cx="120" cy="110" r="44" fill="#94A3B8" />
        <path d="M113 118 C113 150 134 154 136 144 C136 132 127 128 127 118 Z" fill="#64748B" />
        <path d="M88 84 C88 58 152 58 152 84 Z" fill="#FACC15" />
        <ellipse cx="120" cy="84" rx="42" ry="7" fill="#EAB308" />
      </g>
    </svg>
  );
}

// 13. Interior Labour – Handy Hamster
function SculptedHamster({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="158" rx="52" ry="40" fill="#FDBA74" />
        <circle cx="120" cy="112" r="44" fill="#FDBA74" />
        <circle cx="92" cy="122" r="16" fill="#FED7AA" />
        <circle cx="148" cy="122" r="16" fill="#FED7AA" />
        <rect x="146" y="142" width="26" height="16" rx="4" fill="#10B981" />
      </g>
    </svg>
  );
}

// 14. Construction Labour – Hardy Bulldog
function SculptedBulldog({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="52" ry="40" fill="#A16207" />
        <circle cx="120" cy="114" r="46" fill="#A16207" />
        <ellipse cx="120" cy="130" rx="24" ry="16" fill="#FDE68A" />
        <ellipse cx="120" cy="122" rx="9" ry="7" fill="#1C1917" />
        <path d="M84 86 C84 58 156 58 156 86 Z" fill="#FACC15" />
        <ellipse cx="120" cy="86" rx="46" ry="7" fill="#EAB308" />
      </g>
    </svg>
  );
}

// 15. Fabricator – Forge Bull
function SculptedBull({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="52" ry="40" fill="#334155" />
        <path d="M74 94 C50 78 62 44 94 76 Z" fill="#F1F5F9" />
        <path d="M166 94 C190 78 178 44 146 76 Z" fill="#F1F5F9" />
        <circle cx="120" cy="112" r="44" fill="#334155" />
        <rect x="96" y="96" width="48" height="50" rx="8" fill="#0F172A" />
        <rect x="104" y="106" width="32" height="12" rx="3" fill="#38BDF8" />
      </g>
    </svg>
  );
}

// 16. Mason – Stone Badger
function SculptedBadger({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="50" ry="40" fill="#475569" />
        <circle cx="120" cy="110" r="44" fill="#F8FAFC" />
        <polygon points="92,70 106,70 114,140 100,140" fill="#1E293B" />
        <polygon points="148,70 134,70 126,140 140,140" fill="#1E293B" />
        <circle cx="104" cy="108" r="4.5" fill="#FFFFFF" />
        <circle cx="136" cy="108" r="4.5" fill="#FFFFFF" />
        <rect x="146" y="148" width="34" height="16" rx="3" fill="#B91C1C" />
      </g>
    </svg>
  );
}

// 17. Flooring Specialist – Master Tortoise
function SculptedTortoise({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="150" rx="54" ry="46" fill="#047857" />
        <circle cx="120" cy="104" r="34" fill="#10B981" />
        <rect x="102" y="162" width="36" height="24" rx="3" fill="#F8FAFC" stroke="#0D9488" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

// 18. POP Technician – Plaster Dove Bird
function SculptedDove({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="158" rx="48" ry="40" fill="#F8FAFC" />
        <circle cx="120" cy="108" r="38" fill="#F8FAFC" />
        <polygon points="115,116 125,116 120,130" fill="#F59E0B" />
        <ellipse cx="120" cy="84" rx="34" ry="9" fill="#78716C" />
      </g>
    </svg>
  );
}

// 19. HVAC Technician – Cool Penguin Bird
function SculptedPenguin({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="154" rx="48" ry="52" fill="#0F172A" />
        <ellipse cx="120" cy="158" rx="30" ry="38" fill="#F8FAFC" />
        <polygon points="113,116 127,116 120,132" fill="#F97316" />
        <rect x="90" y="132" width="60" height="14" rx="5" fill="#2563EB" />
      </g>
    </svg>
  );
}

// 20. Safety Officer – Inspector Eagle Bird
function SculptedEagle({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="58" ry="12" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="50" ry="40" fill="#451A03" />
        <path d="M88 136 C90 128 150 128 152 136 L160 186 C160 194 80 194 80 186 Z" fill="#16A34A" />
        <circle cx="120" cy="106" r="42" fill="#F8FAFC" />
        <path d="M113 116 C113 138 127 138 127 116 Z" fill="#FACC15" />
      </g>
    </svg>
  );
}

// 21. Event & Transport – Speedy Horse
function SculptedHorse({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="52" ry="40" fill="#92400E" />
        <polygon points="90,75 102,40 114,75" fill="#92400E" />
        <polygon points="126,75 138,40 150,75" fill="#92400E" />
        <circle cx="120" cy="110" r="44" fill="#92400E" />
        <rect x="114" y="80" width="12" height="35" rx="5" fill="#FFFFFF" />
        <ellipse cx="120" cy="130" rx="22" ry="16" fill="#FDE68A" />
        <ellipse cx="112" cy="130" rx="3.5" ry="5" fill="#1C1917" />
        <ellipse cx="128" cy="130" rx="3.5" ry="5" fill="#1C1917" />
        <path d="M82 86 C82 58 158 58 158 86 Z" fill="#7C3AED" />
        <ellipse cx="120" cy="86" rx="44" ry="7" fill="#6D28D9" />
      </g>
    </svg>
  );
}

// 22. Hospital Setup – Care Koala
function SculptedKoala({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="208" rx="60" ry="13" fill="#000000" opacity="0.14" />
      <g>
        <ellipse cx="120" cy="160" rx="50" ry="40" fill="#64748B" />
        <path d="M84 136 C86 128 154 128 156 136 L164 186 C164 194 76 194 76 186 Z" fill="#0D9488" />
        <circle cx="74" cy="94" r="24" fill="#64748B" />
        <circle cx="74" cy="94" r="14" fill="#E2E8F0" />
        <circle cx="166" cy="94" r="24" fill="#64748B" />
        <circle cx="166" cy="94" r="14" fill="#E2E8F0" />
        <circle cx="120" cy="110" r="44" fill="#64748B" />
        <ellipse cx="120" cy="118" rx="14" ry="22" fill="#1E293B" />
        <ellipse cx="102" cy="100" rx="5" ry="6" fill="#0F172A" />
        <ellipse cx="138" cy="100" rx="5" ry="6" fill="#0F172A" />
      </g>
    </svg>
  );
}

// 23. Other Professions – Versatile Chameleon
function SculptedChameleon({ className }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="chameleonClay" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <radialGradient id="crestOrange" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="70%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
        <radialGradient id="chameleonHelmet" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#CA8A04" />
        </radialGradient>
      </defs>
      {/* Pedestal Ground Shadows */}
      <ellipse cx="120" cy="208" rx="64" ry="13" fill="#000000" opacity="0.14" />
      <ellipse cx="120" cy="206" rx="44" ry="8" fill="#000000" opacity="0.2" />

      <g>
        {/* Curled Spiral Tail */}
        <path
          d="M60 160 C40 160 36 130 52 120 C64 112 76 122 72 136 C68 146 56 146 56 138"
          stroke="url(#chameleonClay)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />

        {/* Chunky Clay Body */}
        <ellipse cx="120" cy="158" rx="52" ry="42" fill="url(#chameleonClay)" />

        {/* Soft Belly Hue */}
        <ellipse cx="122" cy="164" rx="34" ry="26" fill="#A7F3D0" opacity="0.85" />

        {/* Colorful Crest Spines on Back */}
        <circle cx="85" cy="126" r="7" fill="url(#crestOrange)" />
        <circle cx="98" cy="118" r="8" fill="url(#crestOrange)" />
        <circle cx="112" cy="114" r="8.5" fill="url(#crestOrange)" />

        {/* Round Head */}
        <circle cx="132" cy="116" r="38" fill="url(#chameleonClay)" />

        {/* Snout with happy smile */}
        <ellipse cx="156" cy="126" rx="16" ry="12" fill="url(#chameleonClay)" />
        <path d="M148 128 Q158 136 164 128" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Turret Eye (Iconic Chameleon Eyeball) */}
        <circle cx="130" cy="106" r="17" fill="#6EE7B7" stroke="#047857" strokeWidth="3" />
        <circle cx="132" cy="106" r="10" fill="#FEF08A" />
        <circle cx="134" cy="106" r="5" fill="#0F172A" />
        <circle cx="136" cy="104" r="1.5" fill="#FFFFFF" />

        {/* Swiss Multi-Tool / Wrench in Hand */}
        <rect x="146" y="148" width="34" height="12" rx="4" transform="rotate(-30 146 148)" fill="#E11D48" />
        <circle cx="146" cy="148" r="4" fill="#FFFFFF" />
        <rect x="170" y="132" width="16" height="8" rx="2" transform="rotate(-30 170 132)" fill="#94A3B8" />

        {/* Miniature Safety Hardhat */}
        <path d="M102 90 C102 68 152 68 156 90 Z" fill="url(#chameleonHelmet)" />
        <ellipse cx="128" cy="90" rx="32" ry="7" fill="#FACC15" />
      </g>
    </svg>
  );
}
