import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    projects: "Projects",
    gallery: "Gallery",
    floor_plans: "Floor Plans",
    calculator: "Cost Calculator",
    emi: "EMI Calculator",
    packages: "Packages",
    careers: "Careers",
    contact: "Contact",
    consultation: "Free Quote",
    portal: "Client Portal",
    tagline: "ARCHITECTURE · CONSTRUCTION",
    subheading: "Design. Plan. Build. Deliver.",
    getQuote: "Get Free Quote",
    viewProjects: "View Projects",
    callNow: "Call Now",
    bookAppointment: "Book Consultation",
    whyChooseUs: "Why Choose Us",
    ourProcess: "Our Process",
    testimonials: "Testimonials",
    faqs: "FAQs",
    copyright: "All rights reserved.",
    
    // Hero & Features
    hero_eyebrow: "Turnkey Architecture & Construction, Kerala",
    hero_h1_start: "We build homes",
    hero_h1_em: "worth",
    hero_h1_end: "a lifetime.",
    hero_sub: "From first sketch to final handover — architecture, structural engineering, approvals and luxury interiors, delivered as one seamless turnkey experience.",
    hero_cta1: "Explore Projects",
    hero_cta2: "Get Free Estimate",
    st1: "Projects Completed",
    st2: "Years Experience",
    st3: "On-Time Delivery",
    st4: "Client Rating",
    stage_cap: "Consultation → Design → Approvals → Build → Handover",
    scroll: "Scroll",
    sb1: "Sq.Ft. Constructed",
    sb2: "ISO 9001:2015 Certified",
    sb3: "Structural Warranty",
    sb4: "In-House Engineers",
    
    // Services
    svc_eyebrow: "What We Do",
    svc_h2: "Every discipline under one roof.",
    svc_sub: "A single accountable team across design, engineering, approvals and execution — so nothing gets lost between contractors.",
    svc1_h: "Architectural 2D & 3D Design",
    svc1_p: "Concept sketches, working drawings and photoreal 3D walkthroughs before a single brick is laid.",
    svc2_h: "Turnkey Construction",
    svc2_p: "Residential and commercial builds, managed end-to-end with fixed-price, fixed-timeline contracts.",
    svc3_h: "Luxury Interior Fitout",
    svc3_p: "Bespoke modular kitchens, wardrobes, false ceilings and curated furnishing schemes.",
    svc4_h: "Structural Engineering",
    svc4_p: "Soil testing, feasibility analysis and seismic-rated structural design for every plot.",
    svc5_h: "Government Sanctions",
    svc5_p: "Municipality approvals, building permits and completion certificates, fully managed.",
    svc6_h: "Landscape Architecture",
    svc6_p: "Outdoor living, gardens and site planning that complete the architectural story.",
    
    // Before / After
    ba_eyebrow: "Transformations",
    ba_h2: "Drag to see the difference.",
    ba_sub: "A renovation in Kakkanad — from a tired 90s structure to a contemporary family home.",
    ba_before: "Before",
    ba_after: "After",
    
    // Projects
    pr_eyebrow: "Portfolio",
    pr_h2: "Featured projects.",
    pr_sub: "A selection of residences and commercial spaces delivered across Kerala.",
    pt_all: "All",
    pt_res: "Residential",
    pt_com: "Commercial",
    pt_int: "Interior",
    pt_land: "Landscape",
    p1_tag: "Residential · Kochi",
    p1_h: "The Meridian Villa",
    p2_tag: "Commercial · Kozhikode",
    p2_h: "Silversmith Business Park",
    p3_tag: "Interior · Thrissur",
    p3_h: "Ashwin Residence Interiors",
    
    // Packages
    pk_eyebrow: "Turnkey Packages",
    pk_h2: "Transparent tiers, no surprises.",
    pk_sub: "Every package is fixed-price and includes structural warranty, project management and a dedicated site engineer.",
    pk1_h: "Essential",
    pk1_p: "Solid, honest construction for value-conscious builds.",
    pk1_l1: "TMT Steel & OPC 43 Cement",
    pk1_l2: "Vitrified flooring",
    pk1_l3: "5-year structural warranty",
    pk2_badge: "Most Popular",
    pk2_h: "Premium",
    pk2_p: "Our most-chosen tier — elevated finishes, smart-ready wiring.",
    pk2_l1: "TMT Fe550 & OPC 53 Cement",
    pk2_l2: "Italian marble-finish tiles",
    pk2_l3: "Home automation pre-wiring",
    pk2_l4: "10-year structural warranty",
    pk3_h: "Royal Luxury",
    pk3_p: "No-compromise materials and full designer interior fitout.",
    pk3_l1: "Imported natural stone cladding",
    pk3_l2: "Full home automation",
    pk3_l3: "15-year structural warranty",
    pk_cta: "Get Started",
    
    // Process
    proc_eyebrow: "How It Works",
    proc_h2: "Five stages to handover.",
    proc_sub: "The same disciplined process behind every Abacus build, from first meeting to move-in day.",
    proc1_h: "Consultation",
    proc1_p: "Site visit, budget and requirement mapping.",
    proc2_h: "3D Design",
    proc2_p: "Floor plans, elevation and interior visualisation.",
    proc3_h: "Approvals",
    proc3_p: "Municipality sanctions and permit filing.",
    proc4_h: "Turnkey Execution",
    proc4_p: "Construction with weekly progress tracking.",
    proc5_h: "Handover",
    proc5_p: "Final walkthrough and key handover.",
    
    // Testimonials
    ts_eyebrow: "Client Stories",
    ts_h2: "Verified reviews.",
    ts1_p: "\"Abacus delivered our villa two weeks ahead of schedule, with every detail matching the 3D renders exactly.\"",
    ts1_n: "Anoop Menon",
    ts1_r: "Villa Owner, Kochi",
    ts2_p: "\"The client portal made tracking site progress effortless — photos every week, invoices always clear.\"",
    ts2_n: "Divya Nair",
    ts2_r: "Homeowner, Thrissur",
    ts3_p: "\"Professional from the first sketch to the final coat of paint. Highly recommend the Premium package.\"",
    ts3_n: "Rahul Krishnan",
    ts3_r: "Business Park Developer",
    
    // CTA
    cta_eyebrow: "Start Your Build",
    cta_h2: "Let's design the home you've always sketched in your head.",
    cta_btn: "Book a Free Site Visit",
    
    // Footer & Reviews
    foot_desc: "A turnkey architecture and construction studio building considered homes across Kerala since 2010.",
    review_txt: "Google Reviews"
  },
  ml: {
    home: "ഹോം",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    services: "സേവനങ്ങൾ",
    projects: "പ്രോജക്റ്റുകൾ",
    gallery: "ഗാലറി",
    floor_plans: "ഫ്ലോർ പ്ലാനുകൾ",
    calculator: "നിർമ്മാണ ചെലവ്",
    emi: "ഇഎംഐ കാൽക്കുലേറ്റർ",
    packages: "പാക്കേജുകൾ",
    careers: "കരിയർ",
    contact: "ബന്ധപ്പെടുക",
    consultation: "സൗജന്യ ക്വോട്ട്",
    portal: "ക്ലയന്റ് പോർട്ടൽ",
    tagline: "ആർക്കിടെക്ചർ · നിർമ്മാണം",
    subheading: "ഡിസൈൻ. പ്ലാൻ. നിർമ്മാണം. കൈമാറൽ.",
    getQuote: "സൗജന്യ വിവരങ്ങൾ",
    viewProjects: "പ്രോജക്റ്റുകൾ കാണുക",
    callNow: "വിളിക്കുക",
    bookAppointment: "കൺസൾട്ടേഷൻ ബുക്ക് ചെയ്യുക",
    whyChooseUs: "എന്തുകൊണ്ട് ഞങ്ങളെ തിരഞ്ഞെടുക്കണം",
    ourProcess: "നിർമ്മാണ ഘട്ടങ്ങൾ",
    testimonials: "അഭിപ്രായങ്ങൾ",
    faqs: "ചോദ്യങ്ങൾ",
    copyright: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
    
    // Hero & Features
    hero_eyebrow: "ടേൺകീ ആർക്കിടെക്ചർ & നിർമ്മാണം, കേരളം",
    hero_h1_start: "ഒരു ജീവിതകാലം",
    hero_h1_em: "അർഹിക്കുന്ന",
    hero_h1_end: "വീടുകൾ ഞങ്ങൾ നിർമ്മിക്കുന്നു.",
    hero_sub: "ആദ്യ സ്കെച്ച് മുതൽ അവസാന കൈമാറ്റം വരെ — ആർക്കിടെക്ചർ, എൻജിനീയറിംഗ്, അനുമതികൾ, ലക്ഷ്വറി ഇന്റീരിയർ എല്ലാം ഒറ്റ ടേൺകീ അനുഭവമായി.",
    hero_cta1: "പ്രോജക്ടുകൾ കാണുക",
    hero_cta2: "സൗജന്യ എസ്റ്റിമേറ്റ് നേടുക",
    st1: "പൂർത്തിയായ പ്രോജക്ടുകൾ",
    st2: "വർഷത്തെ പരിചയം",
    st3: "സമയബന്ധിത ഡെലിവറി",
    st4: "ക്ലയന്റ് റേറ്റിംഗ്",
    stage_cap: "കൺസൾട്ടേഷൻ → ഡിസൈൻ → അനുമതികൾ → നിർമ്മാണം → കൈമാറ്റം",
    scroll: "സ്ക്രോൾ",
    sb1: "ചതുരശ്ര അടി നിർമ്മിച്ചു",
    sb2: "ISO 9001:2015 സർട്ടിഫൈഡ്",
    sb3: "സ്ട്രക്ചറൽ വാറന്റി",
    sb4: "ഇൻ-ഹൗസ് എൻജിനീയർമാർ",
    
    // Services
    svc_eyebrow: "ഞങ്ങൾ ചെയ്യുന്നത്",
    svc_h2: "എല്ലാ വൈദഗ്ധ്യവും ഒരു മേൽക്കൂരയ്ക്ക് കീഴിൽ.",
    svc_sub: "ഡിസൈൻ, എൻജിനീയറിംഗ്, അനുമതികൾ, നിർമ്മാണം എന്നിവയിലുടനീളം ഒരു ടീം — ഒന്നും നഷ്ടപ്പെടില്ല.",
    svc1_h: "2D & 3D ആർക്കിടെക്ചറൽ ഡിസൈൻ",
    svc1_p: "കോൺസെപ്റ്റ് സ്കെച്ചുകൾ, വർക്കിംഗ് ഡ്രോയിംഗുകൾ, ഫോട്ടോറിയൽ 3D വാക്ക്ത്രൂകൾ.",
    svc2_h: "ടേൺകീ നിർമ്മാണം",
    svc2_p: "നിശ്ചിത വിലയും സമയക്രമവുമുള്ള റെസിഡൻഷ്യൽ & കൊമേഴ്സ്യൽ നിർമ്മാണം.",
    svc3_h: "ലക്ഷ്വറി ഇന്റീരിയർ",
    svc3_p: "മോഡുലാർ കിച്ചൺ, വാർഡ്രോബ്, ഫാൾസ് സീലിംഗ്, ഫർണിഷിംഗ്.",
    svc4_h: "സ്ട്രക്ചറൽ എൻജിനീയറിംഗ്",
    svc4_p: "സോയിൽ ടെസ്റ്റിംഗ്, ഫീസിബിലിറ്റി അനാലിസിസ്, സ്ട്രക്ചറൽ ഡിസൈൻ.",
    svc5_h: "സർക്കാർ അനുമതികൾ",
    svc5_p: "മുനിസിപ്പാലിറ്റി അപ്രൂവലുകൾ, ബിൽഡിംഗ് പെർമിറ്റുകൾ.",
    svc6_h: "ലാൻഡ്സ്കേപ്പ് ആർക്കിടെക്ചർ",
    svc6_p: "ഔട്ട്ഡോർ ലിവിംഗ്, ഗാർഡനുകൾ, സൈറ്റ് പ്ലാനിംഗ്.",
    
    // Before / After
    ba_eyebrow: "പരിവർത്തനങ്ങൾ",
    ba_h2: "വ്യത്യാസം കാണാൻ വലിക്കുക.",
    ba_sub: "കാക്കനാട്ടിലെ ഒരു നവീകരണം — പഴയ ഘടനയിൽ നിന്ന് ആധുനിക ഭവനത്തിലേക്ക്.",
    ba_before: "മുൻപ്",
    ba_after: "ശേഷം",
    
    // Projects
    pr_eyebrow: "പോർട്ട്ഫോളിയോ",
    pr_h2: "ശ്രദ്ധേയമായ പ്രോജക്ടുകൾ.",
    pr_sub: "കേരളത്തിലുടനീളം പൂർത്തിയാക്കിയ വീടുകളും വാണിജ്യ ഇടങ്ങളും.",
    pt_all: "എല്ലാം",
    pt_res: "റെസിഡൻഷ്യൽ",
    pt_com: "കൊമേഴ്സ്യൽ",
    pt_int: "ഇന്റീരിയർ",
    pt_land: "ലാൻഡ്സ്കേപ്പ്",
    p1_tag: "റെസിഡൻഷ്യൽ · കൊച്ചി",
    p1_h: "ദി മെറിഡിയൻ വില്ല",
    p2_tag: "കൊമേഴ്സ്യൽ · കോഴിക്കോട്",
    p2_h: "സിൽവർസ്മിത്ത് ബിസിനസ് പാർക്ക്",
    p3_tag: "ഇന്റീരിയർ · തൃശ്ശൂർ",
    p3_h: "അശ്വിൻ റെസിഡൻസ് ഇന്റീരിയേഴ്സ്",
    
    // Packages
    pk_eyebrow: "ടേൺകീ പാക്കേജുകൾ",
    pk_h2: "സുതാര്യമായ നിരക്കുകൾ.",
    pk_sub: "എല്ലാ പാക്കേജിലും സ്ട്രക്ചറൽ വാറന്റിയും സൈറ്റ് എൻജിനീയറും ഉൾപ്പെടുന്നു.",
    pk1_h: "എസൻഷ്യൽ",
    pk1_p: "മൂല്യമുള്ള നിർമ്മാണത്തിന് ഉറച്ച ഗുണനിലവാരം.",
    pk1_l1: "TMT സ്റ്റീലും OPC 43 സിമന്റും",
    pk1_l2: "വിട്രിഫൈഡ് ഫ്ലോറിംഗ്",
    pk1_l3: "5 വർഷ വാറന്റി",
    pk2_badge: "ഏറ്റവും പ്രിയപ്പെട്ടത്",
    pk2_h: "പ്രീമിയം",
    pk2_p: "മെച്ചപ്പെട്ട ഫിനിഷുകളും സ്മാർട്ട് വയറിംഗും.",
    pk2_l1: "TMT Fe550 & OPC 53",
    pk2_l2: "മാർബിൾ ഫിനിഷ് ടൈലുകൾ",
    pk2_l3: "ഹോം ഓട്ടോമേഷൻ വയറിംഗ്",
    pk2_l4: "10 വർഷ വാറന്റി",
    pk3_h: "റോയൽ ലക്ഷ്വറി",
    pk3_p: "മികച്ച വസ്തുക്കളും പൂർണ്ണ ഇന്റീരിയർ ഫിറ്റൗട്ടും.",
    pk3_l1: "ഇറക്കുമതി ചെയ്ത സ്റ്റോൺ ക്ലാഡിംഗ്",
    pk3_l2: "ഫുൾ ഹോം ഓട്ടോമേഷൻ",
    pk3_l3: "15 വർഷ വാറന്റി",
    pk_cta: "ആരംഭിക്കുക",
    
    // Process
    proc_eyebrow: "പ്രവർത്തന രീതി",
    proc_h2: "കൈമാറ്റം വരെ അഞ്ച് ഘട്ടങ്ങൾ.",
    proc_sub: "ഓരോ അബാക്കസ് നിർമ്മാണത്തിന് പിന്നിലെ അതേ ചിട്ടയായ പ്രക്രിയ.",
    proc1_h: "കൺസൾട്ടേഷൻ",
    proc1_p: "സൈറ്റ് സന്ദർശനവും ബഡ്ജറ്റ് മാപ്പിംഗും.",
    proc2_h: "3D ഡിസൈൻ",
    proc2_p: "ഫ്ലോർ പ്ലാനുകളും വിഷ്വലൈസേഷനും.",
    proc3_h: "അനുമതികൾ",
    proc3_p: "മുനിസിപ്പാലിറ്റി അനുമതികളും ഫയലിംഗും.",
    proc4_h: "ടേൺകീ നിർമ്മാണം",
    proc4_p: "പ്രതിവാര പുരോഗതി ട്രാക്കിംഗോടെ.",
    proc5_h: "കൈമാറ്റം",
    proc5_p: "അന്തിമ വാക്ക്ത്രൂവും താക്കോൽ കൈമാറ്റവും.",
    
    // Testimonials
    ts_eyebrow: "ക്ലയന്റ് അഭിപ്രായങ്ങൾ",
    ts_h2: "സാക്ഷ്യപ്പെടുത്തിയ റിവ്യൂകൾ.",
    ts1_p: "\"അബാക്കസ് ഞങ്ങളുടെ വില്ല രണ്ടാഴ്ച നേരത്തെ കൈമാറി, 3D റെൻഡറുകളുമായി കൃത്യമായി പൊരുത്തപ്പെടുന്നു.\"",
    ts1_n: "അനൂപ് മേനോൻ",
    ts1_r: "വില്ല ഉടമ, കൊച്ചി",
    ts2_p: "\"ക്ലയന്റ് പോർട്ടൽ സൈറ്റ് പുരോഗതി ട്രാക്ക് ചെയ്യുന്നത് എളുപ്പമാക്കി.\"",
    ts2_n: "ദിവ്യ നായർ",
    ts2_r: "ഭവന ഉടമ, തൃശ്ശൂർ",
    ts3_p: "\"ആദ്യ സ്കെച്ച് മുതൽ അവസാന കോട്ട് പെയിന്റ് വരെ പ്രൊഫഷണൽ.\"",
    ts3_n: "രാഹുൽ കൃഷ്ണൻ",
    ts3_r: "ബിസിനസ് പാർക്ക് ഡെവലപ്പർ",
    
    // CTA
    cta_eyebrow: "നിർമ്മാണം ആരംഭിക്കുക",
    cta_h2: "നിങ്ങൾ എപ്പോഴും സ്വപ്നം കണ്ട വീട് നമുക്ക് രൂപകൽപ്പന ചെയ്യാം.",
    cta_btn: "സൗജന്യ സൈറ്റ് വിസിറ്റ് ബുക്ക് ചെയ്യുക",
    
    // Footer & Reviews
    foot_desc: "2010 മുതൽ കേരളത്തിലുടനീളം ചിന്തനീയമായ വീടുകൾ നിർമ്മിക്കുന്ന ടേൺകീ സ്റ്റുഡിയോ.",
    review_txt: "ഗൂഗിൾ റിവ്യൂകൾ"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved === 'ml' ? 'ml' : 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ml' : 'en';
      localStorage.setItem('language', next);
      return next;
    });
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
