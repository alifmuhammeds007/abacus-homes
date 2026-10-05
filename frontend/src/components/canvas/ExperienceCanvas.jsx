import React from 'react';
import SceneOverlayText from './SceneOverlayText';

const ExperienceCanvas = ({ scrollProgress = 0, onOpenVideoModal }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      
      {/* Full-bleed Hero Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 pointer-events-none"
      >
        <source src="/videos/hero-tour.mp4" type="video/mp4" />
      </video>

      {/* Contrast Gradient Overlay for Sharp Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-black/40 z-0 pointer-events-none" />

      {/* Background Architectural Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none z-0 overflow-hidden pr-0 lg:pr-16 select-none">
        <span className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-white/10 tracking-[0.16em] uppercase whitespace-nowrap translate-y-[-14%] sm:translate-y-[-12%] lg:translate-x-[-6%] leading-none drop-shadow-xs">
          ABACUS
        </span>
      </div>

      {/* 2D Typography & HUD Hero Overlay */}
      <SceneOverlayText scrollProgress={scrollProgress} onOpenVideoModal={onOpenVideoModal} />

    </div>
  );
};

export default ExperienceCanvas;
