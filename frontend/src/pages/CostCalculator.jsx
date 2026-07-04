import React, { useState } from 'react';
import { Calculator, Hammer, HardHat, ShieldCheck, HelpCircle } from 'lucide-react';

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

    // Floors adjustment (additional floors have slightly lower shell cost)
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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Construction Cost Calculator</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Get Instant Estimates for Material, Labour, and Project Timelines</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Inputs Section */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-6 flex items-center">
              <Calculator className="w-5 h-5 text-gold mr-2" /> Specification Form
            </h2>

            <form onSubmit={calculateCost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Plot Land Area (Sq.Ft.)</label>
                <input 
                  type="number" 
                  name="landArea"
                  value={inputs.landArea}
                  onChange={handleInputChange}
                  required
                  min="300"
                  className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:ring-1 focus:ring-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Built-Up Area (Sq.Ft.)</label>
                <input 
                  type="number" 
                  name="builtArea"
                  value={inputs.builtArea}
                  onChange={handleInputChange}
                  required
                  min="300"
                  className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:ring-1 focus:ring-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Floors</label>
                  <select 
                    name="floors"
                    value={inputs.floors}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    {[1, 2, 3, 4].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Beds</label>
                  <select 
                    name="bedrooms"
                    value={inputs.bedrooms}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Baths</label>
                  <select 
                    name="bathrooms"
                    value={inputs.bathrooms}
                    onChange={handleInputChange}
                    className="w-full text-xs px-2 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(ba => <option key={ba} value={ba}>{ba}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Finishing Type</label>
                <select 
                  name="constructionType"
                  value={inputs.constructionType}
                  onChange={handleInputChange}
                  className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                >
                  <option value="economy">Economy (Basic materials)</option>
                  <option value="standard">Standard (Quality concrete & tiles)</option>
                  <option value="premium">Premium (Top-tier fittings & elevation)</option>
                  <option value="luxury">Luxury (Italian marble, smart systems)</option>
                </select>
              </div>

              <div className="flex items-center pt-2">
                <input 
                  type="checkbox" 
                  name="premiumMaterials"
                  id="premiumMaterials"
                  checked={inputs.premiumMaterials}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-gold border-slate-300 rounded focus:ring-gold"
                />
                <label htmlFor="premiumMaterials" className="ml-2 text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider select-none">
                  Include premium structures?
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gold hover:bg-gold-dark text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center mt-6"
              >
                Calculate Cost Estimates
              </button>
            </form>
          </div>

          {/* Results Output Section */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                
                {/* Total Cost Alert */}
                <div className="bg-primary text-white p-6 rounded-2xl border border-gold/30 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Approximate Construction Budget</span>
                    <h3 className="text-3xl font-bold text-gold font-serif mt-1">Rs. {results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                    <p className="text-[10px] text-slate-300 mt-1">Calculated at Rs. {(results.totalCost / inputs.builtArea).toFixed(0)} / Sq.Ft. base rate</p>
                  </div>
                  <div className="flex space-x-6 text-center border-l border-white/10 pl-0 md:pl-6 pt-4 md:pt-0">
                    <div>
                      <span className="text-[9px] text-slate-350 uppercase font-bold tracking-widest">Labour split</span>
                      <p className="text-sm font-bold text-white mt-0.5">38%</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-355 uppercase font-bold tracking-widest">Materials split</span>
                      <p className="text-sm font-bold text-white mt-0.5">62%</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-350 uppercase font-bold tracking-widest">Duration</span>
                      <p className="text-sm font-bold text-gold mt-0.5">{results.timelineMonths} Mos</p>
                    </div>
                  </div>
                </div>

                {/* Estimate Tables grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Material estimate table */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
                    <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4 border-b pb-2 flex items-center">
                      <Hammer className="w-4 h-4 text-gold mr-1.5" /> Materials Breakdown (62%)
                    </h3>
                    <div className="space-y-3 text-xs">
                      {[
                        { label: 'Cement (approx. 16%)', val: results.materials.cement },
                        { label: 'Steel (FE 550 grade) (18%)', val: results.materials.steel },
                        { label: 'Bricks & Solid Blocks (11%)', val: results.materials.bricks },
                        { label: 'Sand & Aggregate (12%)', val: results.materials.sandAggregate },
                        { label: 'Flooring & Premium Tiles (14%)', val: results.materials.tilesFlooring },
                        { label: 'Plumbing & Electrical parts (12%)', val: results.materials.plumbingElectrical },
                        { label: 'Woodwork & Fittings (9%)', val: results.materials.fittingsWoodwork },
                        { label: 'Paint & Plaster Putty (8%)', val: results.materials.paintPutty }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b border-slate-50 dark:border-slate-850 pb-2">
                          <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Rs. {item.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Labour estimate table */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
                    <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4 border-b pb-2 flex items-center">
                      <HardHat className="w-4 h-4 text-gold mr-1.5" /> Labour Costs (38%)
                    </h3>
                    <div className="space-y-3 text-xs">
                      {[
                        { label: 'Civil work & Masonry (50%)', val: results.labours.masonryCivil },
                        { label: 'Electrical & Plumbing (15%)', val: results.labours.plumbingElectrical },
                        { label: 'Carpentry & Framing (15%)', val: results.labours.carpentryWoodwork },
                        { label: 'Flooring & Tile installation (10%)', val: results.labours.flooringTileInstall },
                        { label: 'Wall Painting & Putty (10%)', val: results.labours.painting }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b border-slate-50 dark:border-slate-850 pb-2">
                          <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Rs. {item.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="p-4 bg-yellow-50 dark:bg-slate-900 border-l-4 border-gold text-xs text-slate-600 dark:text-slate-400 rounded">
                  <span className="font-bold text-primary dark:text-gold flex items-center mb-1">
                    <ShieldCheck className="w-4 h-4 mr-1 shrink-0" /> Important Disclaimer
                  </span>
                  Calculations are estimates based on average civil construction market rates. Soil conditions, landscaping, elevation complexity, and local approvals costs can modify the budget. Request a custom quotation for an absolute contract price.
                </div>

              </div>
            ) : (
              <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <Calculator className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4 animate-bounce" />
                <h3 className="font-serif text-lg text-primary dark:text-white font-bold mb-2">Estimate Your Civil Costs</h3>
                <p className="text-xs max-w-sm">Complete the configuration specifications form on the left and submit to view cement, steel, masonry, carpentry, and electrical budgets.</p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default CostCalculator;
