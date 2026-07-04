import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldAlert, Award, Gem, Bookmark } from 'lucide-react';

const PACKAGES = [
  {
    name: "Basic Package",
    tagline: "Standard Civil Build",
    icon: Bookmark,
    price: "Rs. 1,600",
    color: "slate-700",
    features: [
      "Custom 2D House Planning",
      "Panchayat / Municipal Approvals",
      "Standard Civil Construction Structure",
      "Fe 500 Grade Steel Reinforcement",
      "Coromandel / ACC Cement",
      "Standard Bricks & Aggregates",
      "Ceramic Flooring Tiles",
      "1-Year General Warranty"
    ]
  },
  {
    name: "Premium Package",
    tagline: "Elevated Finish & Landscapes",
    icon: Award,
    price: "Rs. 2,200",
    color: "gold",
    features: [
      "Detailed 3D Facade Elevation",
      "Panchayat / Corporation Approvals",
      "Premium Turnkey Civil Build",
      "Fe 550 Grade Steel Reinforcement",
      "UltraTech / ACC Cement Sourcing",
      "Vitrified Floor Tiles (Kajaria/Cera)",
      "Modular Kitchen Carcasses & Fittings",
      "False Ceilings in Living/Bedrooms",
      "Bespoke Landscape Garden Sods",
      "5-Year Structural Warranty"
    ]
  },
  {
    name: "Luxury Package",
    tagline: "Automated Executive Estates",
    icon: Gem,
    price: "Rs. 2,650",
    color: "primary",
    features: [
      "Full Architectural Consulting & Vastu Planning",
      "Turnkey Permits & Municipal NOCs",
      "High-Performance Civil Construction",
      "Tata Steel / Jindal Steel reinforcements",
      "Premium Italian Marble / Granite Floorings",
      "Full Smart Home Automation Systems",
      "Designer Wardrobes & Modular Ceilings",
      "Bespoke Swimming Pool & Outdoor Paving",
      "Bangalore Stone Facade Claddings",
      "10-Year Structural Civil Warranty"
    ]
  }
];

const Packages = () => {
  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Our Construction Packages</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Transparent Pricing Categories Tailored to Your Dream Specifications</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Package Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PACKAGES.map((pkg, idx) => {
            const IconComp = pkg.icon;
            const isPremium = pkg.name === "Premium Package";
            return (
              <div 
                key={idx}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between ${
                  isPremium 
                    ? 'border-gold relative ring-2 ring-gold/20 scale-102 z-10' 
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                {isPremium && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">{pkg.tagline}</span>
                    <IconComp className="w-6 h-6 text-gold" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary dark:text-white font-serif mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-gold font-serif">{pkg.price}</span>
                    <span className="text-xs text-slate-400 pl-1">/ Sq.Ft.</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 border-t pt-6 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-gold shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to="/consultation" 
                  className={`w-full py-3 text-center rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                    isPremium 
                      ? 'bg-gold hover:bg-gold-dark text-white shadow' 
                      : 'bg-primary hover:bg-primary-dark text-white'
                  }`}
                >
                  Choose {pkg.name.split(' ')[0]}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 flex items-start text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-gold shrink-0 mr-3 mt-0.5" />
          <p>
            * Prices quoted are base structural/finishing rates for civil residential buildings in Kerala & Bangalore. Ground preparation complexity, deep piling foundations, custom architectural structures, and compound walls are evaluated separately post site visit survey.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Packages;
