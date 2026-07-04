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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Our Visual Gallery</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Exquisite Exteriors, Living Spaces, and Landscapes</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.value
                  ? 'bg-gold text-white'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100'
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
              className="break-inside-avoid bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group relative cursor-zoom-in"
              onClick={() => setLightboxImage(item)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <span className="p-2 bg-gold/90 text-white rounded-full self-start mb-3">
                  <ZoomIn className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">{item.title}</h3>
                <p className="text-[10px] text-gold uppercase tracking-widest mt-1 font-semibold">{item.category.replace('_', ' ')}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.title}
                className="max-w-full max-h-[70vh] rounded-lg shadow-2xl object-contain border border-white/15"
              />
              <h3 className="text-white font-serif text-lg font-bold mt-4 tracking-wider">{lightboxImage.title}</h3>
              <p className="text-gold uppercase text-xs tracking-widest mt-1 font-semibold">{lightboxImage.category.replace('_', ' ')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
