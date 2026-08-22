import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '10:00 AM - 11:30 AM',
    consultType: 'In-Person Studio Visit (Kochi)',
    name: '',
    phone: '',
    email: '',
    plotLocation: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '10:00 AM - 11:30 AM',
    '02:00 PM - 03:30 PM',
    '04:30 PM - 06:00 PM',
    '07:00 PM - 08:30 PM (Virtual)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-gold hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gold/15 border-2 border-gold text-gold flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Consultation Slot Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              We have reserved your slot for <b>{formData.date || 'Upcoming Date'}</b> ({formData.timeSlot}). A principal architect from Abacus Homes will connect with you.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-gold mb-6">
              Booking Ref: #ABACUS-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono tracking-widest uppercase mb-2">
                Priority Booking
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Book a Consultation Slot
              </h3>
              <p className="text-xs text-slate-400">
                Meet our chief architects to discuss site feasibility, budgets & blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Time Slot *
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['In-Person Studio Visit (Kochi)', 'Virtual Video Call'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFormData({ ...formData, consultType: mode })}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono tracking-wide text-left transition-all ${
                      formData.consultType === mode
                        ? 'bg-gold/15 border-gold text-gold font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Nair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98470 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Plot Location / City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 12 cents in Kakkanad, Kochi"
                value={formData.plotLocation}
                onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-dark hover:to-gold text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-gold/20 flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {loading ? (
                <span className="font-mono">Reserving Slot...</span>
              ) : (
                <>
                  <span>Confirm Consultation Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ConsultationModal;
