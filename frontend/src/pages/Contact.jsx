import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Contact Us</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Locate Our Offices, Connect via WhatsApp, or Write to Us</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Get In Touch</h2>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 text-xs">
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white uppercase tracking-wider mb-1">Corporate Office</h3>
                  <p className="text-slate-500 dark:text-slate-450 leading-relaxed">
                    12th Floor, Prestige Tower,<br />
                    MG Road, Bangalore, Karnataka - 560001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white uppercase tracking-wider mb-1">Dials & Hotline</h3>
                  <p className="text-slate-500 dark:text-slate-450 mt-1"><strong>Phone:</strong> +91 98765 43210</p>
                  <p className="text-slate-500 dark:text-slate-450"><strong>Landline:</strong> +91 80 2554 1120</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white uppercase tracking-wider mb-1">Electronic Support</h3>
                  <p className="text-slate-500 dark:text-slate-450 mt-1">info@abacushomes.com</p>
                  <p className="text-slate-500 dark:text-slate-450">support@abacushomes.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white uppercase tracking-wider mb-1">Office Hours</h3>
                  <p className="text-slate-500 dark:text-slate-450 mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-500 dark:text-slate-450">Sunday: Closed</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-4 border-t">
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded font-bold uppercase tracking-wider transition-colors flex items-center justify-center shadow"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Chat
                </a>
              </div>

            </div>
          </div>

          {/* Form & Map Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Inquiry Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
              <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-6">Send Us a Message</h2>
              
              {success ? (
                <div className="p-4 bg-green-50 dark:bg-slate-950 text-green-600 dark:text-green-400 border border-green-200 rounded text-xs text-center font-bold">
                  {success}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
                      <input 
                        type="text" 
                        {...register('name', { required: true })}
                        className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                      {errors.name && <span className="text-[10px] text-red-500">Name is required</span>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        {...register('phone', { required: true })}
                        className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                      {errors.phone && <span className="text-[10px] text-red-500">Phone is required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                    <input 
                      type="email" 
                      {...register('email', { required: true })}
                      className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    {errors.email && <span className="text-[10px] text-red-500">Email is required</span>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Message</label>
                    <textarea 
                      rows="4" 
                      {...register('message', { required: true })}
                      className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    {errors.message && <span className="text-[10px] text-red-500">Message is required</span>}
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Mock Panel */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden h-[250px] border relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }}></div>
              <div className="absolute inset-0 bg-primary/70 backdrop-blur-[1px] flex items-center justify-center p-6 text-center text-white">
                <div>
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-sm">Interactive Map Location</h3>
                  <p className="text-[10px] text-slate-300 mt-1">Prestige Tower, MG Road, Bangalore</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-gold hover:bg-gold-dark rounded font-bold text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Open Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
