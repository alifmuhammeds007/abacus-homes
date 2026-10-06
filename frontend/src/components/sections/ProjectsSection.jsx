import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Calendar, Maximize2 } from 'lucide-react';

const projectsList = [
  {
    id: 1,
    title: "The Malabar Courtyard Villa",
    category: "Residential",
    location: "Kakkanad, Kochi",
    year: "2025",
    area: "4,800 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    desc: "A contemporary Kerala tropical residence centered around an open skyward courtyard with cantilevered teak balconies and an ambient reflection pool."
  },
  {
    id: 2,
    title: "The Heritage Teak & Laterite Villa",
    category: "Residential",
    location: "Beach Road, Kozhikode",
    year: "2024",
    area: "3,600 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    desc: "A fusion of traditional Kerala terracotta roof slopes and modernist geometric layouts, celebrating authentic exposed brickwork and teak sit-outs."
  },
  {
    id: 3,
    title: "Vembanad Backwater Haven",
    category: "Residential",
    location: "Kumarakom, Kottayam",
    year: "2025",
    area: "5,400 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    desc: "Luxury waterfront villa with floor-to-ceiling glass facades, wooden rafters, and lush tropical coconut grove landscaping."
  },
  {
    id: 4,
    title: "Wayanad Rainforest Estate",
    category: "Landscape",
    location: "Vythiri, Wayanad",
    year: "2024",
    area: "2.5 Acres",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    desc: "Hillside architectural residence featuring multi-level stone terrace landscaping, native tropical flora, and warm exterior ambient illumination."
  }
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Landscape'];

  const filtered = filter === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-28 bg-[#fafafa] text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#3b2314] tracking-tight">
              ARCHITECTURAL <span className="text-[#2596be] font-bold">PORTFOLIO.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all ${
                  filter === cat
                    ? 'bg-[#2596be] text-white font-bold shadow-md shadow-[#2596be]/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <Link
              key={proj.id}
              to={`/projects/${proj.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#2596be] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(37,150,190,0.14)] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 font-sans text-xs font-semibold shadow-sm">
                  {proj.category}
                </span>

                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center group-hover:bg-[#2596be] group-hover:text-white transition-all shadow-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 mb-3 group-hover:text-[#2596be] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#2596be]" />
                    {proj.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans">
                    <Maximize2 className="w-3.5 h-3.5 text-[#2596be]" />
                    {proj.area}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-[#2596be]" />
                    {proj.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
