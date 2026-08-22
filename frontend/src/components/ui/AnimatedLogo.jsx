import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({
  variant = 'light', // 'light' for dark backgrounds, 'dark' for light backgrounds
  layout = 'horizontal', // 'horizontal', 'stacked', 'icon-only'
  className = '',
  iconSize = 'h-10 w-10 sm:h-11 sm:w-11',
  animated = true,
}) => {
  const isDarkBg = variant === 'light'; // Light text for dark background
  const textColor = isDarkBg ? 'text-white' : 'text-slate-900';
  const subTextColor = isDarkBg ? 'text-gold' : 'text-emerald-800';
  const roofColor = isDarkBg ? '#34d399' : '#064e3b';
  const roofColor2 = isDarkBg ? '#fbbf24' : '#1b4332';

  // SVG Animated Icon Mark
  const IconMark = (
    <div className={`relative ${iconSize} shrink-0 flex items-center justify-center`}>
      <motion.svg
        viewBox="0 0 160 125"
        className="w-full h-full drop-shadow-md overflow-visible"
        initial={animated ? { scale: 0.95, opacity: 0 } : false}
        animate={animated ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.08 }}
      >
        <defs>
          {/* House Gradient */}
          <linearGradient id="houseGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8fa31e" />
            <stop offset="100%" stopColor="#5f7012" />
          </linearGradient>

          {/* Gold Sash Gradient */}
          <linearGradient id="goldSashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbb03b" />
            <stop offset="50%" stopColor="#ffd27d" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Green Sash Gradient */}
          <linearGradient id="greenSashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006837" />
            <stop offset="100%" stopColor="#0b4625" />
          </linearGradient>

          {/* Animated Light Shimmer Beam */}
          <linearGradient id="shimmerBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="transparent" />
            {animated && (
              <animate
                attributeName="x1"
                from="-100%"
                to="200%"
                dur="3.5s"
                repeatCount="indefinite"
              />
            )}
            {animated && (
              <animate
                attributeName="x2"
                from="0%"
                to="300%"
                dur="3.5s"
                repeatCount="indefinite"
              />
            )}
          </linearGradient>

          {/* Glow filter for roofs */}
          <filter id="roofGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. OVERLAPPING DUAL GABLE ROOF LINES (Animated Draw & Gleam) */}
        {/* Left Roof Ridge */}
        <motion.path
          d="M 12 60 L 62 14 L 115 44"
          fill="none"
          stroke={roofColor}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={animated ? { pathLength: 1 } : false}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {/* Right Overlapping Roof Ridge */}
        <motion.path
          d="M 48 46 L 86 10 L 148 50"
          fill="none"
          stroke={roofColor2}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={animated ? { pathLength: 1 } : false}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
        />

        {/* 2. CHIMNEY DORMER WITH 4-PANE WINDOW */}
        <rect x="44" y="24" width="18" height="20" rx="1" fill="#4d5c0e" />
        {/* 4 Glowing Window Panes */}
        <g fill="#fef08a" opacity="0.95">
          <rect x="46.5" y="26.5" width="5.5" height="6.5" rx="0.5" />
          <rect x="54" y="26.5" width="5.5" height="6.5" rx="0.5" />
          <rect x="46.5" y="34.5" width="5.5" height="6.5" rx="0.5" />
          <rect x="54" y="34.5" width="5.5" height="6.5" rx="0.5" />
        </g>

        {/* 3. SOLID OLIVE GREEN HOUSE SILHOUETTE */}
        <path
          d="M 34 46 L 118 46 L 118 52 L 125 52 L 125 110 L 28 110 L 28 52 L 34 52 Z"
          fill="url(#houseGreenGrad)"
        />

        {/* 4. DYNAMIC FLOWING 3-STRIPE SASH RIBBONS (Green, White, Gold) */}
        {/* Green Outer Ribbon */}
        <motion.path
          d="M 112 36 C 120 40, 126 56, 116 70 C 102 88, 70 102, 30 108 L 28 102 C 68 96, 96 82, 108 66 C 114 54, 110 42, 104 36 Z"
          fill="url(#greenSashGrad)"
          animate={animated ? {
            d: [
              "M 112 36 C 120 40, 126 56, 116 70 C 102 88, 70 102, 30 108 L 28 102 C 68 96, 96 82, 108 66 C 114 54, 110 42, 104 36 Z",
              "M 112 36 C 122 42, 124 58, 114 72 C 100 90, 68 103, 30 108 L 28 102 C 66 97, 94 84, 106 68 C 112 56, 110 44, 104 36 Z",
              "M 112 36 C 120 40, 126 56, 116 70 C 102 88, 70 102, 30 108 L 28 102 C 68 96, 96 82, 108 66 C 114 54, 110 42, 104 36 Z",
            ]
          } : false}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* White Middle Ribbon */}
        <motion.path
          d="M 116 44 C 122 52, 120 66, 108 80 C 94 96, 62 108, 30 110 L 29 105 C 60 103, 90 91, 102 76 C 112 62, 114 52, 108 44 Z"
          fill="#ffffff"
        />

        {/* Vibrant Gold Inner Ribbon */}
        <motion.path
          d="M 118 52 C 122 62, 116 76, 102 90 C 86 104, 56 112, 30 112 L 30 107 C 54 107, 82 99, 96 86 C 108 72, 112 60, 110 52 Z"
          fill="url(#goldSashGrad)"
        />

        {/* 5. SHIMMER OVERLAY ON SASH */}
        <path
          d="M 28 40 L 126 40 L 126 112 L 28 112 Z"
          fill="url(#shimmerBeam)"
          opacity="0.6"
          style={{ mixBlendMode: 'overlay' }}
        />
      </motion.svg>
    </div>
  );

  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {IconMark}
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center group cursor-pointer ${className}`}>
        {IconMark}
        <div className="mt-2 flex flex-col items-center">
          <span className={`font-serif font-extrabold text-xl sm:text-2xl tracking-[0.22em] uppercase leading-tight ${textColor} transition-colors group-hover:text-gold`}>
            ABACUS
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-5 h-[1px] bg-gold/70" />
            <span className={`text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.35em] uppercase ${subTextColor}`}>
              HOMES
            </span>
            <span className="w-5 h-[1px] bg-gold/70" />
          </div>
        </div>
      </div>
    );
  }

  // Default: Horizontal Layout (For Navbar & Headers)
  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {IconMark}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span className={`font-serif font-extrabold text-base sm:text-lg lg:text-xl tracking-[0.20em] uppercase leading-none ${textColor} transition-colors group-hover:text-gold-light`}>
            ABACUS
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-3 sm:w-4 h-[1px] bg-gold/60" />
          <span className={`text-[8px] sm:text-[9px] font-serif font-bold tracking-[0.32em] uppercase leading-none ${subTextColor}`}>
            HOMES
          </span>
          <span className="w-3 sm:w-4 h-[1px] bg-gold/60" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
