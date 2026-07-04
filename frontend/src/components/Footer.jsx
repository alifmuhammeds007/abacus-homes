import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 rounded bg-white flex items-center justify-center font-serif text-slate-900 text-lg font-bold border border-gold">
                A
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                ABACUS<span className="text-gold"> HOMES</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We design, plan, build, and deliver premium homes, commercial landmarks, and beautiful interiors. Inspired by engineering excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-gold text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-gold text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-gold text-white transition-colors" aria-label="Linkedin">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-gold text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white text-base font-bold mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-gold transition-colors">Our Projects</Link></li>
              <li><Link to="/floor-plans" className="hover:text-gold transition-colors">Floor Plans</Link></li>
              <li><Link to="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-serif text-white text-base font-bold mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-gold transition-colors">Architectural Drafting</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Building Approvals</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Residential Construction</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Commercial Contracting</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Interior Designing</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Landscape & Gardening</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-serif text-white text-base font-bold mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">Newsletter</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to get latest design tips, cost trends, and project updates.
            </p>
            <form onSubmit={handleNewsletter} className="flex mb-6">
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                className="w-full px-3 py-2 text-xs text-slate-900 bg-white rounded-l focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button 
                type="submit" 
                className="px-3 bg-gold hover:bg-gold-dark text-white rounded-r transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gold mr-2 mt-0.5 shrink-0" />
                <span>12th Floor, Prestige Tower, MG Road, Bangalore - 560001</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gold mr-2 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gold mr-2 shrink-0" />
                <span>info@abacushomes.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Abacus Homes. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
