import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Sync with the theme managed by the Navbar
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.querySelector('html').getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };

    // Initial check
    checkTheme();

    // Observe changes to the html data-theme attribute
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.querySelector('html'), {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const faqData = [
    {
      q: "How long does the approval process take?",
      a: "Our digital process ensures approval within 48 hours for most standard applications, provided all documentation is complete. High-priority micro-business loans often see decisions in as little as 6 hours.",
      category: "Process"
    },
    {
      q: "What is the maximum repayment period?",
      a: "Repayment terms vary by loan type, generally ranging from 6 months up to 3 years (36 months). We offer flexible monthly or bi-weekly EMI options to match your cash flow.",
      category: "Terms"
    },
    {
      q: "Are there any hidden fees?",
      a: "No. LoanLink operates with complete transparency. All origination fees and interest rates are clearly detailed in your digital loan agreement prior to final electronic signature.",
      category: "Security"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full max-w-4xl mx-auto py-24 px-6 transition-colors duration-500 ${isDark ? 'selection:bg-indigo-500/30' : 'selection:bg-indigo-100'}`}>
      {/* Animated Header */}
      <div className="text-center mb-16 space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDark 
          ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
          : 'bg-indigo-50 border-indigo-100 text-indigo-600'
        }`}>
          <HelpCircle size={14} />
          Knowledge Base
        </div>
        <h2 className={`text-4xl md:text-5xl font-black tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Frequently Asked{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-flow">
            Questions
          </span>
        </h2>
        <p className={`max-w-xl mx-auto transition-colors duration-300 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Everything you need to know about our microloan system and secure management platform.
        </p>
      </div>

      {/* Accordion Group */}
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`group transition-all duration-300 rounded-[1.5rem] border ${
                isOpen 
                ? isDark 
                  ? 'bg-slate-900 border-indigo-500/50 shadow-xl shadow-indigo-500/5' 
                  : 'bg-white border-indigo-200 shadow-xl shadow-indigo-100'
                : isDark
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 hover:border-indigo-100'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <div className={`transition-colors duration-300 ${
                    isOpen ? 'text-indigo-600' : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <MessageSquare size={20} />
                  </div>
                  <span className={`text-lg font-bold transition-colors duration-300 ${
                    isOpen 
                      ? isDark ? 'text-white' : 'text-slate-900' 
                      : isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {item.q}
                  </span>
                </div>
                <div className={`p-1 rounded-full transition-all duration-300 ${
                  isOpen 
                    ? 'bg-indigo-600 text-white rotate-180' 
                    : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-500'
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 ml-14">
                    <p className={`leading-relaxed text-base transition-colors duration-300 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {item.a}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                       <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded transition-colors duration-300 ${
                         isDark ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                       }`}>
                         {item.category}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;