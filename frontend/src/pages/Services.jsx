import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import { Ruler, ShieldAlert, Home, Paintbrush, Trees, Wrench, Calculator, Cpu, ChevronRight } from 'lucide-react';

const ICON_MAP = {
  Ruler: Ruler,
  FileCheck: ShieldAlert,
  Home: Home,
  Building: Home,
  Paintbrush: Paintbrush,
  Cpu: Cpu,
  Palmtree: Trees,
  TrendingUp: Calculator
};

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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Our Premium Services</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Designing, Planning, and Constructing Luxury Structures</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Services Left List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Service Offerings</h2>
            <div className="space-y-2">
              {services.map(s => {
                const isActive = activeService?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveService(s)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-primary text-white border-gold shadow' 
                        : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-wide">{s.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-gold' : ''}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Right Details View */}
          {activeService && (
            <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
              <h2 className="text-2xl font-bold text-primary dark:text-white font-serif mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                {activeService.name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {activeService.description}
              </p>

              <h3 className="text-xs font-extrabold text-gold uppercase tracking-widest mb-4">Core Focus Areas & Sub-services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {activeService.details.split(';').map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Consultation Prompt */}
              <div className="p-6 bg-primary dark:bg-slate-950 text-white rounded-xl border border-gold/30 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-sm font-bold tracking-wide">Ready to design or build?</h4>
                  <p className="text-xs text-slate-300 mt-1">Submit your site measurements for a custom estimation cost.</p>
                </div>
                <Link 
                  to="/consultation"
                  className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-md shrink-0"
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
