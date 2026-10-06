import React from 'react';
import SceneOverlayText from './SceneOverlayText';

const ExperienceCanvas = ({ scrollProgress = 0 }) => {
  return (
    <div className="relative w-full h-full bg-[#f8fafc] overflow-hidden select-none flex items-center justify-center">
      
      {/* 100% Visible Hero Video */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain md:object-cover object-center opacity-100 pointer-events-none transition-all duration-300"
        >
          <source src="/videos/abacushero.mp4" type="video/mp4" />
          <source src="/videos/hero-tour.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Light Bottom Soft Fade for Smooth Content Transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/80 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Hero Typography Overlay */}
      <SceneOverlayText scrollProgress={scrollProgress} />

    </div>
  );
};

export default ExperienceCanvas;
