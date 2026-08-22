import React, { useState, useEffect } from 'react';
import { floorplansAPI } from '../services/api';
import { Eye, Download, Info, Compass, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Page Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            LAYOUTS
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            08 // ARCHITECTURAL BLUEPRINTS
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            FLOOR <span className="text-[#2596be]">PLANS.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Examine spatial configurations, 2D floor plans, and Vastu-aligned residential blueprints.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* BHK Filter Tabs */}
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

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map(plan => (
            <div 
              key={plan.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(37,150,190,0.12)] hover:border-[#2596be] transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono font-bold text-[#2596be] uppercase tracking-wider">{plan.bhk_type}</span>
                  <span className="text-xs font-bold text-slate-500">{plan.area} Sq.Ft.</span>
                </div>
                <h3 className="text-lg font-bold text-[#3b2314] font-sans mb-4">{plan.title}</h3>

                <div className="aspect-[4/3] bg-[#fafafa] rounded-2xl overflow-hidden border border-slate-100 mb-6 flex items-center justify-center relative group">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setPreviewPlan(plan)}
                      className="p-3 bg-white rounded-full text-slate-900 hover:text-[#2596be] shadow-lg transition-transform hover:scale-110"
                      title="Zoom Blueprint"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {plan.description}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-4">
                <button
                  onClick={() => setPreviewPlan(plan)}
                  className="text-xs font-bold text-[#2596be] hover:underline"
                >
                  Inspect Layout
                </button>
                <Link
                  to="/consultation"
                  className="px-4 py-2 bg-[#2596be] hover:bg-[#1d7fa2] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Build This Plan
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Blueprint Preview Modal */}
      {previewPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#3b2314]">{previewPlan.title}</h3>
              <button 
                onClick={() => setPreviewPlan(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto border border-slate-200 rounded-2xl p-4 bg-[#fafafa]">
              <img src={previewPlan.image} alt={previewPlan.title} className="w-full object-contain" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FloorPlans;
