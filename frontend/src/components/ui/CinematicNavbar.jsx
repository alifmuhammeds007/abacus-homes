import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Globe, User, Calculator, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ConsultationModal from './ConsultationModal';
import Logo from './Logo';

const CinematicNavbar = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section tracking for active indicator
      const sections = ['home', 'about', 'services', 'projects', 'process', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'services', label: 'SERVICES', href: '#services' },
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'process', label: 'PROCESS', href: '#process' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Capsule Header */}
      <header className="fixed top-0 left-0 right-0 z-40 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
        <nav 
          className={`max-w-7xl mx-auto w-full rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 pointer-events-auto flex items-center justify-between border ${
            isScrolled 
              ? 'bg-slate-950/90 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-slate-950/65 backdrop-blur-md border-white/10 shadow-lg'
          }`}
        >
          
          {/* 1. BRAND LOGO */}
          <Link to="/" className="flex items-center group shrink-0 py-0.5">
            <Logo variant="light" height="h-9 sm:h-10" />
          </Link>

          {/* 2. ORDERED NAVIGATION ITEMS (CENTER) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-white/5 px-3 py-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-widest transition-all duration-200 relative ${
                    isActive
                      ? 'bg-gold/15 text-gold font-bold shadow-sm border border-gold/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* 3. RIGHT CONTROLS, PORTAL & BOOKING BUTTONS */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Client Portal Link */}
            <Link
              to="/client-portal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300 hover:text-gold border border-white/10 hover:border-gold/40 bg-slate-900/60 hover:bg-slate-900 transition-all duration-200"
              title="Client Project Portal Login"
            >
              <User className="w-3.5 h-3.5 text-gold" />
              <span>Portal</span>
            </Link>

            {/* Cost Calculator Link */}
            <Link
              to="/calculator"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300 hover:text-gold border border-white/10 hover:border-gold/40 bg-slate-900/60 hover:bg-slate-900 transition-all duration-200"
              title="Estimate Construction Cost"
            >
              <Calculator className="w-3.5 h-3.5 text-gold" />
              <span>Calculator</span>
            </Link>

            {/* Language Switcher Dual Pill */}
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-full p-0.5 text-[10px] font-mono">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-gold text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'ml'
                    ? 'bg-gold text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ML
              </button>
            </div>

            {/* Book a Consultation Slot Button */}
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-dark hover:to-gold text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md shadow-gold/20 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book A Slot</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/client-portal"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-gold text-xs"
              title="Client Portal"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-gold"
            >
              {language === 'en' ? 'മല' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-gold active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </header>

      {/* Book Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 sm:hidden">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-gold uppercase tracking-widest px-3">
              Navigation Index
            </span>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-4 py-3 rounded-xl font-serif text-xl font-bold flex justify-between items-center transition-colors ${
                    isActive
                      ? 'bg-gold/10 text-gold border border-gold/30'
                      : 'text-white hover:bg-slate-900 hover:text-gold'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
            <Link
              to="/client-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-gold" />
              <span>Access Client Portal</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConsultationModalOpen(true);
              }}
              className="w-full py-3.5 bg-gold text-slate-950 font-bold text-xs uppercase tracking-widest text-center rounded-xl shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Slot</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CinematicNavbar;
