import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, Moon, ChevronDown, User, Calculator, ShieldCheck, Ruler, Home, Building, Search, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({ name: '', phone: '', email: '', date: '', slot: '10:00 AM', type: 'Design Consultation' });

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Searching site for: ${searchQuery}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    alert(`Consultation Appointed successfully!\nDate: ${appointmentForm.date}\nTime: ${appointmentForm.slot}\nType: ${appointmentForm.type}`);
    setIsAppointmentOpen(false);
    setAppointmentForm({ name: '', phone: '', email: '', date: '', slot: '10:00 AM', type: 'Design Consultation' });
  };

  const handleDownloadBrochure = () => {
    alert('Preparing your company brochure PDF download...');
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  const activeStyle = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-300 uppercase tracking-wider ${
      isActive 
        ? 'text-gold dark:text-gold-light border-b-2 border-gold pb-1' 
        : 'text-primary dark:text-white hover:text-gold dark:hover:text-gold-light'
    }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3 shadow-premium' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary dark:bg-white flex items-center justify-center font-serif text-white dark:text-primary text-xl font-bold border border-gold shadow-md">
                A
              </div>
              <div>
                <span className="font-serif text-lg md:text-xl font-extrabold tracking-wider text-primary dark:text-white group-hover:text-gold transition-colors">
                  ABACUS<span className="text-gold"> HOMES</span>
                </span>
                <p className="text-[9px] uppercase tracking-widest text-construction dark:text-construction-light font-bold">
                  Design • Build • Deliver
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink to="/" className={activeStyle}>Home</NavLink>
              <NavLink to="/about" className={activeStyle}>About</NavLink>
              
              {/* Mega Menu Toggle */}
              <div 
                className="relative"
                onMouseEnter={() => setIsMegaOpen(true)}
                onMouseLeave={() => setIsMegaOpen(false)}
              >
                <button className="flex items-center text-sm font-semibold uppercase tracking-wider text-primary dark:text-white hover:text-gold dark:hover:text-gold-light focus:outline-none py-2">
                  Services <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {isMegaOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-[600px] bg-white dark:bg-slate-900 rounded-xl shadow-premium-hover border border-slate-100 dark:border-slate-800 p-6 z-50 grid grid-cols-2 gap-6"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-3 border-b pb-2">Design & Planning</h4>
                        <ul className="space-y-3">
                          <li>
                            <Link to="/services" className="flex items-start hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                              <Ruler className="w-5 h-5 text-primary dark:text-primary-light mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-bold text-primary dark:text-white">Architectural Drafting</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Custom plans, elevations, elevations & 3D renders.</p>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to="/services" className="flex items-start hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                              <ShieldCheck className="w-5 h-5 text-primary dark:text-primary-light mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-bold text-primary dark:text-white">Municipal Approvals</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Panchayat permissions and structural validations.</p>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-3 border-b pb-2">Civil Construction</h4>
                        <ul className="space-y-3">
                          <li>
                            <Link to="/services" className="flex items-start hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                              <Home className="w-5 h-5 text-construction dark:text-construction-light mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-bold text-primary dark:text-white">Residential Building</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Luxurious villa structures and turnkey houses.</p>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to="/services" className="flex items-start hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                              <Building className="w-5 h-5 text-construction dark:text-construction-light mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-bold text-primary dark:text-white">Commercial Projects</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Premium retail spaces and structural frameworks.</p>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg flex justify-between items-center text-xs">
                        <button onClick={handleDownloadBrochure} className="flex items-center font-bold text-primary dark:text-gold hover:underline">
                          <Download className="w-4 h-4 mr-1.5" /> Download Company Brochure
                        </button>
                        <Link to="/calculator" className="flex items-center font-bold text-gold hover:text-gold-dark">
                          <Calculator className="w-4 h-4 mr-1" /> Use Calculator
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/projects" className={activeStyle}>Projects</NavLink>
              <NavLink to="/gallery" className={activeStyle}>Gallery</NavLink>
              <NavLink to="/floor-plans" className={activeStyle}>Floor Plans</NavLink>
              <NavLink to="/blog" className={activeStyle}>Blog</NavLink>
              <NavLink to="/careers" className={activeStyle}>Careers</NavLink>
              <NavLink to="/contact" className={activeStyle}>Contact</NavLink>
            </div>

            {/* Right Action Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Toggle Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Dashboard / User Login CTA */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    to={user.is_staff ? "/admin" : "/dashboard"}
                    className="flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary-dark text-white rounded-lg transition-all border border-gold"
                  >
                    <User className="w-4 h-4 mr-1.5" /> Dashboard
                  </Link>
                  <button 
                    onClick={logout} 
                    className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest pl-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider bg-transparent border border-primary dark:border-white text-primary dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary rounded-lg transition-all"
                >
                  <User className="w-4 h-4 mr-1.5" /> Client Portal
                </Link>
              )}

              {/* Appointment Booking Trigger */}
              <button 
                onClick={() => setIsAppointmentOpen(true)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-gold hover:bg-gold-dark text-white rounded-lg shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden space-x-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-primary dark:text-white"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>
              {/* Mobile Theme Toggle */}
              <button onClick={toggleDarkMode} className="p-2 rounded-full text-primary dark:text-white">
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-lg text-primary dark:text-white focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Bar Dropdown Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute left-0 w-full bg-white dark:bg-slate-900 border-b shadow-md overflow-hidden z-40 py-4 px-4 sm:px-12 flex justify-center"
            >
              <form onSubmit={handleSearchSubmit} className="flex max-w-2xl w-full">
                <input
                  type="text"
                  placeholder="Search Abacus Homes: projects, floor plans, cost calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs px-4 py-2 border rounded-l-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-dark px-4 rounded-r-lg flex items-center justify-center font-bold text-xs uppercase tracking-wider"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <NavLink to="/" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Home</NavLink>
                <NavLink to="/about" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">About Us</NavLink>
                <NavLink to="/services" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Services</NavLink>
                <NavLink to="/projects" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Projects</NavLink>
                <NavLink to="/gallery" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Gallery</NavLink>
                <NavLink to="/floor-plans" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Floor Plans</NavLink>
                <NavLink to="/calculator" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Cost Calculator</NavLink>
                <NavLink to="/blog" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Blog</NavLink>
                <NavLink to="/careers" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Careers</NavLink>
                <NavLink to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-base font-semibold text-primary dark:text-white">Contact</NavLink>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3 px-3">
                  {user ? (
                    <>
                      <Link 
                        to={user.is_staff ? "/admin" : "/dashboard"} 
                        onClick={toggleMenu}
                        className="text-center py-2 bg-primary text-white rounded-lg font-bold"
                      >
                        Dashboard
                      </Link>
                      <button onClick={() => { logout(); toggleMenu(); }} className="text-center py-2 text-red-500 font-bold border border-red-500 rounded-lg">
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={toggleMenu}
                      className="text-center py-2 border border-primary dark:border-white text-primary dark:text-white rounded-lg font-bold"
                    >
                      Client Portal
                    </Link>
                  )}
                  <button 
                    onClick={() => { setIsAppointmentOpen(true); toggleMenu(); }}
                    className="text-center py-2.5 bg-gold text-white rounded-lg font-bold shadow"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {isAppointmentOpen && (
          <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-premium relative"
            >
              <button 
                onClick={() => setIsAppointmentOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-655 p-1 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
              
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-2 flex items-center">
                <Calendar className="w-5 h-5 text-gold mr-2" /> Book a Consultation Slot
              </h3>
              <p className="text-xs text-slate-500 mb-6">Select your date and time slot to align a call with our Chief Architect.</p>
              
              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase mb-1">Time Slot</label>
                    <select
                      value={appointmentForm.slot}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, slot: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase mb-1">Meeting Type</label>
                  <select
                    value={appointmentForm.type}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="Design Consultation">Design Consultation</option>
                    <option value="Construction Estimate">Construction Estimate</option>
                    <option value="Vastu Compliance Call">Vastu Compliance Call</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gold hover:bg-gold-dark text-white rounded font-bold uppercase tracking-wider transition-colors shadow"
                >
                  Book Slot Now
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

