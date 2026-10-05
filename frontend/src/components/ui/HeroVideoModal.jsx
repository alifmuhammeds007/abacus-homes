import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, AlertCircle } from 'lucide-react';

const HeroVideoModal = ({ isOpen, onClose, videoSrc = '/videos/hero-tour.mp4' }) => {
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10"
        >

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2.5 text-white">
              <div className="p-2 rounded-lg bg-[#2596be]/20 text-[#2596be]">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-white tracking-wide">
                  Abacus Homes Architectural Tour
                </h3>
                <p className="text-xs text-slate-400">Cinematic Villa & Construction Showcase</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            {hasError ? (
              <div className="p-8 text-center max-w-md">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">Video File Pending</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Place your local video file in your project folder at:
                </p>
                <code className="block bg-slate-900 text-[#2596be] px-3 py-2 rounded-lg text-xs font-mono mb-4 border border-slate-800">
                  frontend/public/videos/hero-tour.mp4
                </code>
                <p className="text-slate-500 text-[11px]">
                  Supported formats: <span className="text-slate-300 font-semibold">.mp4</span>, <span className="text-slate-300 font-semibold">.webm</span>
                </p>
              </div>
            ) : (
              <video
                controls
                autoPlay
                playsInline
                onError={() => setHasError(true)}
                className="w-full h-full object-contain"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support playing this video.
              </video>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HeroVideoModal;
