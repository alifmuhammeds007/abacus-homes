import React from 'react';
import { Shield, Award, Users, CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-28 bg-[#fafafa] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2596be]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Core Philosophy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
              01 // STUDIO MANIFESTO
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] leading-[1.08] mb-6 tracking-tight">
              WE TURN IDEAS INTO <span className="text-[#2596be] font-bold">STRUCTURES.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Abacus Homes is a premier architectural design, structural engineering, and turnkey civil construction atelier headquartered in Kakkanad, Kochi. We blend computational design precision with artisanal craftsmanship to deliver bespoke residences that resonate with you.
            </p>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8">
              From geotechnical soil diagnostics to multi-story cantilevered structural casting and hand-finished teak interiors, every square foot is engineered with zero compromise.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#2596be] shrink-0" />
                <span className="text-xs font-sans font-medium text-slate-700">10-Yr Structural Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#2596be] shrink-0" />
                <span className="text-xs font-sans font-medium text-slate-700">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#2596be] shrink-0" />
                <span className="text-xs font-sans font-medium text-slate-700">150+ Turnkey Handouts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2596be] shrink-0" />
                <span className="text-xs font-sans font-medium text-slate-700">Milestone Escrow Billing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#2596be] transition-all hover:-translate-y-1">
              <span className="font-sans text-4xl font-extrabold text-[#3b2314] block mb-2">150+</span>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">Completed Masterpieces</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Contemporary luxury villas, tropical residences, and commercial complexes across South India.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#2596be] transition-all hover:-translate-y-1 sm:translate-y-6">
              <span className="font-sans text-4xl font-extrabold text-[#2596be] block mb-2">100%</span>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">BIM 3D Simulation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full clash detection and spatial visualization before breaking ground on your site.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#2596be] transition-all hover:-translate-y-1">
              <span className="font-sans text-4xl font-extrabold text-[#2596be] block mb-2">0%</span>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">Cost Overruns</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Guaranteed turnkey contract lock. What we quote in the structural BOQ is exactly what you pay.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#2596be] transition-all hover:-translate-y-1 sm:translate-y-6">
              <span className="font-sans text-4xl font-extrabold text-[#3b2314] block mb-2">15+</span>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">Years of Excellence</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A proud legacy of architectural innovation, safety compliance, and client trust in Kerala.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
