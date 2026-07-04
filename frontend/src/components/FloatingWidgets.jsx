import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWidgets = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to Abacus Homes. How can I help you build your dream home today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Thank you for contacting Abacus Homes. Our site engineer will reach out to you shortly. You can also dial us directly at +91 98765 43210 for immediate support.";
      
      const lower = text.toLowerCase();
      if (lower.includes('cost') || lower.includes('calculate') || lower.includes('price')) {
        botResponse = "You can use our interactive Cost Calculator page to estimate prices! Just navigate to the Calculator page in the main menu or click the Free Consultation link.";
      } else if (lower.includes('project') || lower.includes('completed')) {
        botResponse = "We have completed luxury villas, office structures, and landscapes. Check out our 'Projects' and 'Gallery' pages for photos, budgets, and before/after comparisons.";
      } else if (lower.includes('approve') || lower.includes('permit')) {
        botResponse = "Yes! We handle municipal permits, panchayat certificates, and documentation end-to-end so you don't have to face any legal hurdles.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 items-end">
        {/* Scroll To Top */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="p-3 bg-slate-800 text-white rounded-full hover:bg-gold hover:-translate-y-1 transition-all shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Call Now Widget */}
        <a
          href="tel:+919876543210"
          className="p-3.5 bg-primary text-white rounded-full hover:bg-primary-dark hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center border border-gold"
          aria-label="Call Abacus Homes"
        >
          <Phone className="w-5 h-5 text-gold" />
        </a>

        {/* WhatsApp Chat widget trigger */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-3.5 bg-green-600 text-white rounded-full hover:bg-green-700 hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center relative"
          aria-label="Toggle Live Chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
        </button>
      </div>

      {/* Live Chat Simulator Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-premium-hover border border-slate-100 dark:border-slate-800 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary dark:bg-slate-950 p-4 text-white flex justify-between items-center border-b border-gold/30">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-gold">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wide">Abacus Concierge</h4>
                  <p className="text-[10px] text-green-400 font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-ping"></span> Online Support
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-800/40">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap gap-1.5">
              <button 
                onClick={() => handleSendMessage("Calculate construction cost")}
                className="text-[10px] bg-white dark:bg-slate-900 border hover:bg-slate-50 dark:hover:bg-slate-800 text-primary dark:text-gold px-2.5 py-1 rounded-full font-bold transition-colors"
              >
                Estimate Costs
              </button>
              <button 
                onClick={() => handleSendMessage("Do you do municipal approvals?")}
                className="text-[10px] bg-white dark:bg-slate-900 border hover:bg-slate-50 dark:hover:bg-slate-800 text-primary dark:text-gold px-2.5 py-1 rounded-full font-bold transition-colors"
              >
                Building Permits
              </button>
            </div>

            {/* Chat Footer Input */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex bg-white dark:bg-slate-900">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button
                onClick={() => handleSendMessage()}
                className="ml-2 px-3 bg-gold hover:bg-gold-dark text-white rounded-lg transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWidgets;
