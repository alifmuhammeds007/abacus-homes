import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await contactAPI.submit(data);
      setSuccess(response.data.message || 'Message sent successfully!');
      reset();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            CONTACT
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            CONNECT WITH <span className="text-[#2596be]">US.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Visit our architectural atelier in Kochi, connect on WhatsApp, or dispatch your project inquiry.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-sm font-sans font-bold text-slate-900 uppercase tracking-wider mb-4 px-1">
              Atelier Information
            </h2>
            
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6 text-xs">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3b2314] uppercase tracking-wider mb-1">Main Atelier & Studio</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Abacus Tower, Seaport-Airport Road,<br />
                    Kakkanad, Kochi, Kerala — 682030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3b2314] uppercase tracking-wider mb-1">Direct Inquiries</h3>
                  <p className="text-slate-500 mt-0.5 font-mono">+91 9946021717</p>
                  <p className="text-slate-500 font-mono">+91 98467 62343</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3b2314] uppercase tracking-wider mb-1">Electronic Mail</h3>
                  <p className="text-slate-500 mt-0.5 font-mono">build@abacushomes.in</p>
                  <p className="text-slate-500 font-mono">projects@abacushomes.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3b2314] uppercase tracking-wider mb-1">Studio Hours</h3>
                  <p className="text-slate-500 mt-0.5">Monday – Saturday: 9:00 AM – 6:30 PM IST</p>
                  <p className="text-slate-500">Sunday: By Special Appointment</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-4 border-t border-slate-100">
                <a 
                  href="https://wa.me/919946021717" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Instant Chat
                </a>
              </div>

            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-bold text-[#3b2314] font-sans mb-1">Transmit an Inquiry</h2>
              <p className="text-xs text-slate-500 mb-8">Fill in your requirements and our project coordinator will respond within 24 hours.</p>
              
              {success ? (
                <div className="p-8 bg-green-50 text-green-700 border border-green-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-bold text-base">Inquiry Dispatched Successfully</h3>
                  <p className="text-xs text-green-600">{success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        {...register('name', { required: true })}
                        placeholder="e.g. Rahul Menon" 
                        className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                      />
                      {errors.name && <span className="text-[10px] text-red-500 mt-1">Name is required</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number (10 Digits) *
                      </label>
                      <input 
                        type="tel" 
                        maxLength={10}
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
                        })}
                        placeholder="e.g. 9946021717" 
                        className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 mt-1">{errors.phone.message || '10-digit phone required'}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        {...register('email', { required: true })}
                        placeholder="rahul@example.com" 
                        className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                      />
                      {errors.email && <span className="text-[10px] text-red-500 mt-1">Email is required</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Plot City / Location
                      </label>
                      <input 
                        type="text" 
                        {...register('city')}
                        placeholder="e.g. Kakkanad, Kochi" 
                        className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Project Vision & Requirements
                    </label>
                    <textarea 
                      rows={5} 
                      {...register('message', { required: true })}
                      placeholder="Describe your plot size (e.g. 8 cents), desired floor area, and requirements..." 
                      className="w-full text-xs px-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none resize-none"
                    ></textarea>
                    {errors.message && <span className="text-[10px] text-red-500 mt-1">Message is required</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md shadow-[#2596be]/20 flex items-center justify-center gap-2"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-4 h-4" />
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

export default Contact;
