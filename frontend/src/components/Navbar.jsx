import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, Calendar, Calculator, Phone } from 'lucide-react';
import Logo from './ui/Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isHeroBlended = location.pathname === '/' && !isScrolled;

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
      <header className={`fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 transition-all duration-500 pointer-events-none ${
        isHeroBlended ? 'md:bg-gradient-to-b md:from-black/60 md:via-black/20 md:to-transparent md:pb-8' : ''
      }`}>
        <nav 
          className={`max-w-7xl mx-auto w-full rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 pointer-events-auto flex items-center justify-between ${
            isHeroBlended 
              ? 'bg-sky-100/95 border border-sky-200/80 shadow-xs md:bg-black/20 md:hover:bg-black/30 md:border-transparent md:shadow-none text-slate-900 md:text-white' 
              : 'bg-sky-100/95 backdrop-blur-2xl border border-sky-200/90 shadow-[0_12px_40px_rgba(37,150,190,0.12)] text-slate-900 md:bg-white/95 md:border-slate-200/90 md:shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
          }`}
        >
          
          {/* 1. BRAND LOGO -> Goes to Home Page */}
          <Link to="/" className="flex items-center group shrink-0">
            <span className="hidden md:flex items-center">
              <Logo variant={isHeroBlended ? 'light' : 'dark'} />
            </span>
            <span className="flex md:hidden items-center">
              <Logo variant="dark" />
            </span>
          </Link>

          {/* 2. DEDICATED PAGE NAVIGATION LINKS (CENTER) */}
          <div className={`hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors ${
            isHeroBlended
              ? 'bg-black/25 border-white/15'
              : 'bg-slate-100/90 border-slate-200/90'
          }`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? isHeroBlended
                        ? 'bg-white/20 text-white font-bold shadow-xs border border-white/25'
                        : 'bg-white text-[#2596be] font-bold shadow-xs border border-slate-200/60'
                      : isHeroBlended
                        ? 'text-white/85 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
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
                  ? 'bg-[#2596be]/20 text-[#38bdf8] border-[#2596be]/40'
                  : isHeroBlended
                    ? 'text-white/90 hover:text-white border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                    : 'text-slate-700 hover:text-[#2596be] border-slate-200 hover:border-[#2596be]/40 bg-slate-100/80 hover:bg-white'
              }`}
              title="Client Project Portal"
            >
              <User className={`w-3.5 h-3.5 ${isHeroBlended ? 'text-[#38bdf8]' : 'text-[#2596be]'}`} />
              <span>Portal</span>
            </Link>

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
              className="p-2 rounded-xl border text-xs bg-white/80 border-sky-200/90 text-[#2596be] hover:bg-white transition-colors shadow-xs"
              title="Client Portal"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-sky-200/90 bg-white/80 text-slate-700 hover:text-[#2596be] hover:bg-white active:scale-95 transition-all shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-50 via-sky-50/98 to-white backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 sm:hidden">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[#2596be] uppercase tracking-widest px-3 mb-1 font-semibold">
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
                      ? 'bg-[#2596be] text-white shadow-md shadow-[#2596be]/25'
                      : 'text-slate-800 hover:bg-white hover:text-[#2596be]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-sky-200/80 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-white border border-sky-200 text-slate-800 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-sky-50 transition-colors shadow-xs"
            >
              <User className="w-4 h-4 text-[#2596be]" />
              <span>Access Client Portal</span>
            </Link>

            <Link
              to="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-[#2596be] text-white font-sans font-bold text-xs uppercase tracking-widest text-center rounded-xl shadow-lg shadow-[#2596be]/25 flex items-center justify-center gap-2 hover:bg-[#1d7fa2] transition-colors"
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
