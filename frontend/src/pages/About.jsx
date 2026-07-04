import React from 'react';
import { ShieldCheck, HardHat, Sparkles, Building, Landmark, Users } from 'lucide-react';

const TEAM = [
  { name: "Er. Sirajuddin K.A", role: "Managing Director & Chief Engineer", image: "https://randomuser.me/api/portraits/men/86.jpg", desc: "Overseeing project delivery pipelines and civil construction quality standards." },
  { name: "Ar. Sneha Mathew", role: "Principal Architect", image: "https://randomuser.me/api/portraits/women/45.jpg", desc: "Award-winning B.Arch designing premium luxury elevations and layouts." },
  { name: "Er. Vivek Pillai", role: "Lead Structural Engineer", image: "https://randomuser.me/api/portraits/men/46.jpg", desc: "M.Tech in Structural Engineering ensuring building durability and Vastu alignment." },
  { name: "Ar. Priya Nair", role: "Senior Interior Designer", image: "https://randomuser.me/api/portraits/women/62.jpg", desc: "Designing elegant modern modular kitchens, wooden works, and false ceilings." }
];

const About = () => {
  return (
    <div className="pt-24 bg-white dark:bg-slate-950">
      
      {/* Header Banner */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">About Abacus Homes</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Our History, Our Team, and Our Building Values</p>
      </div>

      {/* Corporate Intro */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-white mb-6">
              A Premium Legacy of Engineering Excellence
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Founded in 2011, Abacus Homes has grown from a local drafting consulting firm into a full-scale premium civil contracting agency. We specialize in building turnkey custom villas, modern commercial hubs, and breathtaking interiors.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Following structural guidelines comparable to industry giants like Prestige and DLF, we ensure every single cement pour and reinforcement bar matches strict load-bearing calculations, protecting your life and investment.
            </p>

            <div className="grid grid-cols-3 gap-6 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
              <div>
                <p className="text-2xl font-serif font-bold text-gold">15+</p>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1">Years active</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-gold">400+</p>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1">Homes built</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-gold">100%</p>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1">Legal approval rate</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80" 
              alt="Engineers planning on construction site"
              className="rounded-2xl shadow-premium border w-full object-cover h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-white mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <div className="p-3 bg-primary/5 rounded-full text-gold mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-3 font-serif">Absolute Integrity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No hidden estimates, no substitution of material grades, and absolute transparency regarding construction timelines.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <div className="p-3 bg-primary/5 rounded-full text-gold mb-5">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-3 font-serif">Engineering Safety</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Double-checked load distributions, soil bearing checks, and premium steel grade usage ensuring durable structure lifespans.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <div className="p-3 bg-primary/5 rounded-full text-gold mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-3 font-serif">Luxurious Finishes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Meticulous attention to detail on tiles, false ceilings, facade designs, and interior paint finishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Architects Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-white text-center mb-12">Meet Our Elite Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-premium border border-slate-100 dark:border-slate-800 text-center transition-transform hover:-translate-y-1">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-base font-bold text-primary dark:text-white font-serif">{member.name}</h3>
                <p className="text-xs text-gold uppercase tracking-wider font-semibold mt-1 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
