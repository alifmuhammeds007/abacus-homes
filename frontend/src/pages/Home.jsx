import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, UserCheck, HardHat, FileText, CheckCircle2, ChevronRight,
  Shield, DollarSign, Users, Award, Hammer, Clock, Lightbulb, UserRound,
  MessageSquare, ChevronLeft, HelpCircle
} from 'lucide-react';
import { servicesAPI, testimonialsAPI } from '../services/api';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    title: "ABACUS HOMES",
    subtitle: "The Complete Solution for Building Construction",
    tags: ["Design", "Plan", "Build", "Deliver"]
  },
  {
    image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1600&q=80",
    title: "ENGINEERING EXCELLENCE",
    subtitle: "Built with Integrity and Sustainable Standards",
    tags: ["Foundation", "MEP", "Structure", "Quality"]
  },
  {
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    title: "CREATIVE ARCHITECTURE",
    subtitle: "Transforming Your Ideations into Luxury Spaces",
    tags: ["Blueprints", "3D Renders", "Elevations", "Vastu"]
  }
];

const TIMELINE_STEPS = [
  { step: "01", name: "Consultation", desc: "Understand your requirements, land space, and budget goals." },
  { step: "02", name: "Site Visit", desc: "Detailed soil testing, plot measurements, and site profiling." },
  { step: "03", name: "Planning", desc: "Creating space layouts, circulation flows, and interior themes." },
  { step: "04", name: "Architecture", desc: "Detailed 2D elevations, structural mapping, and 3D mockups." },
  { step: "05", name: "Govt Approvals", desc: "Handling local municipality building permit papers." },
  { step: "06", name: "Quotation", desc: "Detailed BOQs with absolute price and timeline guarantees." },
  { step: "07", name: "Construction", desc: "Civil brickwork, foundation concrete, slab casting, and structural frames." },
  { step: "08", name: "Interior Works", desc: "False ceiling installation, tiling, electrical, plumbing & wardrobes." },
  { step: "09", name: "Final Inspection", desc: "Rigorous quality checklist runs and system integrations verification." },
  { step: "10", name: "Handover", desc: "Delivering the house keys along with completion documents." }
];

const WHY_CHOOSE_US = [
  { icon: Shield, title: "Quality You Can Trust", desc: "We use FE 550 grade steel and high-durability concrete mixes." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "Detailed item-by-item BOQs. No hidden charges or surprise costs." },
  { icon: Users, title: "Experienced Engineers", desc: "Dedicated civil engineers with over 15+ years of structural expertise." },
  { icon: Award, title: "Professional Architects", desc: "Bespoke modern, traditional, and luxury elevations." },
  { icon: HardHat, title: "Modern Technology", desc: "Advanced plastering, concrete pouring, and design modeling systems." },
  { icon: Clock, title: "On-Time Delivery", desc: "Milestone-backed agreements ensuring project completion timelines." },
  { icon: Building, title: "Premium Materials", desc: "Tie-ups with leading premium brands for cement, steel, and fittings." },
  { icon: UserRound, title: "Dedicated Project Manager", desc: "Your single point of contact coordinating all site progress updates." },
  { icon: CheckCircle2, title: "Warranty Support", desc: "Comprehensive structural warranty post-handover." },
  { icon: MessageSquare, title: "Customer Satisfaction", desc: "Consistently rated 5-stars by premium villa owners." }
];

const FAQS = [
  { q: "What is your construction cost per square foot?", a: "Our construction packages start from Rs. 1,800 to Rs. 2,600 per Sq.Ft., depending on the quality of finishes, materials, and smart integrations selected. Please use our interactive calculator page for a detailed breakdown." },
  { q: "Do you assist with municipality building permit approvals?", a: "Yes. We handle building approvals end-to-end. We prepare the site plans, structural drawings, and file documentation for corporation, panchayat, or municipality permits." },
  { q: "Do you offer structural warranties for the homes you build?", a: "Absolutely. We offer a 10-year warranty on the civil structure and a 1-year general maintenance warranty covering plumbing, electrical installations, and waterproofing." },
  { q: "Can I monitor the construction progress of my home remotely?", a: "Yes! Every client gets access to our Client Portal where our engineers upload weekly progress photos, share payment milestone invoices, and publish government clearance documents." }
];

// Helper Counter component that increments numbers
const CounterItem = ({ targetValue, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // ms
    const increment = targetValue / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="text-center bg-white/45 dark:bg-slate-900/50 backdrop-blur rounded-2xl p-6 shadow-premium border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
      <p className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white font-serif mb-2">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    // Slide interval
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    // Fetch data from API/Mock
    servicesAPI.list().then(res => setServices(res.data.slice(0, 4)));
    testimonialsAPI.list().then(res => setTestimonials(res.data));

    return () => clearInterval(slideTimer);
  }, []);

  const nextTesti = () => {
    setTestiIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTesti = () => {
    setTestiIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      
      {/* 1. Hero Section Banner Slider */}
      <div className="relative h-screen w-full overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background image zoom transition */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[6000ms] scale-105 ease-out"
              style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-16">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif text-white mb-2 uppercase leading-none">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-gold mb-6">
                "{HERO_SLIDES[currentSlide].subtitle}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {HERO_SLIDES[currentSlide].tags.map((tag, i) => (
                  <span key={i} className="text-xs font-extrabold uppercase tracking-widest bg-construction/80 border border-gold/30 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-white font-bold rounded-lg shadow-lg text-center uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5">
                  Get Free Consultation
                </Link>
                <Link to="/projects" className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 text-center uppercase tracking-wider text-sm backdrop-blur transition-all hover:-translate-y-0.5">
                  View Projects
                </Link>
                <a href="tel:+919876543210" className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg border border-gold text-center uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Slider Dots indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'bg-gold w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Highlights / Animated Counters Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            <CounterItem targetValue={420} label="Completed Projects" suffix="+" />
            <CounterItem targetValue={380} label="Happy Clients" suffix="+" />
            <CounterItem targetValue={15} label="Years Experience" suffix="+" />
            <CounterItem targetValue={12} label="Expert Architects" />
            <CounterItem targetValue={25} label="Site Engineers" />
            <CounterItem targetValue={850000} label="Sq.Ft Completed" suffix="+" />
          </div>
        </div>
      </section>

      {/* 3. About Preview Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Home Facade"
                className="rounded-2xl shadow-premium border border-slate-100 dark:border-slate-800 w-full object-cover h-[350px] md:h-[450px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-2xl shadow-lg border border-white/20 hidden sm:block">
                <p className="text-4xl font-serif font-bold">15+</p>
                <p className="text-xs uppercase tracking-widest font-extrabold text-slate-100 mt-1">Years Building Trust</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-extrabold text-gold uppercase tracking-widest">About Abacus Homes</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mt-2 mb-6">
                Creating Landmark Civil Structures & Exquisite Architecture
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                Abacus Homes was founded on the pillars of transparency, structural integrity, and architectural beauty. We build custom-crafted spaces designed to provide premium luxury comfort and stand the test of time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="p-2.5 bg-primary/10 dark:bg-white/10 rounded-lg text-primary dark:text-white mr-3">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Our Mission</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">To construct top-tier homes using finest civil engineering practices.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2.5 bg-primary/10 dark:bg-white/10 rounded-lg text-primary dark:text-white mr-3">
                    <Lightbulb className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Our Vision</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">To be recognized as the premier architecture brand in the country.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center text-sm font-bold text-primary dark:text-white hover:text-gold dark:hover:text-gold-light group uppercase tracking-wider">
                Learn More About Us <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-gold uppercase tracking-widest">Our Solutions</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mt-2">Bespoke Design & Construction Services</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">From sketch blueprints to key handovers, we deliver end-to-end turnkey packages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => {
              return (
                <div key={s.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-gold/10 text-primary dark:text-gold">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-3 font-serif">{s.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{s.description}</p>
                  <Link to={`/services`} className="text-xs font-bold text-gold hover:underline flex items-center">
                    Read Details <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Process (Horizontal Timeline) */}
      <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-gold uppercase tracking-widest">Execution Timeline</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mt-2">Our 10-Step Building Journey</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">A transparent structure ensuring your home is delivered exactly on specification.</p>
          </div>

          <div className="overflow-x-auto pb-8 pt-4 -mx-4 px-4 scrollbar-thin">
            <div className="flex space-x-8 min-w-[1200px]">
              {TIMELINE_STEPS.map((step, idx) => (
                <div key={idx} className="w-72 shrink-0 relative bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100/80 dark:border-slate-800 shadow-premium transition-transform hover:-translate-y-1">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-xl bg-gold text-white flex items-center justify-center font-bold text-sm shadow-md border border-white/20">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-primary dark:text-white mt-2 mb-2 font-serif">{step.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  
                  {idx < TIMELINE_STEPS.length - 1 && (
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-gold font-bold text-lg hidden lg:block">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-gold uppercase tracking-widest">The Abacus Difference</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mt-2">Why Discerning Clients Choose Us</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">Engineering standards matching DLF, Prestige, and Tata Projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium transition-all hover:-translate-y-1 text-center flex flex-col items-center">
                  <div className="p-3 bg-primary/5 rounded-full text-gold mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-primary dark:text-white mb-2">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Carousel */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-xs font-extrabold text-gold uppercase tracking-widest">Client Testimonials</span>
            <h2 className="text-3xl font-serif text-primary dark:text-white mt-2 mb-10">What Our Premium Homeowners Say</h2>

            <div className="relative bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium">
              
              <div className="flex justify-center mb-6">
                <img 
                  src={testimonials[testiIndex].client_image} 
                  alt={testimonials[testiIndex].client_name}
                  className="w-16 h-16 rounded-full border-2 border-gold object-cover shadow"
                />
              </div>

              <div className="flex justify-center mb-4 text-yellow-400">
                {Array.from({ length: testimonials[testiIndex].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 italic text-sm md:text-base leading-relaxed mb-6 font-serif">
                "{testimonials[testiIndex].review_text}"
              </p>

              <div>
                <h4 className="font-bold text-sm text-primary dark:text-white">{testimonials[testiIndex].client_name}</h4>
                <p className="text-xs text-gold font-semibold uppercase tracking-widest mt-1">{testimonials[testiIndex].project_type}</p>
              </div>

              {/* Slider Nav Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-6">
                <button onClick={prevTesti} className="p-2.5 bg-white dark:bg-slate-800 rounded-full border shadow hover:bg-gold hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-6">
                <button onClick={nextTesti} className="p-2.5 bg-white dark:bg-slate-800 rounded-full border shadow hover:bg-gold hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 8. FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold text-gold uppercase tracking-widest font-serif">Frequently Asked Questions</span>
            <h2 className="text-3xl font-bold font-serif text-primary dark:text-white mt-2">Answering Your Civil Construction Queries</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-sm font-bold text-primary dark:text-white flex items-center font-serif">
                      <HelpCircle className="w-4 h-4 text-gold mr-3 shrink-0" /> {faq.q}
                    </span>
                    <span className="text-gold font-bold text-lg">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 dark:border-slate-850 px-5 py-4"
                      >
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
