import React from 'react';

interface RuruAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24'
};

export function RuruAvatar({ size = 'md', className = '' }: RuruAvatarProps) {
  return (
    <div className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#f7eaff] shadow-[0_5px_0_rgba(168,85,247,0.15)] ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="avatar-bg" x1="15" y1="8" x2="104" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9A8D4" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="avatar-hair" x1="33" y1="24" x2="87" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8B4FE" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="60" fill="url(#avatar-bg)" />
        <circle cx="28" cy="35" r="23" fill="#8653C6" />
        <path d="M18 35C9 26 16 12 29 16C34 5 50 10 49 23C58 29 51 42 40 42L18 35Z" fill="url(#avatar-hair)" />
        <path d="M31 51C31 26 49 16 66 16C88 16 102 33 99 59L94 95H28L31 51Z" fill="#63349D" />
        <ellipse cx="62" cy="64" rx="35" ry="37" fill="#FFE8E5" />
        <path d="M29 55C34 25 55 17 76 22C91 26 101 39 99 56C85 44 72 41 60 42C53 51 41 57 29 58V55Z" fill="url(#avatar-hair)" />
        <path d="M42 34C49 47 50 55 46 66M64 28C70 43 69 55 65 66M83 34C83 47 78 57 74 65" fill="none" stroke="#7540AF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="48" cy="67" rx="6" ry="9" fill="#55277E" />
        <ellipse cx="77" cy="67" rx="6" ry="9" fill="#55277E" />
        <circle cx="46" cy="64" r="2.4" fill="#FFFFFF" />
        <circle cx="75" cy="64" r="2.4" fill="#FFFFFF" />
        <path d="M56 82C60 86 65 86 69 82" fill="none" stroke="#D95F8C" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="38" cy="81" rx="8" ry="4" fill="#F9A8D4" opacity="0.55" />
        <ellipse cx="85" cy="81" rx="8" ry="4" fill="#F9A8D4" opacity="0.55" />
        <path d="M85 27L90 37L101 42L90 47L85 58L80 47L69 42L80 37L85 27Z" fill="#FDE68A" stroke="#FFFFFF" strokeWidth="3" />
        <rect x="20" y="47" width="29" height="12" rx="5" fill="#312E81" transform="rotate(-8 20 47)" />
        <text x="25" y="56" fill="#FFFFFF" fontSize="7" fontWeight="900" transform="rotate(-8 25 56)">RURU</text>
      </svg>
    </div>
  );
}
