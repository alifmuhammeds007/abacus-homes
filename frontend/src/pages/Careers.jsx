import React, { useState, useEffect } from 'react';
import { careersAPI } from '../services/api';
import { Briefcase, MapPin, Calendar, CheckSquare, Upload, Send, CheckCircle2 } from 'lucide-react';
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
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            CAREERS
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            11 // JOIN OUR TEAM
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            CAREERS AT <span className="text-[#2596be]">ABACUS.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Join our civil engineering ateliers, structural drafting studios, and interior design practices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Open Positions Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-base font-sans font-bold text-slate-900 uppercase tracking-wider mb-6">Current Openings</h2>
            
            <div className="space-y-4">
              {positions.map(job => (
                <div 
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer shadow-xs ${
                    activeJob?.id === job.id
                      ? 'bg-white border-[#2596be] shadow-md shadow-[#2596be]/10 ring-1 ring-[#2596be]/30'
                      : 'bg-white border-slate-200/90 hover:border-[#2596be]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-[#3b2314] font-sans">{job.title}</h3>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold uppercase rounded-full">
                      {job.job_type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2596be]" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#2596be]" /> {job.experience} Exp</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2596be]">Click to Apply for this Position →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sticky top-28">
              <h3 className="text-base font-bold text-[#3b2314] font-sans mb-1">
                {activeJob ? `Apply: ${activeJob.title}` : 'Submit Resume'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">Attach your CV and portfolio link.</p>

              {successMessage ? (
                <div className="p-6 bg-green-50 text-green-700 border border-green-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-green-600 mb-1" />
                  <p className="text-xs font-bold">{successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Maya Suresh"
                      {...register('name', { required: true })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-0.5">Name is required</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="maya@example.com"
                      {...register('email', { required: true })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 mt-0.5">Email is required</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number (10 Digits) *</label>
                    <input 
                      type="tel" 
                      maxLength={10}
                      placeholder="e.g. 9946021717"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
                      })}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 mt-0.5">{errors.phone.message || '10-digit phone required'}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Cover Letter / Portfolio Link</label>
                    <textarea 
                      rows={3}
                      placeholder="Brief intro or Behance/Drive portfolio link..."
                      {...register('coverLetter')}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Attach Resume (PDF/DOC)</label>
                    <input 
                      type="file" 
                      {...register('resume', { required: true })}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#2596be]/10 file:text-[#2596be]"
                    />
                    {errors.resume && <span className="text-[10px] text-red-500 mt-0.5">Resume is required</span>}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md shadow-[#2596be]/20 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Transmit Application</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Careers;
