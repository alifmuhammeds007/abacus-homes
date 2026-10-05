import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Calendar, Calculator, ChevronDown, Play } from 'lucide-react';

import ExperienceCanvas from '../components/canvas/ExperienceCanvas';
import ConsultationModal from '../components/ui/ConsultationModal';
import HeroVideoModal from '../components/ui/HeroVideoModal';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';

// Register GSAP plugins safely
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const lastStateProgress = useRef(0);

  useEffect(() => {
    // Setup GSAP ScrollTrigger to scrub the 3D canvas smoothly with zero lag
    const ctx = gsap.context(() => {
      if (!scrollContainerRef.current) return;

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Only trigger React state update when progress changes noticeably (prevents 120Hz React re-render spam)
          if (Math.abs(self.progress - lastStateProgress.current) > 0.004 || self.progress === 0 || self.progress === 1) {
            lastStateProgress.current = self.progress;
            setScrollProgress(self.progress);
          }
        },
      });
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  const handleSkipToContent = () => {
    const targetEl = document.getElementById('about');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans">
      
      {/* Book Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Hero Video Tour Modal */}
      <HeroVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* 
        ========================================================================
        CINEMATIC 3D SCROLL EXPERIENCE (6 SEQUENTIAL SCENES)
        Tuned to 280vh for comfortable, fatigue-free scrolling
        ========================================================================
      */}
      <div 
        ref={scrollContainerRef} 
        id="home"
        className="relative h-[280vh] w-full"
      >
        {/* Sticky Fullscreen 3D WebGL Canvas Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ExperienceCanvas 
            scrollProgress={scrollProgress} 
            scrollProgressRef={scrollProgressRef}
            onOpenVideoModal={() => setIsVideoOpen(true)}
          />
        </div>
      </div>

      {/* 
        ========================================================================
        DESKTOP FLOATING QUICK-ACCESS DOCK
        Provides instant 1-click access to Portal, Book Slot, Calculator, Video Tour, and Skip
        ========================================================================
      */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-slate-200/90 p-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        
        {/* Video Tour Button */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans text-slate-800 hover:text-[#2596be] hover:bg-slate-100 transition-colors font-medium"
          title="Watch Architectural Video Tour"
        >
          <Play className="w-3.5 h-3.5 text-[#2596be] fill-[#2596be]" />
          <span>Video Tour</span>
        </button>

        {/* Book Consultation Slot */}
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#2596be]/20 hover:scale-105 active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </button>

        {/* Client Portal */}
        <Link
          to="/login"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans text-slate-700 hover:text-[#2596be] hover:bg-slate-100 transition-colors"
          title="Access Client Project Portal"
        >
          <User className="w-3.5 h-3.5 text-[#2596be]" />
          <span>Portal</span>
        </Link>

        {/* Cost Calculator */}
        <Link
          to="/calculator"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans text-slate-700 hover:text-[#2596be] hover:bg-slate-100 transition-colors"
          title="Estimate Project Cost"
        >
          <Calculator className="w-3.5 h-3.5 text-[#2596be]" />
          <span>Calculator</span>
        </Link>

        {/* Skip to Content Button */}
        <button
          onClick={handleSkipToContent}
          className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-sans text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border-l border-slate-200 ml-1"
          title="Explore Full Architectural Details Below"
        >
          <span>Explore</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 
        ========================================================================
        DOWNSTREAM ARCHITECTURAL CONTENT SECTIONS
        ========================================================================
      */}
      <main className="relative z-30 bg-white">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>

    </div>
  );
};

export default Home;
