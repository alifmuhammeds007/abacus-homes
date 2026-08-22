import React from 'react';
import { ShieldCheck, HardHat, Sparkles, Building, Landmark, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: "Er. Sirajuddin K.A", role: "Managing Director & Chief Engineer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80", desc: "Overseeing project delivery pipelines, structural vetting, and civil construction quality standards." },
  { name: "Ar. Sneha Mathew", role: "Principal Architect", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", desc: "Award-winning architectural designer crafting contemporary Kerala villas and modern elevations." },
  { name: "Er. Vivek Pillai", role: "Lead Structural Engineer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80", desc: "Specialist in cantilevered RCC slabs, foundation dynamics, and seismic safety compliance." },
  { name: "Ar. Priya Nair", role: "Senior Interior Designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", desc: "Designing bespoke modular kitchens, custom teak joinery, and warm ambient lighting layouts." }
];

const About = () => {
  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Luminous Hero Header Banner */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            ABOUT
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            01 // ABOUT ABACUS HOMES
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            ARCHITECTURAL <span className="text-[#2596be]">EXCELLENCE.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our history, multidisciplinary team, and commitment to creating bespoke luxury residences that endure for generations.
          </p>
        </div>
      </div>

      {/* Corporate Intro */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2596be]/10 text-[#2596be] text-xs font-mono tracking-wider uppercase mb-3">
              OUR FOUNDATION
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-black text-[#3b2314] leading-tight mb-6">
              A Legacy of Precision Engineering & Craftsmanship
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Founded in 2011, Abacus Homes has grown from an elite architectural drafting firm into a full-scale turnkey design and civil construction atelier headquartered in Kakkanad, Kochi. We specialize in bespoke residential villas, tropical courtyards, and luxury commercial landmarks.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Following stringent engineering codes and rigorous quality standards, we ensure every foundation pile, cantilever beam, and teak finish matches meticulous calculations.
            </p>

            <div className="grid grid-cols-3 gap-6 text-center border-t border-slate-200 pt-6">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-[#3b2314]">15+</p>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">Years Active</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-[#2596be]">400+</p>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">Homes Built</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-[#2596be]">100%</p>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">On-Time Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.08)] border border-slate-200/90">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Abacus Homes Kerala Luxury Villa Architecture"
                className="w-full object-cover h-[380px] sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2596be]/10 text-[#2596be] text-xs font-mono tracking-wider uppercase mb-3">
            PILLARS OF SUCCESS
          </div>
          <h2 className="text-2xl sm:text-4xl font-sans font-black text-[#3b2314] mb-12">Our Core Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fafafa] p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:border-[#2596be] transition-all hover:-translate-y-1 text-center">
              <div className="w-14 h-14 bg-white border border-slate-200 text-[#2596be] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-sans">Absolute Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Guaranteed contract pricing with zero hidden fees. What we quote in the structural BOQ is exactly what you pay.
              </p>
            </div>

            <div className="bg-[#fafafa] p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:border-[#2596be] transition-all hover:-translate-y-1 text-center">
              <div className="w-14 h-14 bg-white border border-slate-200 text-[#2596be] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <HardHat className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-sans">Engineering Safety</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Full 3D BIM clash detection, seismic-resistant RCC designs, and certified multi-layer structural load distribution.
              </p>
            </div>

            <div className="bg-[#fafafa] p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:border-[#2596be] transition-all hover:-translate-y-1 text-center">
              <div className="w-14 h-14 bg-white border border-slate-200 text-[#2596be] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-sans">Artisanal Finishes</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Hand-finished Kerala teakwood, imported Italian marbles, minimalist floor-to-ceiling glass, and ambient lighting harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Architects Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2596be]/10 text-[#2596be] text-xs font-mono tracking-wider uppercase mb-3">
            LEADERSHIP
          </div>
          <h2 className="text-2xl sm:text-4xl font-sans font-black text-[#3b2314]">Meet Our Elite Studio Team</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 text-center transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(37,150,190,0.12)] hover:border-[#2596be]">
              <div className="h-60 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 font-sans">{member.name}</h3>
                <p className="text-xs text-[#2596be] uppercase tracking-wider font-semibold mt-1 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-[#3b2314] font-sans">Ready to embark on your dream residence?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Schedule a 1-on-1 site consultation with our principal architects.</p>
          </div>
          <Link
            to="/consultation"
            className="px-6 py-3 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#2596be]/20 transition-all shrink-0"
          >
            Book Consultation
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
