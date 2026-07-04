import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import { Loader2 } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Gallery from './pages/Gallery';
import FloorPlans from './pages/FloorPlans';
import CostCalculator from './pages/CostCalculator';
import EmiCalculator from './pages/EmiCalculator';
import Packages from './pages/Packages';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FreeConsultation from './pages/FreeConsultation';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

// Scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [siteLoading, setSiteLoading] = useState(true);
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('cookie_consent') === 'true';
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSiteLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setCookieConsent(true);
  };

  if (siteLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center font-serif text-primary text-2xl font-bold border border-gold shadow-2xl animate-pulse mb-4">
          A
        </div>
        <p className="font-serif text-white tracking-widest uppercase text-sm font-bold">ABACUS<span className="text-gold"> HOMES</span></p>
        <Loader2 className="w-5 h-5 text-gold animate-spin mt-4" />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              {/* Global Sticky Navigation */}
              <Navbar />

              {/* Main Page Area */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/floor-plans" element={<FloorPlans />} />
                  <Route path="/calculator" element={<CostCalculator />} />
                  <Route path="/emi-calculator" element={<EmiCalculator />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/consultation" element={<FreeConsultation />} />
                  <Route path="/login" element={<ClientLogin />} />
                  <Route path="/dashboard" element={<ClientDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Global Footer */}
              <Footer />

              {/* Floating Overlays */}
              <FloatingWidgets />

              {/* Cookie Consent banner */}
              {!cookieConsent && (
                <div className="fixed bottom-0 left-0 w-full bg-slate-900 dark:bg-slate-950 border-t border-slate-800 p-4 text-white z-50 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 gap-4">
                  <p className="text-xs text-slate-300 max-w-2xl text-center sm:text-left leading-relaxed">
                    We use cookies to analyze website traffic and optimize your user experience. By accepting our use of cookies, your data will be aggregated with all other user data.
                  </p>
                  <div className="flex space-x-3 shrink-0">
                    <Link to="/privacy" className="px-4 py-2 border border-slate-700 hover:border-slate-500 rounded text-xs font-bold uppercase tracking-wider text-slate-300">Privacy Details</Link>
                    <button 
                      onClick={handleAcceptCookies}
                      className="px-5 py-2 bg-gold hover:bg-gold-dark text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
                    >
                      Accept Cookies
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}



export default App;
