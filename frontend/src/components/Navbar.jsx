import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, Calendar, Calculator, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './ui/Logo';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Complete list of all navbar items
  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'PACKAGES', path: '/packages' },
    { label: 'CALCULATOR', path: '/calculator' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      {/* Master Floating Luxury Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
        <nav 
          className={`max-w-7xl mx-auto w-full rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 pointer-events-auto flex items-center justify-between border ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-slate-900' 
              : 'bg-[#f8fafc]/90 backdrop-blur-xl border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-slate-900'
          }`}
        >
          
          {/* 1. BRAND LOGO -> Goes to Home Page */}
          <Link to="/" className="flex items-center group shrink-0 py-0.5">
            <Logo variant="dark" height="h-8 sm:h-9" />
          </Link>

          {/* 2. DEDICATED PAGE NAVIGATION LINKS (CENTER) */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors bg-slate-100/90 border-slate-200/90">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#2596be] font-bold shadow-xs border border-slate-200/60'
                      : 'text-slate-700 hover:text-[#2596be] hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* 3. RIGHT ACTIONS: PORTAL, LANGUAGE & BOOKING */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Client Portal Button -> Goes to /login */}
            <Link
              to="/login"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold border transition-all duration-200 ${
                location.pathname === '/login' || location.pathname === '/dashboard' || location.pathname === '/client-portal'
                  ? 'bg-[#2596be]/10 text-[#2596be] border-[#2596be]/40'
                  : 'text-slate-700 hover:text-[#2596be] border-slate-200 hover:border-[#2596be]/40 bg-slate-100/80 hover:bg-white'
              }`}
              title="Client Project Portal"
            >
              <User className="w-3.5 h-3.5 text-[#2596be]" />
              <span>Portal</span>
            </Link>

            {/* Language Switcher Dual Pill */}
            <div className="flex items-center border rounded-full p-0.5 text-[10px] font-mono bg-slate-100 border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  language === 'ml'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ML
              </button>
            </div>

            {/* Book Consultation Slot Button -> Goes to /consultation */}
            <Link
              to="/consultation"
              className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[#2596be]/20 flex items-center gap-2 hover:scale-105 active:scale-95 bg-[#2596be] hover:bg-[#1d7fa2]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book A Slot</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/login"
              className="p-2 rounded-xl border text-xs bg-slate-100 border-slate-200 text-[#2596be]"
              title="Client Portal"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700"
            >
              {language === 'en' ? 'മല' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#2596be] active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 sm:hidden">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[#2596be] uppercase tracking-widest px-3 mb-1">
              Page Directory
            </span>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-sans text-base font-bold flex justify-between items-center transition-colors ${
                    isActive
                      ? 'bg-[#2596be]/10 text-[#2596be] border border-[#2596be]/30'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-[#2596be]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-[#2596be]" />
              <span>Access Client Portal</span>
            </Link>

            <Link
              to="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-[#2596be] text-white font-sans font-bold text-xs uppercase tracking-widest text-center rounded-xl shadow-lg shadow-[#2596be]/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Slot</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
