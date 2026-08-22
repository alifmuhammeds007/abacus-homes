import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, User, Key, Info, Lock } from 'lucide-react';
import Logo from '../components/ui/Logo';

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
      const token = localStorage.getItem('access_token');
      if (username === 'admin' || token === 'dummy_admin_token') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="pt-24 bg-[#fafafa] min-h-screen flex items-center justify-center p-4 selection:bg-[#2596be] selection:text-white font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
        
        {/* Top subtle glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2596be]/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-5">
            <Logo variant="dark" height="h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#3b2314] font-sans">Client Project Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Access your weekly construction tracker, milestone invoices, and 3D drawings.</p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Username / Client ID</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. client101 or admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-xs pl-10 pr-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-10 pr-4 py-3 bg-[#fafafa] border border-slate-200 rounded-xl focus:border-[#2596be] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2596be] hover:bg-[#1d7fa2] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md shadow-[#2596be]/20 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Authenticating...' : 'Access Portal'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            For access credentials, contact your dedicated Abacus Project Manager.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ClientLogin;
