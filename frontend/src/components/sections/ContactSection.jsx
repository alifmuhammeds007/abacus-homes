import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Architecture',
    budget: '₹50 Lakhs - ₹1 Crore',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-28 bg-[#fafafa] text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Studio Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
                05 // INITIATE DIALOGUE
              </div>

              <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#3b2314] leading-tight mb-6 tracking-tight">
                LET'S SHAPE YOUR <span className="text-[#2596be] font-bold">STRUCTURE.</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-8">
                Whether you are embarking on a bespoke residence, modern villa, or structural renovation, our principal architects and project engineers are ready to consult on your site.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-sm font-sans font-bold text-slate-900 block">Main Atelier & Studio</b>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Abacus Tower, Seaport-Airport Road, Kakkanad, Kochi, Kerala — 682030
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-sm font-sans font-bold text-slate-900 block">Direct Inquiries</b>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      +91 98470 00000 / +91 484 2900000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-sm font-sans font-bold text-slate-900 block">Electronic Correspondence</b>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      build@abacushomes.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#2596be] flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-sm font-sans font-bold text-slate-900 block">Studio Hours</b>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Monday – Saturday: 09:00 AM – 06:30 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 mt-8 text-slate-400 text-[11px] font-mono">
              © {new Date().getFullYear()} ABACUS HOMES. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Right Column: Architectural Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 p-8 sm:p-10 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#2596be]/10 border border-[#2596be] text-[#2596be] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-sans font-bold text-slate-900 mb-2">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for connecting. Our principal architectural consultant will review your site parameters and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-[#2596be] hover:bg-[#1d7fa2] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-[#2596be]/20"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-sans font-bold text-[#3b2314] mb-1">
                    Book Architectural Consultation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Share your plot dimensions, location, and project vision.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Varma"
                      className="w-full bg-[#fafafa] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98470 00000"
                      className="w-full bg-[#fafafa] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anand@example.com"
                      className="w-full bg-[#fafafa] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Project Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#fafafa] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#2596be] transition-colors font-sans"
                    >
                      <option value="Residential Architecture">Turnkey Residential Villa</option>
                      <option value="Commercial Complex">Commercial Architecture</option>
                      <option value="Interior Architecture">Luxury Interior Fitout</option>
                      <option value="Renovation & Structural Retrofit">Renovation & Structural Retrofit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Plot Location & Project Vision
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your plot location (e.g. 10 cents in Kakkanad), desired built-up area (sqft), and architectural style..."
                    className="w-full bg-[#fafafa] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#2596be]/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loading ? (
                    <span className="font-mono">Processing...</span>
                  ) : (
                    <>
                      <span>Transmit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
