import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { clientDashboardAPI } from '../services/api';
import { 
  Building, HardHat, FileText, Download, ShieldCheck, 
  Clock, DollarSign, Send, MessageSquare, User, AlertCircle
} from 'lucide-react';

const ClientDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  
  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I am Vivek, your Project Manager. Let me know if you have questions about the internal plastering work.", sender: 'pm' }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    clientDashboardAPI.getProjects().then(res => {
      setProjects(res.data);
      if (res.data.length > 0) {
        setActiveProject(res.data[0]);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token, navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), text: chatInput, sender: 'client' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let pmResponse = "Received. I will inspect the ground floor tiles layout today and upload the progress photos by Friday evening.";
      
      const lower = chatInput.toLowerCase();
      if (lower.includes('invoice') || lower.includes('pay') || lower.includes('billing')) {
        pmResponse = "For invoice approvals or payment details, please check the 'Billing Milestones' tab on your dashboard. You can download the PDFs directly.";
      } else if (lower.includes('drawing') || lower.includes('blueprint') || lower.includes('plan')) {
        pmResponse = "All final civil blueprints and municipal permission certificates are stored in your 'Engineering Documents' folder on this dashboard.";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: pmResponse, sender: 'pm' }]);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="pt-32 text-center text-primary dark:text-white min-h-screen">
        <p className="animate-pulse">Loading dashboard information...</p>
      </div>
    );
  }

  if (projects.length === 0 && !user?.projects?.length) {
    return (
      <div className="pt-32 text-center text-primary dark:text-white min-h-screen p-4">
        <AlertCircle className="w-12 h-12 text-gold mx-auto mb-4" />
        <h2 className="text-xl font-bold font-serif">No Active Project Linked</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Please contact Abacus admin at info@abacushomes.com to bind your client account to a project file.</p>
        <button onClick={logout} className="mt-6 px-4 py-2 border rounded font-bold text-xs uppercase tracking-wider">Logout</button>
      </div>
    );
  }

  // Fallback to dummy data if API returns empty but context user has projects
  const currentProject = activeProject || user.projects[0];

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Dashboard Sub-Header */}
      <div className="bg-primary dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-white border-b border-gold/20 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif">{currentProject.project_name}</h1>
          <p className="text-xs text-gold uppercase tracking-widest font-semibold mt-1">Location: {currentProject.location} • Active Client Portal</p>
        </div>
        <button 
          onClick={logout}
          className="mt-4 md:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/25 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Sign Out Portal
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Progress Bar & Weekly Photos */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Completion Progress Tracker */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider flex items-center">
                  <Building className="w-4 h-4 text-gold mr-1.5" /> Project Stage: {currentProject.status}
                </span>
                <span className="text-sm font-extrabold text-gold">{currentProject.progress_percent}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden border">
                <div 
                  className="bg-gold h-full rounded-full transition-all duration-1000"
                  style={{ width: `${currentProject.progress_percent}%` }}
                ></div>
              </div>
            </div>

            {/* Weekly Site Photo Logs */}
            <div>
              <h2 className="text-base font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-6 flex items-center">
                <HardHat className="w-5 h-5 text-gold mr-2" /> Weekly Site Photo Logs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentProject.updates.map(upd => (
                  <div key={upd.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                    <img 
                      src={upd.photo_url} 
                      alt={upd.title}
                      className="w-full h-48 object-cover border-b"
                    />
                    <div className="p-4 space-y-1">
                      <span className="text-[9px] text-slate-400 font-semibold">{upd.created_at || 'Date logged'}</span>
                      <h4 className="text-sm font-bold text-primary dark:text-white font-serif">{upd.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">{upd.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Features: Tabs for Receipts, Material Reports, Visit Schedules & Engineer Notes */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-premium">
              {/* Tab Navigation Headers */}
              <div className="flex border-b border-slate-150 dark:border-slate-800 pb-3 flex-wrap gap-2 text-xs font-bold uppercase tracking-wider mb-6">
                {[
                  { value: 'notes', label: 'Engineer Notes' },
                  { value: 'receipts', label: 'Verified Receipts' },
                  { value: 'materials', label: 'Material Reports' },
                  { value: 'schedule', label: 'Site Visits' }
                ].map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.value
                        ? 'bg-gold text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content renders */}
              <div className="text-xs leading-relaxed text-slate-650 dark:text-slate-350">
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {[
                      { date: "July 02, 2026", engineer: "Er. Rahul Nair (Site Engineer)", note: "Concrete slump test completed for the first floor roof slab. Verified alignment and curing covers." },
                      { date: "June 25, 2026", engineer: "Er. Vivek Sen (Project Manager)", note: "Electrical conduits mapping approved. Ground floor plumbing lines leakage test passed." }
                    ].map((n, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-1.5 font-bold">
                          <span className="text-slate-800 dark:text-slate-200">{n.engineer}</span>
                          <span className="text-[9px] text-slate-400">{n.date}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 italic">"{n.note}"</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'receipts' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-150 dark:border-slate-800 font-bold uppercase tracking-widest text-[9px] text-slate-400">
                          <th className="py-2.5">Transaction ID</th>
                          <th className="py-2.5">Date</th>
                          <th className="py-2.5">Milestone Description</th>
                          <th className="py-2.5 text-right">Amount Paid</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                        {[
                          { tx: "TXN87654321", date: "April 15, 2026", desc: "Initial Design & Booking Advance", amt: "Rs. 1,00,000" },
                          { tx: "TXN87659902", date: "May 20, 2026", desc: "Foundation & Plinth Concrete Work", amt: "Rs. 3,50,000" }
                        ].map((rec, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                            <td className="py-2.5 font-mono text-[10px]">{rec.tx}</td>
                            <td className="py-2.5 text-slate-500">{rec.date}</td>
                            <td className="py-2.5 font-bold text-primary dark:text-slate-200">{rec.desc}</td>
                            <td className="py-2.5 text-right font-bold text-green-600 dark:text-green-500">{rec.amt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-3">
                    {[
                      { doc: "UltraTech Cement M25 Grade Strength Report", date: "June 18, 2026", type: "Cube Compression Test" },
                      { doc: "Tata Steel TMT Fe 550 Grade Tensile Certification", date: "May 10, 2026", type: "Metallurgical Audit" }
                    ].map((rep, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border rounded-xl border-slate-150 dark:border-slate-800">
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">{rep.doc}</h4>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{rep.type} • {rep.date}</span>
                        </div>
                        <button onClick={() => alert(`Downloading Quality Report: ${rep.doc}`)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded hover:bg-gold hover:text-white transition-all">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    {[
                      { date: "July 12, 2026 (10:30 AM)", inspector: "Chief Architect (Site Visit Audit)", type: "Room Layout Dimension Verification" },
                      { date: "July 24, 2026 (02:00 PM)", inspector: "Structural Engineer (Lintel Concrete Check)", type: "Iron Reinforcement Rebar Bind check" }
                    ].map((sc, i) => (
                      <div key={i} className="flex items-start bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-150 dark:border-slate-800">
                        <div className="mr-4 text-center">
                          <span className="text-xs font-serif font-extrabold text-gold">STAGE</span>
                          <div className="text-lg font-bold text-primary dark:text-white mt-1">0{i+1}</div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">{sc.inspector}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{sc.type}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 bg-gold/10 text-gold rounded font-bold text-[9px]">{sc.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Billing, Docs & Chat */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Billing Milestones */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
              <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-4 flex items-center border-b pb-2">
                <DollarSign className="w-4.5 h-4.5 text-gold mr-1" /> Billing Milestones
              </h3>
              <div className="space-y-3.5">
                {currentProject.invoices.map(inv => (
                  <div key={inv.id} className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-slate-205">{inv.title}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Due: {inv.due_date} • <strong className="text-slate-500">Rs. {parseFloat(inv.amount).toLocaleString()}</strong></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        inv.status === 'PAID' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {inv.status}
                      </span>
                      <button 
                        onClick={() => alert(`Downloading Invoice PDF: ${inv.title}`)}
                        className="p-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-gold hover:text-white transition-colors"
                        aria-label="Download Invoice PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Documents */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium">
              <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-4 flex items-center border-b pb-2">
                <FileText className="w-4.5 h-4.5 text-gold mr-1" /> Drawings & Contracts
              </h3>
              <div className="space-y-3">
                {currentProject.documents.map(doc => (
                  <div key={doc.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-start">
                      <FileText className="w-4 h-4 text-gold mr-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-850 dark:text-slate-200 line-clamp-1">{doc.title}</h4>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold">{doc.doc_type}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading Document: ${doc.title}`)}
                      className="p-1 text-primary dark:text-gold hover:text-gold-dark"
                      aria-label="Download Document PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Client PM Chat Box */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col h-[320px]">
              <h3 className="text-sm font-serif font-bold text-primary dark:text-white uppercase tracking-widest mb-3 flex items-center border-b pb-2">
                <MessageSquare className="w-4.5 h-4.5 text-gold mr-1.5" /> Chat with Project Manager
              </h3>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-xl max-w-[80%] leading-relaxed ${
                      msg.sender === 'client' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-950 border text-slate-700 dark:text-slate-300 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message for PM..."
                  className="w-full text-xs px-2.5 py-1.5 border rounded-l-lg dark:bg-slate-950 dark:border-slate-800 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-white px-3 rounded-r-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ClientDashboard;
