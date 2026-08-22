import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldAlert, Award, Gem, Bookmark } from 'lucide-react';

const PACKAGES = [
  {
    name: "Standard Package",
    tagline: "Quality Civil Construction",
    icon: Bookmark,
    price: "₹1,600",
    unit: "/ Sq.Ft.",
    color: "slate-700",
    features: [
      "Custom 2D Architectural House Planning",
      "Panchayat / Municipal Sanctions & Approvals",
      "Robust Earthquake-Resistant RCC Structure",
      "Fe 500 Grade Certified Steel Reinforcement",
      "Coromandel / ACC 53-Grade Cement",
      "Premium Wire-Cut Red Bricks & River Sand",
      "Vitrified Anti-Skid Ceramic Floor Tiles",
      "1-Year Comprehensive Civil Warranty"
    ]
  },
  {
    name: "Premium Package",
    tagline: "Elevated Finish & Landscapes",
    icon: Award,
    price: "₹2,200",
    unit: "/ Sq.Ft.",
    popular: true,
    color: "#2596be",
    features: [
      "Detailed 3D Facade & Photorealistic Renders",
      "Panchayat / Corporation Permit Approvals",
      "Turnkey Civil Build with Site Supervision",
      "Fe 550D TMT Grade Steel Reinforcement",
      "UltraTech Super / ACC Premium Cement",
      "Designer Vitrified Tiles (Kajaria / Somany)",
      "Modular Teakwood Kitchen Carcasses & Hardware",
      "False Ceilings in Living & Master Suite",
      "Bespoke Landscape Garden & Stepping Stones",
      "5-Year Certified Structural Warranty"
    ]
  },
  {
    name: "Luxury Estate Package",
    tagline: "Architectural Masterpieces",
    icon: Gem,
    price: "₹2,650",
    unit: "/ Sq.Ft.",
    color: "#3b2314",
    features: [
      "Full Architectural Atelier & Bioclimatic Vastu",
      "Complete Municipal Permits & Utility Sanctions",
      "Precision Engineering & Heavy Cantilever Casting",
      "Tata Tiscon / JSW Steel Reinforcements",
      "Imported Italian Marble & Granite Floors",
      "Smart Home IoT Automation & Concealed Conduits",
      "Full Custom Teakwood Wardrobes & Acoustic Paneling",
      "Landscape Reflection Pool / Deck Pergola",
      "Bangalore Natural Slate Stone Facade Claddings",
      "10-Year Structural Civil Guarantee"
    ]
  }
];

const Packages = () => {
  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            PACKAGES
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            04 // TRANSPARENT PRICING
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            CONSTRUCTION <span className="text-[#2596be]">PACKAGES.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Locked contract rates with zero cost overruns. Select the grade that fits your project vision.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Package Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PACKAGES.map((pkg, idx) => {
            const IconComp = pkg.icon;
            const isPremium = pkg.popular;
            return (
              <div 
                key={idx}
                className={`bg-white rounded-3xl p-8 sm:p-9 border shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(37,150,190,0.12)] transition-all flex flex-col justify-between hover:-translate-y-1.5 ${
                  isPremium 
                    ? 'border-[#2596be] relative ring-2 ring-[#2596be]/20' 
                    : 'border-slate-200/90'
                }`}
              >
                {isPremium && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2596be] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{pkg.tagline}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#2596be] flex items-center justify-center border border-slate-200">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#3b2314] font-sans mb-3">{pkg.name}</h3>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                    <span className="text-4xl font-extrabold text-slate-900 font-sans">{pkg.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{pkg.unit}</span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#2596be]/10 text-[#2596be] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-700 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/consultation"
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center ${
                    isPremium
                      ? 'bg-[#2596be] hover:bg-[#1d7fa2] text-white shadow-md shadow-[#2596be]/20'
                      : 'bg-slate-100 hover:bg-[#2596be] hover:text-white text-slate-800'
                  }`}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Custom Requirements Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#3b2314] font-sans">Need a customized structural package or commercial estimate?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Our cost engineering department prepares custom BOQ breakdowns for large estates.</p>
          </div>
          <Link
            to="/calculator"
            className="px-6 py-3 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#2596be]/20 transition-all shrink-0"
          >
            Calculate Cost Online
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Packages;
