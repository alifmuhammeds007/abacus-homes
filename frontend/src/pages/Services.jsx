import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import { Ruler, ShieldAlert, Home, Paintbrush, Trees, Wrench, Calculator, Cpu, ChevronRight, Check } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    servicesAPI.list().then(res => {
      setServices(res.data);
      if (res.data.length > 0) {
        setActiveService(res.data[0]);
      }
    });
  }, []);

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Page Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            SERVICES
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            02 // DISCIPLINE OFFERINGS
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            COMPREHENSIVE <span className="text-[#2596be]">SERVICES.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From geotechnical survey to 3D BIM modeling, civil construction, and artisanal interior fit-outs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Services Left List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-sans font-bold text-slate-900 uppercase tracking-wider mb-4 px-1">
              Select Discipline
            </h2>
            <div className="space-y-2.5">
              {services.map(s => {
                const isActive = activeService?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveService(s)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between shadow-xs ${
                      isActive 
                        ? 'bg-[#2596be] text-white border-[#2596be] shadow-md shadow-[#2596be]/20' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold tracking-wide">{s.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Right Details View */}
          {activeService && (
            <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#2596be] uppercase tracking-widest">DISCIPLINE OVERVIEW</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#3b2314] font-sans mb-4 pb-3 border-b border-slate-100">
                {activeService.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                {activeService.description}
              </p>

              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                Core Deliverables & Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
                {activeService.details.split(';').map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-[#fafafa] p-3.5 rounded-xl border border-slate-200/80">
                    <div className="w-5 h-5 rounded-full bg-[#2596be]/10 text-[#2596be] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{detail.trim()}</span>
                  </div>
                ))}
              </div>

              {/* Consultation Prompt Card */}
              <div className="p-6 sm:p-8 bg-[#fafafa] text-slate-900 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-bold text-[#3b2314] tracking-tight">Ready to begin this service for your plot?</h4>
                  <p className="text-xs text-slate-500 mt-1">Submit your plot location and built-up area for a detailed BOQ estimate.</p>
                </div>
                <Link 
                  to="/consultation"
                  className="px-6 py-3 bg-[#2596be] hover:bg-[#1d7fa2] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#2596be]/20 shrink-0"
                >
                  Request Consultation
                </Link>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Services;
