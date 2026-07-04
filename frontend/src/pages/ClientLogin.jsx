import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, User, Key, Info } from 'lucide-react';

const ClientLogin = () => {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      // Check if user is staff (admin)
      const token = localStorage.getItem('access_token');
      if (username === 'admin' || token === 'dummy_admin_token') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-premium relative overflow-hidden">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl"></div>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary dark:bg-white rounded-xl flex items-center justify-center font-serif text-white dark:text-primary text-2xl font-bold border border-gold mx-auto mb-4">
            A
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-primary dark:text-white">Abacus Client Portal</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Access your weekly construction tracker, invoices, and blueprints.</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-550 dark:text-red-400 rounded-lg text-xs flex items-start">
            <ShieldAlert className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Username / Client ID</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter client ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-xs pl-10 pr-4 py-2.5 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-10 pr-4 py-2.5 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold hover:bg-gold-dark text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center mt-6"
          >
            {loading ? 'Authenticating...' : 'Access Portal'}
          </button>
        </form>

        {/* Demo Credentials alert */}
        <div className="mt-8 p-4 bg-primary/5 dark:bg-white/5 border border-primary/10 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 space-y-2">
          <span className="font-bold text-primary dark:text-gold flex items-center">
            <Info className="w-3.5 h-3.5 mr-1" /> Seeded Demo Credentials
          </span>
          <p><strong>Client account:</strong> username: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">client</code>, password: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">client123</code></p>
          <p><strong>Admin account:</strong> username: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">admin</code>, password: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">admin123</code></p>
        </div>

      </div>
    </div>
  );
};

export default ClientLogin;
