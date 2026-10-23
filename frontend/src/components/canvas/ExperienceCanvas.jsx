import React, { useRef, useEffect } from 'react';
import SceneOverlayText from './SceneOverlayText';

const ExperienceCanvas = ({ scrollProgress = 0 }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Guarantee muted state for iOS Safari / Chrome Android mobile autoplay
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback on first touch if mobile browser blocks initial programmatic autoplay
          const handleFirstTouch = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('touchstart', handleFirstTouch);
            window.removeEventListener('click', handleFirstTouch);
          };
          window.addEventListener('touchstart', handleFirstTouch, { once: true, passive: true });
          window.addEventListener('click', handleFirstTouch, { once: true, passive: true });
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-white md:bg-slate-950 overflow-hidden select-none flex items-center justify-center">
      
      {/* 100% Full-Size Hero Video */}
      <div className="absolute inset-0 w-full h-full min-h-[100dvh] flex items-center justify-center z-0 overflow-hidden bg-white md:bg-slate-950">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-contain md:object-cover object-center opacity-100 pointer-events-none transition-all duration-300"
        >
          <source src="/videos/watermark-removed-1000363987.mp4" type="video/mp4" />
          <source src="/videos/abacushero.mp4" type="video/mp4" />
          <source src="/videos/hero-tour.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Typography Overlay */}
      <SceneOverlayText scrollProgress={scrollProgress} />

    </div>
  );
};

export default ExperienceCanvas;
