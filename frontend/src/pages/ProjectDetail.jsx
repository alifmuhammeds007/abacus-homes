import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { MapPin, Compass, Calendar, CheckSquare, Star, ArrowLeft, Shield } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsAPI.detail(id).then(res => {
      setProject(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-slate-900 min-h-screen bg-[#fafafa]">
        <p className="text-sm font-medium text-slate-500">Loading project detail...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 text-center text-slate-900 min-h-screen bg-[#fafafa]">
        <p className="text-sm font-medium text-slate-500">Project not found.</p>
        <Link to="/projects" className="text-[#2596be] underline mt-4 inline-block font-bold">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans">
      
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/projects" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-[#2596be] uppercase tracking-wider mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>
        <h1 className="text-3xl sm:text-5xl font-black font-sans text-[#3b2314] mb-4">{project.name}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#2596be] mb-8">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full shadow-xs">{project.category}</span>
          <span>•</span>
          <span>{project.location}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details & Slider */}
          <div className="lg:col-span-2 space-y-10">
            {/* Before / After Slider */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-base font-sans font-bold text-[#3b2314] uppercase tracking-wider mb-6">Before / After Comparison</h2>
              {project.before_image && project.after_image ? (
                <BeforeAfterSlider beforeImage={project.before_image} afterImage={project.after_image} />
              ) : (
                <img src={project.after_image} alt={project.name} className="rounded-2xl w-full object-cover shadow-sm" />
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-base font-sans font-bold text-[#3b2314] uppercase tracking-wider mb-4">Case Study & Scope</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Client Review */}
            {project.client_review && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <h3 className="text-xs font-mono font-bold text-[#2596be] uppercase tracking-widest mb-4">CLIENT TESTIMONIAL</h3>
                <div className="flex text-amber-400 mb-3">
                  {Array.from({ length: project.client_rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm italic text-slate-700 leading-relaxed mb-4">
                  "{project.client_review}"
                </blockquote>
                <p className="text-xs font-bold text-slate-900 font-sans">— {project.client_name}</p>
              </div>
            )}
          </div>

          {/* Right Column: Spec card */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Specs card */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h3 className="text-xs font-mono font-bold text-[#2596be] uppercase tracking-widest mb-6 pb-3 border-b border-slate-100">Project Specifications</h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex justify-between items-center"><span className="text-slate-500">Location:</span><span className="font-bold text-slate-800 flex items-center"><MapPin className="w-3.5 h-3.5 text-[#2596be] mr-1" /> {project.location}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Built-Up Area:</span><span className="font-bold text-slate-800 flex items-center"><Compass className="w-3.5 h-3.5 text-[#2596be] mr-1" /> {project.area}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Construction Period:</span><span className="font-bold text-slate-800 flex items-center"><Calendar className="w-3.5 h-3.5 text-[#2596be] mr-1" /> {project.duration}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Total Investment:</span><span className="font-extrabold text-[#3b2314] text-sm">{project.budget}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Structure Type:</span><span className="font-bold text-slate-800">RCC Cantilever</span></li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/consultation"
                  className="w-full py-3.5 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#2596be]/20 transition-all flex items-center justify-center"
                >
                  Consult on Similar Project
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
