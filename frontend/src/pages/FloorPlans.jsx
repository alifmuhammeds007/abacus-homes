import React, { useState, useEffect } from 'react';
import { floorplansAPI } from '../services/api';
import { Eye, Download, Info } from 'lucide-react';

const CATEGORIES = [
  { value: 'all', label: 'All Layouts' },
  { value: '3BHK', label: '3 BHK' },
  { value: 'luxury_villas', label: 'Luxury Villas' },
  { value: 'duplex', label: 'Duplex' }
];

const FloorPlans = () => {
  const [plans, setPlans] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewPlan, setPreviewPlan] = useState(null);

  useEffect(() => {
    floorplansAPI.list().then(res => setPlans(res.data));
  }, []);

  const filteredPlans = activeCategory === 'all'
    ? plans
    : plans.filter(p => p.category === activeCategory);

  const handleDownload = (plan) => {
    alert(`Downloading PDF blueprint for: ${plan.title}`);
    window.open(plan.pdf_url, '_blank');
  };

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Premium Floor Plans</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Examine Architectural Blueprints & Space Layouts</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* BHK Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.value
                  ? 'bg-gold text-white'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-355 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map(plan => (
            <div 
              key={plan.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium"
            >
              <div className="h-56 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden p-4 relative group">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="max-h-full max-w-full object-contain rounded border shadow-sm transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => setPreviewPlan(plan)}
                    className="p-2 bg-white text-primary rounded-full hover:bg-gold hover:text-white transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDownload(plan)}
                    className="p-2 bg-white text-primary rounded-full hover:bg-gold hover:text-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary dark:text-white font-serif mb-2">{plan.title}</h3>
                
                <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Beds</span>
                    <span className="text-primary dark:text-gold font-bold">{plan.bedrooms} BHK</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Baths</span>
                    <span className="text-primary dark:text-gold font-bold">{plan.bathrooms} Bath</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Area</span>
                    <span className="text-primary dark:text-gold font-bold">{plan.area}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setPreviewPlan(plan)}
                    className="w-1/2 py-2.5 border border-primary dark:border-white text-primary dark:text-white hover:bg-primary hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Preview Plan
                  </button>
                  <button 
                    onClick={() => handleDownload(plan)}
                    className="w-1/2 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-1.5" /> PDF Layout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Plan Preview Modal */}
      {previewPlan && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800 relative w-full">
            <button 
              onClick={() => setPreviewPlan(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-4 pr-10">{previewPlan.title}</h3>
            
            <div className="flex justify-center bg-slate-100 dark:bg-slate-950 p-4 rounded-xl mb-6">
              <img 
                src={previewPlan.image} 
                alt={previewPlan.title}
                className="max-h-[60vh] object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border">
              <div className="text-xs text-slate-500 space-x-4">
                <span><strong>Bedrooms:</strong> {previewPlan.bedrooms}</span>
                <span>•</span>
                <span><strong>Bathrooms:</strong> {previewPlan.bathrooms}</span>
                <span>•</span>
                <span><strong>Area:</strong> {previewPlan.area}</span>
              </div>
              <button 
                onClick={() => handleDownload(previewPlan)}
                className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center shadow"
              >
                <Download className="w-4 h-4 mr-2" /> Download Drawing PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FloorPlans;
