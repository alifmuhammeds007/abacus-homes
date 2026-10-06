import React, { useState } from 'react';
import { Calculator, Hammer, HardHat, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CostCalculator = () => {
  const [inputs, setInputs] = useState({
    landArea: 1200,
    builtArea: 1500,
    floors: 1,
    bedrooms: 3,
    bathrooms: 3,
    constructionType: 'standard',
    premiumMaterials: false
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || value
    }));
  };

  const calculateCost = (e) => {
    e.preventDefault();

    // Rates per Sq.Ft.
    const rates = {
      economy: 1600,
      standard: 1900,
      premium: 2250,
      luxury: 2650
    };

    let rate = rates[inputs.constructionType];
    if (inputs.premiumMaterials) {
      rate += 250;
    }

    // Base cost based on Built Area
    let baseCost = inputs.builtArea * rate;

    // Floors adjustment
    if (inputs.floors > 1) {
      const extraFloors = inputs.floors - 1;
      baseCost += (inputs.builtArea / inputs.floors) * rate * 0.85 * extraFloors;
    }

    // Room configurations adjustments
    const standardBedsForArea = Math.ceil(inputs.builtArea / 600);
    const standardBathsForArea = standardBedsForArea;

    if (inputs.bedrooms > standardBedsForArea) {
      baseCost += (inputs.bedrooms - standardBedsForArea) * 120000;
    }
    if (inputs.bathrooms > standardBathsForArea) {
      baseCost += (inputs.bathrooms - standardBathsForArea) * 80000;
    }

    // Splits
    const materialCost = baseCost * 0.62;
    const labourCost = baseCost * 0.38;

    // Materials details
    const materials = {
      cement: materialCost * 0.16,
      steel: materialCost * 0.18,
      bricks: materialCost * 0.11,
      sandAggregate: materialCost * 0.12,
      tilesFlooring: materialCost * 0.14,
      paintPutty: materialCost * 0.08,
      plumbingElectrical: materialCost * 0.12,
      fittingsWoodwork: materialCost * 0.09
    };

    // Labour details
    const labours = {
      masonryCivil: labourCost * 0.50,
      carpentryWoodwork: labourCost * 0.15,
      painting: labourCost * 0.10,
      plumbingElectrical: labourCost * 0.15,
      flooringTileInstall: labourCost * 0.10
    };

    // Timeline calculation
    let timelineMonths = 8;
    if (inputs.builtArea > 1500 && inputs.builtArea <= 3000) {
      timelineMonths = 11;
    } else if (inputs.builtArea > 3000 && inputs.builtArea <= 5000) {
      timelineMonths = 14;
    } else if (inputs.builtArea > 5000) {
      timelineMonths = 18;
    }

    if (inputs.floors > 1) {
      timelineMonths += (inputs.floors - 1) * 2;
    }

    setResults({
      totalCost: baseCost,
      materialCost,
      labourCost,
      materials,
      labours,
      timelineMonths
    });
  };

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            ESTIMATOR
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            CONSTRUCTION <span className="text-[#2596be]">CALCULATOR.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Instant online estimates for civil materials, skilled labour, and estimated completion schedules.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Inputs Section */}
          <div className="lg:col-span-1 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-base font-sans font-bold text-[#3b2314] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#2596be]" /> Specification Form
            </h2>

            <form onSubmit={calculateCost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Plot Land Area (Sq.Ft.)</label>
                <input 
                  type="number" 
                  name="landArea"
                  value={inputs.landArea}
                  onChange={handleInputChange}
                  required
                  min="300"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#2596be] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Built-Up Area (Sq.Ft.)</label>
                <input 
                  type="number" 
                  name="builtArea"
                  value={inputs.builtArea}
                  onChange={handleInputChange}
                  required
                  min="300"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#2596be] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Floors</label>
                  <select 
                    name="floors"
                    value={inputs.floors}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 bg-[#fafafa] border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {[1, 2, 3, 4].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Beds</label>
                  <select 
                    name="bedrooms"
                    value={inputs.bedrooms}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 bg-[#fafafa] border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Baths</label>
                  <select 
                    name="bathrooms"
                    value={inputs.bathrooms}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 bg-[#fafafa] border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(ba => <option key={ba} value={ba}>{ba}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Finishing Grade</label>
                <select 
                  name="constructionType"
                  value={inputs.constructionType}
                  onChange={handleInputChange}
                  className="w-full text-xs px-3 py-2.5 bg-[#fafafa] border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="economy">Economy (Basic materials - ₹1,600/sqft)</option>
                  <option value="standard">Standard (Quality concrete & tiles - ₹1,900/sqft)</option>
                  <option value="premium">Premium (Teakwood & false ceiling - ₹2,250/sqft)</option>
                  <option value="luxury">Luxury (Imported Italian marble - ₹2,650/sqft)</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="premiumMaterials"
                    checked={inputs.premiumMaterials}
                    onChange={handleInputChange}
                    className="rounded text-[#2596be] focus:ring-[#2596be] w-4 h-4"
                  />
                  <span className="text-xs text-slate-700 font-medium">Add Smart Home Automation (+₹250/sqft)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#2596be]/20 transition-all mt-4"
              >
                Compute Estimated Cost
              </button>
            </form>
          </div>

          {/* Results Output Section */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
                
                {/* Total Cost Display */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2596be] uppercase tracking-wider">Estimated Project Budget</span>
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#3b2314] font-sans mt-1">
                      ₹{results.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-[#fafafa] px-4 py-2.5 rounded-2xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Timeline</span>
                    <span className="text-sm font-extrabold text-[#2596be]">{results.timelineMonths} Months</span>
                  </div>
                </div>

                {/* Materials & Labour Splits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-[#fafafa] border border-slate-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                      <Hammer className="w-4 h-4 text-[#2596be]" /> Material Cost Breakdown (62%)
                    </h3>
                    <p className="text-xl font-bold text-slate-900 font-sans mb-4">
                      ₹{results.materialCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between"><span>Cement & Sand:</span><span className="font-semibold">₹{(results.materials.cement + results.materials.sandAggregate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Steel Reinforcement:</span><span className="font-semibold">₹{results.materials.steel.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Tiles & Marble:</span><span className="font-semibold">₹{results.materials.tilesFlooring.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Plumbing & Electrical:</span><span className="font-semibold">₹{results.materials.plumbingElectrical.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#fafafa] border border-slate-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-[#2596be]" /> Labour & Execution (38%)
                    </h3>
                    <p className="text-xl font-bold text-slate-900 font-sans mb-4">
                      ₹{results.labourCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between"><span>Masonry & Civil Casting:</span><span className="font-semibold">₹{results.labours.masonryCivil.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Carpentry & Joinery:</span><span className="font-semibold">₹{results.labours.carpentryWoodwork.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Electrical & Plumbing:</span><span className="font-semibold">₹{results.labours.plumbingElectrical.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                      <div className="flex justify-between"><span>Painting & Finishing:</span><span className="font-semibold">₹{results.labours.painting.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-slate-500">Need a certified engineer to visit your plot and finalize the BOQ?</p>
                  <Link
                    to="/consultation"
                    className="px-6 py-3 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#2596be]/20 transition-all shrink-0"
                  >
                    Book Site Inspection
                  </Link>
                </div>

              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200/90 shadow-sm text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 text-[#2596be] flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#3b2314] font-sans mb-2">Ready to Estimate</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Input your built-up area and desired finishing tier on the left to generate an instant BOQ cost breakdown.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default CostCalculator;
