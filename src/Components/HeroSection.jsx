import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { ChevronDown, TrendingUp, Shield, Clock, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      title: "Streamline Your",
      highlight: "Microloan Management",
      description:
        "LoanLink is the all-in-one web system for microloan providers. Eliminate manual tracking and manage applications, approvals, EMI schedules, and repayments seamlessly.",
      cta: "Apply for Loan",
      ctaLink: "/apply-loan",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    },
    {
      title: "Fast & Secure",
      highlight: "Loan Processing",
      description:
        "Experience lightning-fast loan approvals with our automated system. Get instant decisions and transparent tracking throughout your loan journey.",
      cta: "View All Loans",
      ctaLink: "/all-loans",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      title: "Flexible Payment",
      highlight: "EMI Options",
      description:
        "Choose from multiple EMI plans tailored to your needs. Track payments, view schedules, and manage your loans with complete transparency and ease.",
      cta: "Learn More",
      ctaLink: "/about-us",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
    },
  ];

  const features = [
    { icon: <TrendingUp className="w-5 h-5" />, text: "Quick Approval" },
    { icon: <Shield className="w-5 h-5" />, text: "100% Secure" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Support" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative h-[70vh] min-h-[600px] max-h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div
              className={`space-y-6 transition-all duration-1000 transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  {slides[currentSlide].title}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient">
                    {slides[currentSlide].highlight}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg text-base-content/70 leading-relaxed max-w-xl">
                {slides[currentSlide].description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full shadow-sm border border-base-content/10 hover:border-primary/50 transition-colors"
                  >
                    <span className="text-primary">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <NavLink
                  to={slides[currentSlide].ctaLink}
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  {slides[currentSlide].cta}
                  <CheckCircle className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </NavLink>
                <NavLink
                  to="/contact"
                  className="btn btn-outline btn-lg hover:btn-accent transition-all duration-300"
                >
                  Contact Us
                </NavLink>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 pt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-primary"
                        : "w-1.5 bg-base-content/30 hover:bg-base-content/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Image/Visual */}
            <div
              className={`relative lg:h-[500px] h-[400px] transition-all duration-1000 delay-300 transform ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              {/* Image Container */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt="Hero visual"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x600/1a1a1a/ffffff?text=LoanLink";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>

                {/* Floating Stats Cards */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                  <div className="flex-1 bg-base-100/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-content/10 transform hover:scale-105 transition-transform">
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-xs text-base-content/70">Loans Processed</p>
                  </div>
                  <div className="flex-1 bg-base-100/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-base-content/10 transform hover:scale-105 transition-transform">
                    <p className="text-2xl font-bold text-accent">98%</p>
                    <p className="text-xs text-base-content/70">Satisfaction Rate</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 btn btn-ghost btn-circle animate-bounce hover:bg-base-200"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* Next Section Anchor */}
      <div id="next-section" className="h-0"></div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default HeroSection;