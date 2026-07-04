import React, { useState, useEffect } from 'react';
import { careersAPI } from '../services/api';
import { Briefcase, MapPin, Calendar, CheckSquare, Upload, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Careers = () => {
  const [positions, setPositions] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    careersAPI.list().then(res => setPositions(res.data));
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', activeJob?.id || positions[0]?.id);
    formData.append('cover_letter', data.coverLetter);
    if (data.resume && data.resume[0]) {
      formData.append('resume', data.resume[0]);
    }

    try {
      const response = await careersAPI.apply(formData);
      setSuccessMessage(response.data.message || 'Application submitted successfully!');
      reset();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Careers at Abacus</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Join Our Civil Engineering & Creative Architecture Teams</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Open Positions Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Open Positions</h2>
            
            <div className="space-y-4">
              {positions.map(job => (
                <div 
                  key={job.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    activeJob?.id === job.id
                      ? 'bg-slate-50 dark:bg-slate-900 border-gold shadow'
                      : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                  onClick={() => setActiveJob(job)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-primary dark:text-white font-serif">{job.title}</h3>
                      <p className="text-xs text-gold uppercase tracking-wider font-semibold mt-1">{job.department}</p>
                    </div>
                    <span className="flex items-center text-xs text-slate-400 font-bold"><MapPin className="w-3.5 h-3.5 text-gold mr-1" /> {job.location}</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>Full-Time Role</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveJob(job); }}
                      className="text-gold uppercase tracking-wider hover:underline"
                    >
                      View Details & Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details & Apply Form Column */}
          <div className="lg:col-span-1">
            {activeJob ? (
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-105 dark:border-slate-800 shadow-premium sticky top-28">
                <h3 className="text-base font-bold text-primary dark:text-white font-serif mb-1">{activeJob.title}</h3>
                <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-4">{activeJob.department}</p>
                
                <h4 className="text-xs font-bold text-primary dark:text-white uppercase tracking-widest mb-2 border-b pb-1.5">Key Responsibilities</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{activeJob.description}</p>

                <h4 className="text-xs font-bold text-primary dark:text-white uppercase tracking-widest mb-2 border-b pb-1.5">Requirements</h4>
                <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {activeJob.requirements.split(';').map((req, i) => (
                    <li key={i} className="flex items-start">
                      <CheckSquare className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                {/* Application Form */}
                <h4 className="text-xs font-bold text-primary dark:text-white uppercase tracking-widest mb-4 border-b pb-1.5">Apply for this position</h4>
                
                {successMessage ? (
                  <div className="p-4 bg-green-50 dark:bg-slate-950 text-green-600 dark:text-green-400 border border-green-200 rounded text-xs text-center font-bold">
                    {successMessage}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        {...register('name', { required: true })}
                        className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-semibold">Name is required</span>}
                    </div>

                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        {...register('email', { required: true })}
                        className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-semibold">Email is required</span>}
                    </div>

                    <div>
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        {...register('phone', { required: true })}
                        className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-semibold">Phone is required</span>}
                    </div>

                    <div>
                      <textarea 
                        placeholder="Quick Pitch / Cover Letter"
                        rows="3"
                        {...register('coverLetter')}
                        className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="flex items-center justify-between border border-dashed border-slate-300 dark:border-slate-700 p-2 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                        <span className="text-xs text-slate-400 flex items-center"><Upload className="w-4 h-4 mr-1.5" /> Upload CV (PDF)</span>
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx"
                          {...register('resume')}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-gold hover:bg-gold-dark text-white rounded font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Application
                    </button>
                  </form>
                )}

              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center text-slate-400 min-h-[300px]">
                <Briefcase className="w-10 h-10 text-slate-350 dark:text-slate-700 mb-3" />
                <h3 className="text-sm font-bold font-serif text-primary dark:text-white mb-1">Select a Job Position</h3>
                <p className="text-[11px] max-w-[200px]">Click any role on the left to see description, qualifications, and open the job apply form.</p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Careers;
