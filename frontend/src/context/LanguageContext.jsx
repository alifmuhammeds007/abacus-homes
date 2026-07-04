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
    tagline: "The Complete Solution for Building Construction",
    subheading: "Design. Plan. Build. Deliver.",
    getQuote: "Get Free Quote",
    viewProjects: "View Projects",
    callNow: "Call Now",
    bookAppointment: "Book Appointment",
    whyChooseUs: "Why Choose Us",
    ourProcess: "Our Process",
    testimonials: "Testimonials",
    faqs: "FAQs",
    copyright: "All rights reserved."
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
    tagline: "കെട്ടിട നിർമ്മാണത്തിനുള്ള സമ്പൂർണ്ണ പരിഹാരം",
    subheading: "ഡിസൈൻ. പ്ലാൻ. നിർമ്മാണം. കൈമാറൽ.",
    getQuote: "സൗജന്യ വിവരങ്ങൾ",
    viewProjects: "പ്രോജക്റ്റുകൾ കാണുക",
    callNow: "വിളിക്കുക",
    bookAppointment: "ബുക്കിംഗ് ചെയ്യുക",
    whyChooseUs: "എന്തുകൊണ്ട് ഞങ്ങളെ തിരഞ്ഞെടുക്കണം",
    ourProcess: "നിർമ്മാണ ഘട്ടങ്ങൾ",
    testimonials: "അഭിപ്രായങ്ങൾ",
    faqs: "ചോദ്യങ്ങൾ",
    copyright: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം."
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
