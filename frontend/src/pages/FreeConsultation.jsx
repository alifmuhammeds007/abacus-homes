import React, { useState } from 'react';
import { consultationAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { FileCheck, Upload, Send, HelpCircle } from 'lucide-react';

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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Free Design Consultation</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Submit Your Land Configurations for a Professional Drawing Analysis</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium">
          
          <div className="text-center mb-8 max-w-lg mx-auto">
            <span className="p-3 bg-gold/10 text-gold rounded-full inline-block mb-3">
              <FileCheck className="w-6 h-6" />
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-primary dark:text-white">Design & Cost Inquiry Form</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Our Senior Architect and Civil Engineer will review your requirements and follow up with a mock layout.</p>
          </div>

          {success ? (
            <div className="p-6 bg-green-50 dark:bg-slate-950 text-green-600 dark:text-green-400 border border-green-200 rounded-lg text-center font-bold text-sm">
              {success}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    {...register('name', { required: true })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                  {errors.name && <span className="text-[10px] text-red-500">Name is required</span>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    {...register('phone', { required: true })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500">Phone is required</span>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    {...register('email', { required: true })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                  {errors.email && <span className="text-[10px] text-red-500">Email is required</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Project Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kakkanad, Kochi"
                    {...register('location', { required: true })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                  {errors.location && <span className="text-[10px] text-red-500">Location is required</span>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Project Type</label>
                  <select 
                    {...register('projectType')}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Interior Designing">Interior Designing</option>
                    <option value="Landscape Gardening">Landscape Gardening</option>
                    <option value="Home Renovation">Home Renovation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Estimated Budget</label>
                  <select 
                    {...register('budget')}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="Under Rs. 50 Lakhs">Under Rs. 50 Lakhs</option>
                    <option value="Rs. 50 Lakhs - 1.5 Crore">Rs. 50 Lakhs - 1.5 Crore</option>
                    <option value="Rs. 1.5 Crore - 3 Crore">Rs. 1.5 Crore - 3 Crore</option>
                    <option value="Above Rs. 3 Crore">Above Rs. 3 Crore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Land Area Size (Sq.Ft.)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1500"
                    {...register('landArea', { required: true })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                  {errors.landArea && <span className="text-[10px] text-red-500">Land Area is required</span>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Upload Current Site Plan / Drawing (If any)</label>
                <label className="flex items-center justify-between border border-dashed border-slate-300 dark:border-slate-700 p-3 rounded-xl cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-100/50">
                  <span className="text-xs text-slate-450 flex items-center"><Upload className="w-4 h-4 mr-2 text-gold" /> Choose PDF or Image</span>
                  <input 
                    type="file" 
                    accept=".pdf,image/*"
                    {...register('planFile')}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Specific Requirements / Message</label>
                <textarea 
                  rows="4"
                  placeholder="Detail any custom requirements (e.g. number of bedrooms, modular kitchen requirements, smart integrations, vastu compliance)..."
                  {...register('message')}
                  className="w-full text-xs px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2 animate-pulse" /> Submit Consultation Request
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};

export default FreeConsultation;
