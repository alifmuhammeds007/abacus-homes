import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-slate-50 dark:bg-slate-900 rounded-3xl border p-8 shadow-premium">
        <AlertTriangle className="w-16 h-16 text-gold mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold font-serif text-primary dark:text-white mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-850 dark:text-slate-205 mb-4">Structure Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          The page or blueprint you are searching for does not exist on our servers. It may have been relocated or deleted.
        </p>
        <Link 
          to="/" 
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white rounded font-bold text-xs uppercase tracking-wider transition-colors inline-block shadow"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
