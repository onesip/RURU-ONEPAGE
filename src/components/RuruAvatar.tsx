import React from 'react';

interface RuruAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

export function RuruAvatar({ size = 'md', className = '' }: RuruAvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden border-2 border-pink-200/80 shadow-sm bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 select-none ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="ruruBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="ruruHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>
        </defs>
        
        {/* Soft background glow */}
        <circle cx="50" cy="50" r="48" fill="url(#ruruBg)" />

        {/* Cute star hair clip */}
        <path d="M78 22 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#fef08a" />

        {/* Twin buns back */}
        <circle cx="23" cy="38" r="14" fill="url(#ruruHair)" />
        <circle cx="77" cy="38" r="14" fill="url(#ruruHair)" />

        {/* Face */}
        <circle cx="50" cy="55" r="27" fill="#ffe4e6" />

        {/* Blushes */}
        <ellipse cx="35" cy="58" rx="6" ry="3" fill="#f43f5e" fillOpacity="0.45" />
        <ellipse cx="65" cy="58" rx="6" ry="3" fill="#f43f5e" fillOpacity="0.45" />

        {/* Eyes */}
        <ellipse cx="39" cy="51" rx="4" ry="5" fill="#3b0764" />
        <circle cx="38" cy="49" r="1.8" fill="#ffffff" />
        <circle cx="41" cy="53" r="0.8" fill="#ffffff" />

        <ellipse cx="61" cy="51" rx="4" ry="5" fill="#3b0764" />
        <circle cx="60" cy="49" r="1.8" fill="#ffffff" />
        <circle cx="63" cy="53" r="0.8" fill="#ffffff" />

        {/* Sweet smile */}
        <path
          d="M45 61 Q50 65 55 61"
          fill="none"
          stroke="#be123c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Hair Bangs */}
        <path
          d="M23 45 Q35 26 50 31 Q65 26 77 45 Q65 35 50 37 Q35 35 23 45 Z"
          fill="url(#ruruHair)"
        />

        {/* Little heart on bun */}
        <path d="M72 32 C69 28, 77 25, 75 31 Z" fill="#f43f5e" />
        <path d="M76 32 C79 28, 71 25, 73 31 Z" fill="#f43f5e" />
      </svg>
    </div>
  );
}
