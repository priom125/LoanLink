import React from 'react';
import { Users, TrendingUp, ShieldCheck, Star, ArrowUpRight } from 'lucide-react';

const TrustIndicatorSection = () => {
  const stats = [
    { 
      value: "15,000+", 
      label: "Clients Served", 
      icon: <Users className="w-5 h-5" />, 
      color: "from-blue-500 to-cyan-400",
      description: "Trusted by entrepreneurs nationwide"
    },
    { 
      value: "$12.5M+", 
      label: "Capital Disbursed", 
      icon: <TrendingUp className="w-5 h-5" />, 
      color: "from-emerald-500 to-teal-400",
      description: "Fueling business growth daily"
    },
    { 
      value: "98%", 
      label: "Approval Rate", 
      icon: <ShieldCheck className="w-5 h-5" />, 
      color: "from-violet-600 to-purple-400",
      description: "Quick and accessible funding"
    },
    { 
      value: "4.9/5", 
      label: "Customer Rating", 
      icon: <Star className="w-5 h-5" />, 
      color: "from-amber-500 to-orange-400",
      description: "Highest rated in the industry"
    },
  ];

  // Helper to ensure colors match DaisyUI/Tailwind theme without "group-data"
  // We use standard text-base-content which DaisyUI updates automatically
  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 px-6 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 blur-[120px] rounded-full" />

      {/* Header Content */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tight leading-tight mb-6 transition-colors duration-300">
          LoanLink: Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent">
            Funding Solution
          </span>{' '}
          Today
        </h2>
        <p className="text-base-content/70 text-lg md:text-xl max-w-2xl mx-auto font-medium transition-colors duration-300">
          Explore our range of microloan products tailored specifically for your organizational needs and long-term success.
        </p>
      </div>

      {/* Stats Grid Container */}
      <div className="relative group/container">
        {/* Border Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-75 group-hover/container:opacity-100 transition duration-1000 group-hover/container:duration-200"></div>
        
        {/* Main Card - Using DaisyUI 'bg-base-100' which handles theme changes automatically */}
        <div className="relative bg-base-100 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 md:p-16 transition-all duration-300 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-base-300">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 group/stat pt-8 sm:pt-0"
              >
                {/* Icon Circle */}
                <div className={`mb-6 p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-primary/20 transition-transform duration-500 group-hover/stat:scale-110 group-hover/stat:rotate-3`}>
                  {stat.icon}
                </div>
                
                {/* Stat Value */}
                <div className="flex items-baseline gap-1">
                  <p className="text-4xl md:text-5xl font-black text-base-content tracking-tighter mb-2 tabular-nums transition-colors duration-300">
                    {stat.value}
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-success opacity-0 group-hover/stat:opacity-100 transition-all -translate-y-1" />
                </div>
                
                {/* Stat Label */}
                <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3 transition-colors duration-300">
                  {stat.label}
                </p>
                
                {/* Stat Description */}
                <p className="text-xs text-base-content/60 font-medium leading-relaxed max-w-[180px] transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-[10px] text-base-content font-black tracking-[0.3em] uppercase transition-colors duration-300">Verified Partner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-info"></div>
          <span className="text-[10px] text-base-content font-black tracking-[0.3em] uppercase transition-colors duration-300">AES-256 Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warning"></div>
          <span className="text-[10px] text-base-content font-black tracking-[0.3em] uppercase transition-colors duration-300">FCA Regulated</span>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorSection;