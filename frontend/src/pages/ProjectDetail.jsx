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
      <div className="pt-32 text-center text-primary dark:text-white">
        <p>Loading project detail...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 text-center text-primary dark:text-white">
        <p>Project not found.</p>
        <Link to="/projects" className="text-gold underline mt-4 inline-block">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/projects" className="inline-flex items-center text-xs font-bold text-primary dark:text-white hover:text-gold uppercase tracking-wider mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary dark:text-white mb-4">{project.name}</h1>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gold mb-8">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.location}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details & Slider */}
          <div className="lg:col-span-2 space-y-10">
            {/* Before / After Slider */}
            <div>
              <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Before / After Comparison</h2>
              {project.before_image && project.after_image ? (
                <BeforeAfterSlider beforeImage={project.before_image} afterImage={project.after_image} />
              ) : (
                <img src={project.after_image} alt={project.name} className="rounded-xl w-full object-cover" />
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Case Study</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Client Review */}
            {project.client_review && (
              <div className="bg-slate-50 dark:bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-xs font-extrabold text-gold uppercase tracking-widest mb-4">Client Review</h3>
                <div className="flex text-yellow-400 mb-3">
                  {Array.from({ length: project.client_rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm italic text-slate-700 dark:text-slate-350 leading-relaxed mb-4">
                  "{project.client_review}"
                </blockquote>
                <p className="text-xs font-bold text-primary dark:text-white">— {project.client_name}</p>
              </div>
            )}
          </div>

          {/* Right Column: Spec card & Project progress timeline */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Specs card */}
            <div className="bg-primary text-white p-6 rounded-2xl border border-gold/30 shadow-premium">
              <h3 className="text-sm font-serif font-bold text-gold uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Project Specifications</h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex justify-between items-center"><span className="text-slate-300">Location:</span><span className="font-bold flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {project.location}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-300">Built Area:</span><span className="font-bold flex items-center"><Compass className="w-3.5 h-3.5 mr-1" /> {project.area}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-300">Duration:</span><span className="font-bold flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {project.duration}</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-300">Total Budget:</span><span className="font-extrabold text-gold">{project.budget}</span></li>
              </ul>
              
              <h4 className="text-xs font-serif font-bold text-gold uppercase tracking-widest mt-6 mb-3 border-b border-white/10 pb-2">Services Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.services_used.split(',').map((serv, i) => (
                  <span key={i} className="text-[10px] bg-white/10 text-white border border-white/15 px-2 py-1 rounded">
                    {serv.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Timeline */}
            {project.progress_timeline && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
                <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-4">Milestone Progress</h3>
                <div className="relative border-l border-slate-200 dark:border-slate-700 pl-4 space-y-6">
                  {project.progress_timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-gold border border-white dark:border-slate-900" />
                      <h4 className="text-xs font-bold text-primary dark:text-white">{step.stage}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{step.date} • <span className="text-green-500 font-semibold">{step.status}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
