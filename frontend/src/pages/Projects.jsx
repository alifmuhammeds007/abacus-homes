import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { MapPin, Calendar, Compass, ArrowUpRight, Search } from 'lucide-react';

const CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    projectsAPI.list().then(res => setProjects(res.data));
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.services_used.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Page Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            PROJECTS
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            03 // PORTFOLIO GALLERY
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            COMPLETED <span className="text-[#2596be]">LANDMARKS.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Contemporary luxury villas, tropical residences, and commercial complexes across South India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Category Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#2596be] text-white shadow-md shadow-[#2596be]/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] shadow-xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(proj => (
            <Link 
              to={`/projects/${proj.id}`} 
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(37,150,190,0.12)] hover:border-[#2596be] transition-all hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={proj.after_image} 
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  {proj.category}
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center group-hover:bg-[#2596be] group-hover:text-white transition-all shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-2 group-hover:text-[#2596be] transition-colors">{proj.name}</h3>
                
                <div className="flex flex-col space-y-2 text-xs text-slate-500 mb-6">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-[#2596be] mr-1.5 shrink-0" /> {proj.location}</span>
                  <span className="flex items-center"><Compass className="w-3.5 h-3.5 text-[#2596be] mr-1.5 shrink-0" /> Built-up Area: {proj.area}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 text-[#2596be] mr-1.5 shrink-0" /> Completion: {proj.duration}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Budget</span>
                    <p className="text-sm font-extrabold text-[#3b2314]">{proj.budget}</p>
                  </div>
                  <span className="text-xs font-bold text-[#2596be] group-hover:underline">View Project Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Projects;
