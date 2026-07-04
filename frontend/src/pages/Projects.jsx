import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { MapPin, Calendar, Compass, Shield } from 'lucide-react';

const CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    projectsAPI.list().then(res => setProjects(res.data));
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Our Completed Landmarks</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Premium Villas, Corporate Spaces, and Renovation Masterpieces</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.value
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(proj => (
            <Link 
              to={`/projects/${proj.id}`} 
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-all hover:-translate-y-1 group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={proj.after_image} 
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/30">
                  {proj.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary dark:text-white font-serif mb-2 group-hover:text-gold transition-colors">{proj.name}</h3>
                
                <div className="flex flex-col space-y-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0" /> {proj.location}</span>
                  <span className="flex items-center"><Compass className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0" /> Area: {proj.area}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0" /> Built In: {proj.duration}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Budget</span>
                    <p className="text-sm font-extrabold text-primary dark:text-gold">{proj.budget}</p>
                  </div>
                  <span className="text-xs font-bold text-gold uppercase tracking-wider group-hover:underline">View Case Study →</span>
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
