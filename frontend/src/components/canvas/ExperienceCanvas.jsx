import React from 'react';
import SceneOverlayText from './SceneOverlayText';

const ExperienceCanvas = ({ scrollProgress = 0 }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      
      {/* 85% Visible Full-bleed Hero Background Video (Perfectly responsive on mobile & desktop) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-[0.85] pointer-events-none"
      >
        <source src="/videos/hero-tour.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Elegant Contrast Gradient Overlay for High Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/50 z-0 pointer-events-none" />

      {/* Subtle Background Architectural Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none z-0 overflow-hidden pr-0 lg:pr-16 select-none">
        <span className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-white/[0.07] tracking-[0.16em] uppercase whitespace-nowrap translate-y-[-14%] sm:translate-y-[-12%] lg:translate-x-[-6%] leading-none">
          ABACUS
        </span>
      </div>

      {/* Hero Typography Overlay */}
      <SceneOverlayText scrollProgress={scrollProgress} />

    </div>
  );
};

export default ExperienceCanvas;
