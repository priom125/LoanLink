import React, { useCallback, useState } from 'react';
import { Users, TrendingUp, ShieldCheck, Star, ArrowUpRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

/**
 * CustomerFeedbackCarousel Component
 * Displays partner testimonials in a responsive, glassmorphic carousel.
 * Refactored to use semantic theme colors and Lucide icons.
 */
const CustomerFeedbackCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mockTestimonials = [
    {
      id: 1,
      quote: "LoanLink cut our application processing time by 60%. The centralized dashboard is a game-changer for our small team. Highly recommended for any microfinance operation.",
      name: "Aisha R.",
      title: "CEO, Community Development Fund",
    },
    {
      id: 2,
      quote: "Before LoanLink, managing EMI payments was a nightmare of spreadsheets. Now, everything is automated and transparent. It allowed us to focus more on outreach.",
      name: "Ben T.",
      title: "Operations Manager, Global Microloan Initiative",
    },
    {
      id: 3,
      quote: "The verification flow is so smooth. The compliance checks saved us immense time and reduced errors compared to our previous paper-based system. A huge leap forward.",
      name: "Dr. Chen L.",
      title: "Director, Educational Finance NGO",
    },
  ];

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? mockTestimonials.length - 1 : prev - 1));
  }, [mockTestimonials.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === mockTestimonials.length - 1 ? 0 : prev + 1));
  }, [mockTestimonials.length]);

  const current = mockTestimonials[activeIndex];

  return (
    <div className="mt-32 w-full max-w-4xl mx-auto px-4 relative group/carousel">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
          What Our <span className="text-primary">Partners</span> Say
        </h2>
      </div>

      <div className="relative bg-base-100/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full -mr-24 -mt-24 pointer-events-none" />
        
        <div key={current.id} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <Quote className="h-10 w-10 text-primary mx-auto mb-8 opacity-40" />

          <p className="text-xl md:text-2xl italic text-base-content leading-relaxed mb-10 font-medium">
            "{current.quote}"
          </p>
          
          <div className="pt-8 border-t border-base-300/50 inline-block px-10">
            <p className="text-lg font-bold text-base-content">
              {current.name}
            </p>
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mt-1">
              {current.title}
            </p>
          </div>
        </div>

        {/* Navigation - Floating Arrows for Desktop */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={goToPrev} 
            className="p-3 rounded-full bg-base-200 text-base-content hover:bg-primary hover:text-white transition-all duration-200 pointer-events-auto shadow-lg sm:-translate-x-6 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={goToNext} 
            className="p-3 rounded-full bg-base-200 text-base-content hover:bg-primary hover:text-white transition-all duration-200 pointer-events-auto shadow-lg sm:translate-x-6 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex sm:hidden justify-center gap-6 mt-10">
            <button onClick={goToPrev} className="btn btn-circle btn-sm btn-ghost border-base-300">
                <ChevronLeft className="h-4 w-4"/>
            </button>
            <button onClick={goToNext} className="btn btn-circle btn-sm btn-ghost border-base-300">
                <ChevronRight className="h-4 w-4"/>
            </button>
        </div>

        {/* Dots Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-12">
          {mockTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex ? 'bg-primary w-10' : 'bg-base-300 w-2 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CustomerFeedbackCarousel;