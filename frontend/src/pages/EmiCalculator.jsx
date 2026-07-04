import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const EmiCalculator = () => {
  const [cost, setCost] = useState(2500000);
  const [downPayment, setDownPayment] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);
  const [results, setResults] = useState({ emi: 0, interest: 0, total: 0 });

  const calculateEmi = () => {
    const P = cost - downPayment; // Principal loan amount
    if (P <= 0) {
      setResults({ emi: 0, interest: 0, total: 0 });
      return;
    }

    const r = rate / 12 / 100; // Monthly interest rate
    const n = tenure * 12; // Monthly tenure

    // Formula: EMI = [P x r x (1+r)^n] / [((1+r)^n) - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    setResults({
      emi,
      interest,
      total
    });
  };

  useEffect(() => {
    calculateEmi();
  }, [cost, downPayment, rate, tenure]);

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Home Loan EMI Calculator</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Estimate Your Monthly Payments, Interest Splits, and Loan Terms</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Inputs Section */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <h2 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-6 flex items-center">
              <Calculator className="w-5 h-5 text-gold mr-2" /> Loan Specifications
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Estimated Construction Cost (Rs.)</label>
                <input 
                  type="number" 
                  value={cost}
                  onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                  min="0"
                  className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Down Payment / Self Contribution (Rs.)</label>
                <input 
                  type="number" 
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                  min="0"
                  className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Loan Amount (Principal)</label>
                <input 
                  type="text" 
                  disabled
                  value={`Rs. ${(cost - downPayment > 0 ? cost - downPayment : 0).toLocaleString()}`}
                  className="w-full text-xs px-3 py-2 border bg-slate-100 dark:bg-slate-950 dark:border-slate-800 rounded-lg text-slate-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    min="1"
                    className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Tenure (Years)</label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
                  >
                    {[5, 10, 15, 20, 25, 30].map(yr => <option key={yr} value={yr}>{yr} Years</option>)}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Results Summary Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              
              {/* EMI Output Alert */}
              <div className="bg-primary text-white p-6 rounded-2xl border border-gold/30 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Monthly Loan EMI Payment</span>
                  <h3 className="text-3xl font-bold text-gold font-serif mt-1">Rs. {results.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  <p className="text-[10px] text-slate-350 mt-1">Based on {tenure} years repayment tenure at {rate}% annual interest rate</p>
                </div>
                <div className="flex space-x-6 text-center border-l border-white/10 pl-0 md:pl-6 pt-4 md:pt-0">
                  <div>
                    <span className="text-[9px] text-slate-350 uppercase font-bold tracking-widest">Loan amount</span>
                    <p className="text-sm font-bold text-white mt-0.5">Rs. {((cost - downPayment > 0) ? cost - downPayment : 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-350 uppercase font-bold tracking-widest">Total Interest</span>
                    <p className="text-sm font-bold text-gold mt-0.5">Rs. {results.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>

              {/* Splits Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Repayment details */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
                  <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4 border-b pb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 text-gold mr-1.5" /> Total Payment Analysis
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500 dark:text-slate-400">Principal Loan Amount</span>
                      <span className="font-bold text-slate-800 dark:text-slate-205">Rs. {((cost - downPayment > 0) ? cost - downPayment : 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500 dark:text-slate-400">Total Interest Payable</span>
                      <span className="font-bold text-slate-800 dark:text-slate-205">Rs. {results.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 text-primary dark:text-gold">
                      <span>Total Principal + Interest</span>
                      <span>Rs. {results.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-center">
                  <h4 className="text-sm font-serif font-bold text-primary dark:text-white mb-2">Flexible Finance Sourcing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    Abacus Homes partners with major public banks (SBI, HDFC, Canara Bank, Federal Bank) to procure home loan approvals. Our permit documentation satisfies structural checks and NOC parameters required by lenders.
                  </p>
                  <a href="tel:+919876543210" className="text-xs font-bold text-gold hover:underline">Speak to Finance Expert →</a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default EmiCalculator;
