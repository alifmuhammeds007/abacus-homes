import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-xs text-slate-400 mb-8">Last Updated: July 4, 2026</p>

        <div className="prose dark:prose-invert text-xs leading-relaxed space-y-6 text-slate-600 dark:text-slate-400">
          <p>
            At Abacus Homes, accessible from abacushomes.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Abacus Homes and how we use it.
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-widest mt-6">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide voluntarily when submitting quote inquiries, careers apply forms, and consultation briefs. This includes name, phone coordinates, email id, site drawings, and built specifications.
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-widest mt-6">2. How We Use Your Information</h2>
          <p>
            We use the collected information to prepare accurate BOQ quotes, manage building permits approvals processes, provide weekly updates on site construction progress, and contact you regarding custom residential/commercial builds.
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-widest mt-6">3. Data Security</h2>
          <p>
            We deploy secure JWT credentials controls and HTTPS encryption protocols to safeguard documents like municipal clearance certificates, blueprint drawings, and payment invoice files.
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-widest mt-6">4. Contact Us</h2>
          <p>
            If you have questions about our privacy policies, please write to us at support@abacushomes.com.
          </p>
        </div>

        <Link to="/" className="inline-block mt-10 text-xs font-bold text-gold uppercase tracking-wider hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
