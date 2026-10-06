import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SceneOverlayText = ({ scrollProgress = 0 }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBrochureSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 lg:p-14 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* CENTERED HERO TITLE & CONTENT AREA                                       */}
      {/* ========================================================================= */}
      <div className="pt-24 sm:pt-28 lg:pt-24 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
        
        {/* Top Eyebrow */}
        <div className="mb-3">
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#2596be] uppercase font-sans">
            WELCOME TO ABACUS HOMES...
          </p>
        </div>

        {/* Main Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center w-full"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-tight uppercase text-center mb-4">
            FIND PERFECT <span className="text-[#2596be]">HOME</span>
          </h1>

          {/* DESKTOP ONLY: Subtitle & Brochure pill */}
          <div className="hidden lg:flex flex-col items-center text-center max-w-xl w-full">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium text-center">
              The compassion and commitment to create spaces that resonate with you; gets us going. We invite you to discover the pinnacle of modern designs.
            </p>

            <form 
              onSubmit={handleBrochureSubmit}
              className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-md transition-all focus-within:border-[#2596be] focus-within:shadow-[0_8px_30px_rgba(37,150,190,0.15)] mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none text-left"
              />
              <button
                type="submit"
                className="bg-[#2596be] hover:bg-[#1d7fa2] active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#2596be]/20 shrink-0"
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
          </div>
        </motion.div>

      </div>

      {/* MIDDLE GAP */}
      <div className="flex-1 min-h-[60px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* BOTTOM AREA                                                               */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-4 pb-2">
        
        {/* MOBILE ONLY: Subtitle & Email Brochure Pill */}
        <div className="block lg:hidden pointer-events-auto max-w-md mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/90 shadow-lg text-center"
          >
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-3 font-medium text-center">
              The compassion and commitment to create spaces that resonate with you; gets us going. We invite you to discover the pinnacle of modern designs.
            </p>

            <form 
              onSubmit={handleBrochureSubmit}
              className="flex items-center bg-slate-50 border border-slate-200 rounded-full p-1 focus-within:border-[#2596be] transition-all"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="bg-[#2596be] hover:bg-[#1d7fa2] active:scale-95 text-white font-semibold text-xs px-4 py-1.5 rounded-full transition-all shadow-sm shrink-0"
              >
                {isSubmitted ? 'Sent!' : 'Get Brochure'}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Floating Bottom Metrics Capsule Bar */}
        <div className="w-full flex justify-center pointer-events-auto">
          <div className="bg-slate-900 text-white px-4 sm:px-10 lg:px-12 py-3 rounded-xl sm:rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.18)] flex items-center justify-between gap-2 sm:gap-8 md:gap-14 max-w-4xl w-full">
            
            {/* Stat 1 */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-sans font-extrabold text-white tracking-tight">40K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Customers</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 2 */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-sans font-extrabold text-white tracking-tight">20K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Registrations</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 3 */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-sans font-extrabold text-white tracking-tight">15K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Units Sold</p>
            </div>

            <div className="w-px h-5 sm:h-7 bg-white/20" />

            {/* Stat 4 */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-sans font-extrabold text-white tracking-tight">23K+</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 capitalize">Projects Handed Over</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default SceneOverlayText;
