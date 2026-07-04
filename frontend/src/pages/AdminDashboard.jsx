import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Users, FileText, CheckCircle, Clock, 
  Send, AlertCircle, RefreshCw, Layers
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leads');

  // Check access permissions
  if (!token) {
    setTimeout(() => navigate('/login'), 100);
    return null;
  }

  // Simulated Lead capture grids
  const [leads, setLeads] = useState([
    { id: 1, name: 'Sathish Kumar', phone: '+91 98987 65432', email: 'sathish@gmail.com', location: 'Ernakulam', type: 'Residential Construction', budget: 'Rs. 1.5 Crore - 3 Crore', area: '2400', date: '2026-07-02' },
    { id: 2, name: 'Elena Dsouza', phone: '+91 91234 56789', email: 'elena@office.com', location: 'Bangalore East', type: 'Interior Designing', budget: 'Under Rs. 50 Lakhs', area: '1200', date: '2026-07-01' }
  ]);

  const [applications, setApplications] = useState([
    { id: 1, name: 'Nikhil R.', email: 'nikhil.arch@gmail.com', phone: '+91 88877 66554', position: 'Junior Architect', date: '2026-07-03' },
    { id: 2, name: 'Aswathy Balan', email: 'aswathy.civil@outlook.com', phone: '+91 77766 55443', position: 'Civil Site Engineer', date: '2026-06-30' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, name: 'George K.', email: 'george@builders.com', phone: '+91 90000 12345', text: 'Interested in partnering with Abacus for Bangalore stone supply.', date: '2026-07-03' }
  ]);

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-white border-b border-gold/20 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif flex items-center">
            <BarChart className="w-7 h-7 text-gold mr-2" /> Abacus Corporate Admin
          </h1>
          <p className="text-xs text-gold uppercase tracking-widest font-semibold mt-1">Operational back-office console • Logged as {user?.first_name || 'Administrator'}</p>
        </div>
        <button 
          onClick={logout}
          className="mt-4 md:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/25 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Sign Out Admin
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left panel tabs */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                activeTab === 'leads'
                  ? 'bg-primary text-white border-gold shadow'
                  : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-350'
              }`}
            >
              <span>Consultation Quotes ({leads.length})</span>
              <FileText className="w-4.5 h-4.5 text-gold" />
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                activeTab === 'careers'
                  ? 'bg-primary text-white border-gold shadow'
                  : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-350'
              }`}
            >
              <span>Job Applications ({applications.length})</span>
              <Users className="w-4.5 h-4.5 text-gold" />
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                activeTab === 'messages'
                  ? 'bg-primary text-white border-gold shadow'
                  : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-350'
              }`}
            >
              <span>General Messages ({messages.length})</span>
              <AlertCircle className="w-4.5 h-4.5 text-gold" />
            </button>
          </div>

          {/* Right panel tables */}
          <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
            
            {activeTab === 'leads' && (
              <div>
                <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-6 border-b pb-2 flex items-center justify-between">
                  <span>Consultation leads & inquiries</span>
                  <RefreshCw className="w-4 h-4 text-gold cursor-pointer" />
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b text-slate-400 font-extrabold uppercase tracking-widest text-[10px]">
                        <th className="py-3 px-2">Lead details</th>
                        <th className="py-3 px-2">Project info</th>
                        <th className="py-3 px-2">Budget / Size</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-100/50">
                          <td className="py-4 px-2">
                            <p className="font-bold text-slate-800 dark:text-slate-200">{lead.name}</p>
                            <p className="text-[10px] text-slate-400">{lead.phone} • {lead.email}</p>
                          </td>
                          <td className="py-4 px-2">
                            <p className="font-semibold text-slate-700 dark:text-slate-300">{lead.type}</p>
                            <p className="text-[10px] text-slate-450">{lead.location}</p>
                          </td>
                          <td className="py-4 px-2">
                            <p className="font-bold text-slate-800 dark:text-gold">{lead.budget}</p>
                            <p className="text-[10px] text-slate-400">{lead.area} Sq.Ft.</p>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button 
                              onClick={() => alert(`Reviewing plan drawing files for ${lead.name}`)}
                              className="text-[10px] px-2.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded font-bold uppercase transition-colors"
                            >
                              Review Drawing
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'careers' && (
              <div>
                <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-6 border-b pb-2 flex items-center justify-between">
                  <span>Job Applications received</span>
                  <RefreshCw className="w-4 h-4 text-gold cursor-pointer" />
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b text-slate-400 font-extrabold uppercase tracking-widest text-[10px]">
                        <th className="py-3 px-2">Applicant</th>
                        <th className="py-3 px-2">Position applied</th>
                        <th className="py-3 px-2">Date received</th>
                        <th className="py-3 px-2 text-right">Resume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {applications.map(app => (
                        <tr key={app.id} className="hover:bg-slate-100/50">
                          <td className="py-4 px-2">
                            <p className="font-bold text-slate-800 dark:text-slate-200">{app.name}</p>
                            <p className="text-[10px] text-slate-400">{app.phone} • {app.email}</p>
                          </td>
                          <td className="py-4 px-2">
                            <span className="px-2 py-0.5 bg-gold/15 text-gold rounded font-bold uppercase text-[9px]">{app.position}</span>
                          </td>
                          <td className="py-4 px-2 text-slate-500">{app.date}</td>
                          <td className="py-4 px-2 text-right">
                            <button 
                              onClick={() => alert(`Downloading CV for applicant ${app.name}`)}
                              className="text-[10px] px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold uppercase transition-colors"
                            >
                              Download CV
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-6 border-b pb-2 flex items-center justify-between">
                  <span>General feedback messages</span>
                  <RefreshCw className="w-4 h-4 text-gold cursor-pointer" />
                </h3>
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className="bg-white dark:bg-slate-950 p-5 rounded-xl border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-850 dark:text-slate-200">{msg.name}</h4>
                          <p className="text-[10px] text-slate-400">{msg.email} • {msg.phone}</p>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{msg.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-50 dark:border-slate-850">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
