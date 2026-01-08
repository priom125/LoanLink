import React, { useState, useEffect, useRef } from 'react';
import { FileText, Search, CheckCircle, Clock, ArrowRight } from 'lucide-react';

function HowItsWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  const howItWorksSteps = [
    {
      step: 1,
      title: "Digital Application",
      description: "Clients submit their loan requests and necessary documentation entirely online through a secure, user-friendly form.",
      icon: <FileText className="w-8 h-8" />,
      color: "primary",
    },
    {
      step: 2,
      title: "Efficient Review & Verify",
      description: "Loan officers use the LoanLink dashboard to quickly verify applications, check compliance, and assess risk in a single view.",
      icon: <Search className="w-8 h-8" />,
      color: "secondary",
    },
    {
      step: 3,
      title: "Fast Approval & Disbursal",
      description: "Once approved, the system generates necessary documentation and allows for quick, secure disbursement of funds to the client.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "accent",
    },
    {
      step: 4,
      title: "Automated Management",
      description: "LoanLink automatically tracks EMI schedules, sends payment reminders, and records repayments, freeing up staff time.",
      icon: <Clock className="w-8 h-8" />,
      color: "primary",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            howItWorksSteps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        badge: "badge-primary",
        icon: "text-primary",
        border: "border-primary/20 hover:border-primary/40",
        glow: "hover:shadow-primary/20",
      },
      secondary: {
        badge: "badge-secondary",
        icon: "text-secondary",
        border: "border-secondary/20 hover:border-secondary/40",
        glow: "hover:shadow-secondary/20",
      },
      accent: {
        badge: "badge-accent",
        icon: "text-accent",
        border: "border-accent/20 hover:border-accent/40",
        glow: "hover:shadow-accent/20",
      },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl py-16 mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-block">
          <span className="badge badge-primary badge-lg font-semibold mb-4">
            Our Process
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">LoanLink</span> Works
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          A streamlined, four-step process designed to make lending simple, secure, and efficient
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
        {/* Connection Lines - Desktop Only */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-base-content/20 to-transparent"></div>

        {howItWorksSteps.map((step, index) => {
          const colors = getColorClasses(step.color);
          const isVisible = visibleSteps.includes(index);

          return (
            <div
              key={step.step}
              className={`relative transition-all duration-700 transform ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className={`card bg-base-100 border-2 ${colors.border} shadow-lg ${colors.glow} hover:shadow-2xl transition-all duration-300 h-full group hover:-translate-y-2`}>
                <div className="card-body p-6 flex flex-col items-center text-center">
                  {/* Step Number Badge */}
                  <div className="relative mb-6">
                    <div className={`badge ${colors.badge} badge-lg w-14 h-14 text-xl font-bold shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {step.step}
                    </div>
                    {/* Pulse Ring */}
                    <div className={`absolute inset-0 badge ${colors.badge} opacity-30 animate-ping`}></div>
                  </div>

                  {/* Icon */}
                  <div className={`${colors.icon} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-base-content/70 leading-relaxed flex-grow">
                    {step.description}
                  </p>

                  {/* Arrow Indicator - Not on last item */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="bg-base-100 rounded-full p-2 border-2 border-base-300 shadow-md">
                        <ArrowRight className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Arrow - Between Cards */}
              {index < howItWorksSteps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="bg-base-100 rounded-full p-2 border-2 border-base-300 shadow-md">
                    <ArrowRight className={`w-4 h-4 ${colors.icon} rotate-90`} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 space-y-4">
        <p className="text-base-content/70 text-lg">
          Ready to streamline your loan management?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn btn-outline btn-lg hover:btn-secondary transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItsWorksSection;