import React from 'react';

const processSteps = [
  {
    num: "01",
    label: "DISCOVER",
    title: "Site Diagnostics & Vision Brief",
    desc: "Comprehensive geotechnical soil testing, topography contour mapping, microclimate analysis, and family lifestyle brief."
  },
  {
    num: "02",
    label: "PLAN",
    title: "Structural & Regulatory Roadmap",
    desc: "Zoning calculations, municipality permit approvals, structural load simulations, and precise milestone cost budgeting."
  },
  {
    num: "03",
    label: "DESIGN",
    title: "3D BIM & Architectural Schematics",
    desc: "Full 3D digital twin modeling, photorealistic interior lighting renders, material moodboards, and structural engineering vetting."
  },
  {
    num: "04",
    label: "BUILD",
    title: "Precision Civil Execution",
    desc: "Foundation excavation, earthquake-grade RCC column casting, brick masonry, plumbing, electrical, and continuous quality audits."
  },
  {
    num: "05",
    label: "DELIVER",
    title: "Turnkey Key Handover",
    desc: "Snag-list zeroing, final MEP inspections, 10-year structural warranty certificate, and delivering keys to your forever home."
  }
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-28 bg-white text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            04 // METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#3b2314] tracking-tight">
            OUR 5-STAGE <span className="text-[#2596be] font-bold">EXECUTION PROCESS.</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            A disciplined, milestone-driven framework that guarantees architectural excellence, structural integrity, and transparent timelines.
          </p>
        </div>

        {/* Process Horizontal Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => (
            <div 
              key={step.num}
              className="bg-[#fafafa] p-6 rounded-2xl border border-slate-200/90 hover:border-[#2596be] hover:shadow-[0_10px_35px_rgba(37,150,190,0.12)] transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-3xl font-black text-[#3b2314]">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-[#2596be] border border-slate-200 shadow-2xs">
                    {step.label}
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold text-slate-900 mb-2 group-hover:text-[#2596be] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="w-full h-0.5 bg-slate-200 group-hover:bg-[#2596be] transition-colors mt-6" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
