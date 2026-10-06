import React from 'react';
import { Compass, Building, Layers, Eye, HardHat, FileCheck2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    num: "01",
    icon: Compass,
    title: "Architectural Design",
    desc: "Bespoke concept drawings, master site layouts, solar orientation analysis, and bioclimatic tropical architecture.",
    tags: ["Site Analysis", "Floor Plans", "Elevation"]
  },
  {
    num: "02",
    icon: Building,
    title: "Structural Engineering",
    desc: "Rigorous earthquake-resistant RCC foundation engineering, cantilever slab design, and structural stability certification.",
    tags: ["STAAD.Pro", "Fe550 Steel", "Soil Testing"]
  },
  {
    num: "03",
    icon: Layers,
    title: "Interior Architecture",
    desc: "Custom teakwood cabinetry, Italian marble layouts, false ceiling acoustics, and warm ambient lighting schemes.",
    tags: ["Lighting", "Custom Joinery", "Finishes"]
  },
  {
    num: "04",
    icon: Eye,
    title: "3D Visualization & BIM",
    desc: "Photorealistic raytraced 4K renders, immersive VR walkthroughs, and full clash-detection BIM models.",
    tags: ["BIM 360", "VR Walkthrough", "4K Renders"]
  },
  {
    num: "05",
    icon: HardHat,
    title: "Turnkey Construction",
    desc: "Complete end-to-end civil execution, vetted on-site labor supervision, and ISO-grade raw material procurement.",
    tags: ["Site Supervision", "Civil Build", "Procurement"]
  },
  {
    num: "06",
    icon: FileCheck2,
    title: "Project Management",
    desc: "Transparent timeline scheduling, permit approvals with local authorities, and real-time client milestone tracking.",
    tags: ["Sanctions", "Cost Control", "Escrow Tracking"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 bg-white text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#3b2314] tracking-tight">
              ARCHITECTURAL & <span className="text-[#2596be] font-bold">ENGINEERING SERVICES.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md leading-relaxed">
            A comprehensive suite of architectural disciplines under one roof, guaranteeing seamless continuity from first sketch to final turnkey handover.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div 
                key={svc.num}
                className="bg-[#fafafa] p-8 rounded-2xl border border-slate-200/90 hover:border-[#2596be] hover:shadow-[0_12px_40px_rgba(37,150,190,0.12)] transition-all duration-300 group relative flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#2596be] flex items-center justify-center group-hover:bg-[#2596be] group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#2596be] tracking-widest">
                      {svc.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-sans font-bold text-slate-900 mb-3 group-hover:text-[#2596be] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 mb-6">
                    {svc.tags.map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-sans font-medium text-slate-600 shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#2596be] hover:text-[#1d7fa2] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
