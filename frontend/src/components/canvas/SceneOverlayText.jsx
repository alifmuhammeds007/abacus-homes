import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play } from 'lucide-react';

const scenes = [
  {
    range: [0.0, 0.20],
    sceneNumber: "01",
    welcome: "WELCOME TO ABACUS HOMES...",
    title: ["FIND PERFECT", "HOME"],
    subtitle: "The compassion and commitment to create spaces that resonate with you; gets us going. We invite you to discover the pinnacle of modern designs.",
    badge: "SCENE 01 // INTRO"
  },
  {
    range: [0.20, 0.40],
    sceneNumber: "02",
    welcome: "ARCHITECTURAL HARMONY...",
    title: ["SCULPTED WITH", "PRECISION"],
    subtitle: "Every line engineered for spatial flow: cantilevered canopies, natural cedar timber cladding, and panoramic glass vistas.",
    badge: "SCENE 02 // APPROACH"
  },
  {
    range: [0.40, 0.60],
    sceneNumber: "03",
    welcome: "STRUCTURAL MASTERY...",
    title: ["EXPLODED", "BREAKDOWN"],
    subtitle: "Inspect each structural layer: reinforced concrete slabs, timber partitions, black steel perimeter frames, and cantilevered balconies.",
    badge: "SCENE 03 // EXPLODED"
  },
  {
    range: [0.60, 0.80],
    sceneNumber: "04",
    welcome: "INTERIOR LUXURY...",
    title: ["BESPOKE", "LIVING SPACES"],
    subtitle: "Step inside: warm parquet floors, minimalist designer lounge, recessed downlights, and seamless 2nd floor master suite connection.",
    badge: "SCENE 04 // INTERIOR"
  },
  {
    range: [0.80, 0.90],
    sceneNumber: "05",
    welcome: "COMPLETE 360° INSPECTION...",
    title: ["ELEGANCE FROM", "EVERY ANGLE"],
    subtitle: "Frameless glass balustrades, manicured bonsai topiary shrubs, river rock garden borders, and autumn landscape integration.",
    badge: "SCENE 05 // ROTATION"
  },
  {
    range: [0.90, 1.0],
    sceneNumber: "06",
    welcome: "YOUR VISION REALIZED...",
    title: ["TURNKEY", "PERFECTION"],
    subtitle: "From 3D blueprint to handover. Experience bespoke Kerala & modern luxury architectural excellence with Abacus Homes.",
    badge: "SCENE 06 // REASSEMBLY"
  }
];

const SceneOverlayText = ({ scrollProgress = 0, onOpenVideoModal }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Smoothly fade out overlay text when scrolling into downstream sections
  const isEnding = scrollProgress > 0.96;
  const overlayOpacity = isEnding ? Math.max(0, 1 - (scrollProgress - 0.96) / 0.04) : 1;

  // Find current active scene
  const activeSceneIndex = scenes.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress <= s.range[1]
  );
  const currentScene = scenes[activeSceneIndex !== -1 ? activeSceneIndex : 0];

  const handleBrochureSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 lg:p-14 transition-opacity duration-300 overflow-hidden"
      style={{ opacity: overlayOpacity }}
    >
      
      {/* ========================================================================= */}
      {/* 1. TOP BAR & TITLE AREA (Settled comfortably downward on mobile)          */}
      {/* ========================================================================= */}
      <div className="pt-20 sm:pt-24 lg:pt-16">
        
        {/* Top Eyebrow & Progress Pill */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.16em] text-[#3e2723] uppercase">
            {currentScene.welcome}
          </p>

          <div className="flex items-center gap-2 bg-white/95 border border-slate-200/90 px-3 py-1 rounded-full backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-slate-700 shadow-xs shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2596be] animate-pulse" />
            <span className="font-semibold tracking-wider hidden sm:inline">{currentScene.badge}</span>
            <span className="font-semibold tracking-wider sm:hidden">{currentScene.sceneNumber}</span>
            <span className="text-[#2596be] font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentScene.sceneNumber}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-sans font-black text-[#3b2314] leading-[1.05] tracking-tight">
              {currentScene.title[0]} <br />
              <span className="text-[#3b2314]">{currentScene.title[1]}</span>
            </h1>

            {/* DESKTOP ONLY: Subtitle & Brochure pill directly under the headline (Left column) */}
            <div className="hidden lg:block max-w-md mt-4">
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {currentScene.subtitle}
              </p>

              {currentScene.sceneNumber === "01" && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <form 
                    onSubmit={handleBrochureSubmit}
                    className="pointer-events-auto flex-1 flex items-center bg-white border border-slate-200/90 rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-md transition-all focus-within:border-[#2596be] focus-within:shadow-[0_8px_30px_rgba(37,150,190,0.15)]"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your mail"
                      required
                      className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#2596be] hover:bg-[#1d7fa2] active:scale-95 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#2596be]/20 shrink-0"
                    >
                      {isSubmitted ? (
                        <span className="flex items-center gap-1.5 text-white font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Sent!
                        </span>
                      ) : (
                        'Get a Brochure'
                      )}
                    </button>
                  </form>

                  {onOpenVideoModal && (
                    <button
                      type="button"
                      onClick={onOpenVideoModal}
                      className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 border border-slate-700 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 text-[#2596be] fill-[#2596be]" />
                      <span>Video Tour</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ========================================================================= */}
      {/* 2. MIDDLE GAP (Kept clear on mobile so the 3D House is perfectly visible)  */}
      {/* ========================================================================= */}
      <div className="flex-1 min-h-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 3. BOTTOM AREA (Mobile: Subtitle & Email placed UNDER the house + Stats)   */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3.5 pb-2">
        
        {/* MOBILE ONLY: Subtitle & Email Brochure Pill placed DOWNWARD of the house */}
        <div className="block lg:hidden pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-desc-${currentScene.sceneNumber}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-white/92 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              {/* Subtitle Statement (The compassion and commitment... ) */}
              <p className="text-slate-700 text-[11px] sm:text-xs leading-relaxed mb-3 font-medium">
                {currentScene.subtitle}
              </p>

              {/* Email / Brochure Input Pill */}
              {currentScene.sceneNumber === "01" && (
                <form 
                  onSubmit={handleBrochureSubmit}
                  className="flex items-center bg-[#fafafa] border border-slate-200 rounded-full p-1 focus-within:border-[#2596be] transition-all"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your mail"
                    required
                    className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#2596be] hover:bg-[#1d7fa2] active:scale-95 text-white font-semibold text-[11px] px-3.5 py-1.5 rounded-full transition-all shadow-sm shrink-0"
                  >
                    {isSubmitted ? 'Sent!' : 'Get a Brochure'}
                  </button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Bottom Metrics Capsule Bar (Desktop & Mobile) */}
        <div className="w-full flex justify-center pointer-events-auto">
          <div className="bg-black text-white px-4 sm:px-10 lg:px-12 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2 sm:gap-8 md:gap-14 max-w-4xl w-full">
            
            {/* Stat 1 */}
            <div className="text-center flex-1">
              <p className="text-sm sm:text-xl font-sans font-extrabold text-white tracking-tight">40K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">customer</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 2 */}
            <div className="text-center flex-1">
              <p className="text-sm sm:text-xl font-sans font-extrabold text-white tracking-tight">20K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Registration done</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 3 */}
            <div className="text-center flex-1">
              <p className="text-sm sm:text-xl font-sans font-extrabold text-white tracking-tight">15K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Units sold</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 4 */}
            <div className="text-center flex-1">
              <p className="text-sm sm:text-xl font-sans font-extrabold text-white tracking-tight">23K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Units sold</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default SceneOverlayText;
