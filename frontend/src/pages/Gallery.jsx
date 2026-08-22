import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../services/api';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { value: 'all', label: 'All Photos' },
  { value: 'luxury_homes', label: 'Luxury Homes' },
  { value: 'modern_villas', label: 'Modern Villas' },
  { value: 'interiors', label: 'Interiors' },
  { value: 'landscaping', label: 'Landscaping' }
];

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    galleryAPI.list().then(res => setGallery(res.data));
  }, []);

  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            GALLERY
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            09 // VISUAL ARCHIVE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            VISUAL <span className="text-[#2596be]">GALLERY.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Exquisite facades, open-concept living spaces, tropical courtyards, and manicured gardens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.value
                  ? 'bg-[#2596be] text-white shadow-md shadow-[#2596be]/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map(item => (
            <div 
              key={item.id} 
              className="break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 group relative cursor-zoom-in hover:shadow-[0_16px_50px_rgba(37,150,190,0.12)] transition-all duration-500 hover:-translate-y-1"
              onClick={() => setLightboxImage(item)}
            >
              <div className="overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-sm font-bold text-[#3b2314] font-sans">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
              <div className="p-4 bg-slate-900 text-white text-center">
                <h4 className="font-bold text-base">{lightboxImage.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{lightboxImage.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
