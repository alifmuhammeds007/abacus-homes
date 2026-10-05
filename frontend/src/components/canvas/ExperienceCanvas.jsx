import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CinematicCamera from './CinematicCamera';
import CinematicLighting from './CinematicLighting';
import BuildingModel from './BuildingModel';
import SceneOverlayText from './SceneOverlayText';

const StudioGround = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <shadowMaterial opacity={0.12} />
    </mesh>
  );
};

const ExperienceCanvas = ({ scrollProgress = 0, scrollProgressRef, onOpenVideoModal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const fallbackRef = useRef(scrollProgress);
  const activeProgressRef = scrollProgressRef || fallbackRef;
  activeProgressRef.current = scrollProgressRef ? scrollProgressRef.current : scrollProgress;

  // High-performance Click-and-Hold Drag Rotation (Zero React re-renders, 0 lag)
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0, y: 0 });

  // Handle responsive viewport resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click-Holding Drag Listener (Mouse & Touch)
  useEffect(() => {
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      dragRotationRef.current.y += deltaX * 0.007;
      dragRotationRef.current.x = Math.max(-0.45, Math.min(0.45, dragRotationRef.current.x + deltaY * 0.005));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      dragRotationRef.current.y += deltaX * 0.008;
      dragRotationRef.current.x = Math.max(-0.45, Math.min(0.45, dragRotationRef.current.x + deltaY * 0.006));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0f172a] overflow-hidden select-none cursor-grab active:cursor-grabbing">
      
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

      {/* Subtle Dark/Light Contrast Overlay for Crisp Typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-black/40 z-0 pointer-events-none" />

      {/* Background Architectural Brand Watermark (Medium sized, clearly visible on both mobile & desktop) */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none z-0 overflow-hidden pr-0 lg:pr-16 select-none">
        <span className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-white/10 tracking-[0.16em] uppercase whitespace-nowrap translate-y-[-14%] sm:translate-y-[-12%] lg:translate-x-[-6%] leading-none drop-shadow-xs">
          ABACUS
        </span>
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full relative z-10"
      >
        {/* Luminous Architectural Studio Fog */}
        <fog attach="fog" args={['#ffffff', 14, 38]} />

        {/* Cinematic Interpolating Camera */}
        <CinematicCamera
          scrollProgress={scrollProgress}
          scrollProgressRef={activeProgressRef}
          isMobile={isMobile}
        />

        {/* Dynamic Studio & Warm Daylight Lighting */}
        <CinematicLighting 
          scrollProgress={scrollProgress}
          scrollProgressRef={activeProgressRef}
        />

        {/* Ground Floor Shadow Plane */}
        <StudioGround />

        {/* Modern Villa Model with Click-Hold Drag Rotation & Exploded Breakdown */}
        <Suspense fallback={null}>
          <BuildingModel
            scrollProgress={scrollProgress}
            scrollProgressRef={activeProgressRef}
            dragRotationRef={dragRotationRef}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* Synchronized 2D Typography & HUD Overlay Matching Reference */}
      <SceneOverlayText scrollProgress={scrollProgress} onOpenVideoModal={onOpenVideoModal} />

    </div>
  );
};

export default ExperienceCanvas;
