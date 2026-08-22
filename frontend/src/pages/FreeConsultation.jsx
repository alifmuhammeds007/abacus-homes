import React, { useState } from 'react';
import { consultationAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { FileCheck, Upload, Send, CheckCircle2 } from 'lucide-react';

const FreeConsultation = () => {
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('location', data.location);
    formData.append('project_type', data.projectType);
    formData.append('budget', data.budget);
    formData.append('land_area', data.landArea);
    formData.append('message', data.message);
    if (data.planFile && data.planFile[0]) {
      formData.append('plan_file', data.planFile[0]);
    }

    try {
      const response = await consultationAPI.submit(formData);
      setSuccess(response.data.message || 'Consultation request submitted successfully!');
      reset();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      alert('Failed to submit consultation. Please try again.');
    }
  };

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            CONSULT
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            07 // ARCHITECTURAL CONSULTATION
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            BOOK A <span className="text-[#2596be]">SLOT.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Submit your plot parameters and project scope for a 1-on-1 consultation and architectural review.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          
          <div className="text-center mb-10 max-w-lg mx-auto">
            <span className="w-12 h-12 bg-[#2596be]/10 text-[#2596be] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-6 h-6" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3b2314] font-sans">Design & Cost Inquiry Form</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Our Senior Architect and Civil Engineer will review your requirements and follow up with a mock layout.</p>
          </div>

          {success ? (
            <div className="p-8 bg-green-50 text-green-700 border border-green-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-bold text-base">Consultation Request Dispatched</h3>
              <p className="text-xs text-green-600">{success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Anand Varma"
                    {...register('name', { required: true })}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-1">Name is required</span>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98470 00000"
                    {...register('phone', { required: true })}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 mt-1">Phone is required</span>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="anand@example.com"
                    {...register('email', { required: true })}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-1">Email is required</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Project Location *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kakkanad, Kochi"
                    {...register('location', { required: true })}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  />
                  {errors.location && <span className="text-[10px] text-red-500 mt-1">Location is required</span>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Project Discipline</label>
                  <select 
                    {...register('projectType')}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  >
                    <option value="residential">Turnkey Residential Villa</option>
                    <option value="commercial">Commercial Hub</option>
                    <option value="interior">Luxury Interior Architecture</option>
                    <option value="renovation">Renovation & Structural Retrofit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Estimated Budget Tier</label>
                  <select 
                    {...register('budget')}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  >
                    <option value="35-50L">₹35 Lakhs – ₹50 Lakhs</option>
                    <option value="50L-1Cr">₹50 Lakhs – ₹1 Crore</option>
                    <option value="1Cr-2.5Cr">₹1 Crore – ₹2.5 Crores</option>
                    <option value="2.5Cr+">₹2.5 Crores+ (Luxury Estate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Land Extent (Cents / Sq.Ft.)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10 Cents / 4356 Sq.Ft."
                    {...register('landArea')}
                    className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Site Notes & Vision</label>
                <textarea 
                  rows={4}
                  placeholder="Share details like soil type, required bedrooms, design style preference..."
                  {...register('message')}
                  className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Upload Site / Rough Sketch (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#2596be] transition-colors bg-[#fafafa]">
                  <Upload className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                  <input 
                    type="file" 
                    {...register('planFile')}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#2596be]/10 file:text-[#2596be] hover:file:bg-[#2596be]/20"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md shadow-[#2596be]/20 flex items-center justify-center gap-2"
              >
                <span>Transmit Consultation Request</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};

export default FreeConsultation;
