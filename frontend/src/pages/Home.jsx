import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Calculator, ChevronDown } from 'lucide-react';

import ExperienceCanvas from '../components/canvas/ExperienceCanvas';
import ConsultationModal from '../components/ui/ConsultationModal';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

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

      {/* Hero Section with 85% Visible Background Video */}
      <div 
        id="home"
        className="relative h-screen w-full overflow-hidden"
      >
        <ExperienceCanvas />
      </div>

      {/* Desktop Floating Quick-Access Dock */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 bg-slate-950/80 backdrop-blur-xl border border-white/15 p-1.5 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
        
        {/* Book Consultation Slot */}
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#2596be]/30 hover:scale-105 active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </button>

        {/* Client Portal */}
        <Link
          to="/login"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
          title="Access Client Project Portal"
        >
          <User className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Portal</span>
        </Link>

        {/* Cost Calculator */}
        <Link
          to="/calculator"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
          title="Estimate Project Cost"
        >
          <Calculator className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Calculator</span>
        </Link>

        {/* Skip to Content Button */}
        <button
          onClick={handleSkipToContent}
          className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-sans text-slate-300 hover:text-white hover:bg-white/10 transition-colors border-l border-white/15 ml-1"
          title="Explore Full Architectural Details Below"
        >
          <span>Explore</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Downstream Content Sections */}
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
