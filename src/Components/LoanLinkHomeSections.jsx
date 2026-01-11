import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  BarChart, 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  TrendingUp,
  Award,
  Mail,
  Bell,
  Send,
  AlertTriangle,
  Loader2
} from 'lucide-react';

function LoanLinkHomeSections() {
  // Newsletter form state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Newsletter form handlers
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleNewsletterSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 1: Key Features
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Loan Processing",
      description: "Automated workflows reduce approval time from days to hours with intelligent risk assessment.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Compliant",
      description: "Bank-grade encryption and automated compliance checks ensure regulatory adherence.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboards provide instant insights into portfolio performance and risk metrics.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-User Management",
      description: "Role-based access control for admins, managers, and applicants with granular permissions.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  // Section 2: Statistics
  const statistics = [
    {
      icon: <DollarSign className="w-10 h-10" />,
      value: "$50M+",
      label: "Loans Processed",
      description: "Total value disbursed through our platform",
    },
    {
      icon: <Users className="w-10 h-10" />,
      value: "10,000+",
      label: "Active Borrowers",
      description: "Individuals and businesses served",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      value: "98.5%",
      label: "Approval Rate",
      description: "Applications processed successfully",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      value: "2 Hours",
      label: "Avg Processing Time",
      description: "From application to decision",
    },
  ];

  // Section 3: How It Works Process
  const processSteps = [
    {
      step: "01",
      icon: <FileText className="w-8 h-8" />,
      title: "Apply Online",
      description: "Submit your loan application digitally with required documents through our secure platform.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      step: "02",
      icon: <BarChart className="w-8 h-8" />,
      title: "Automated Review",
      description: "Our AI-powered system instantly evaluates your application and assesses creditworthiness.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      step: "03",
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Quick Approval",
      description: "Get approval within 2 hours with transparent communication throughout the process.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      step: "04",
      icon: <DollarSign className="w-8 h-8" />,
      title: "Fund Disbursement",
      description: "Receive funds directly to your account with flexible EMI repayment options.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  // Section 4: Benefits/Services
  const benefits = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Applications",
      description: "Fully online application process with document upload and e-signatures",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Risk Assessment",
      description: "AI-powered credit scoring and risk evaluation algorithms",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Flexible EMI Plans",
      description: "Multiple repayment options tailored to borrower needs",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Payment Tracking",
      description: "Automated reminders and real-time payment status updates",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Portfolio Management",
      description: "Comprehensive tools for monitoring and optimizing loan portfolios",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Compliance Automation",
      description: "Built-in regulatory compliance and reporting features",
    },
  ];

  return (
    <div className="space-y-16 py-16 px-4 sm:px-6 lg:px-8">
      {/* SECTION 1: KEY FEATURES */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Platform Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content mb-4">
            Everything You Need to Manage Microloans
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Powerful features designed specifically for microfinance institutions and NGOs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body p-6">
                <div className={`${feature.bgColor} p-3 rounded-lg inline-flex mb-4`}>
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">{feature.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: STATISTICS */}
      <section className="max-w-7xl mx-auto">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-2xl">
          <div className="card-body p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold mb-4">Our Impact in Numbers</h2>
              <p className="text-lg opacity-90">
                Trusted by organizations worldwide to deliver financial inclusion
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="card bg-white/10 backdrop-blur-sm shadow-lg hover:bg-white/20 transition-all duration-300"
                >
                  <div className="card-body p-6 text-center">
                    <div className="flex justify-center mb-3">{stat.icon}</div>
                    <p className="text-4xl font-extrabold mb-1">{stat.value}</p>
                    <p className="text-sm font-semibold mb-2">{stat.label}</p>
                    <p className="text-xs opacity-80">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-semibold text-success">Simple Process</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content mb-4">
            How LoanLink Works
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Get funded in 4 simple steps with our streamlined digital process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((process, index) => (
            <div key={index} className="relative">
              <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="card-body p-6">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg flex items-center justify-center font-bold text-lg">
                    {process.step}
                  </div>

                  <div className={`${process.bgColor} p-3 rounded-lg inline-flex mb-4`}>
                    <div className={process.color}>{process.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-base-content mb-2">
                    {process.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>

              {/* Arrow Connector - Desktop Only */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-base-100 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Arrow for Mobile */}
              {index < processSteps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Timeline Visual */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-success transform -translate-y-1/2"></div>
            <div className="relative grid grid-cols-4 gap-6">
              {processSteps.map((process, index) => (
                <div key={index} className="flex justify-center">
                  <div className={`w-4 h-4 rounded-full ${process.bgColor} border-4 border-base-100 shadow-lg`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES/BENEFITS & NEWSLETTER */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits List */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-base-content">
                    Comprehensive Services
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="card bg-base-200 shadow-sm border border-base-300 hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                            <div className="text-primary">{benefit.icon}</div>
                          </div>
                          <div>
                            <h3 className="font-bold text-base-content mb-1">
                              {benefit.title}
                            </h3>
                            <p className="text-sm text-base-content/70">{benefit.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-xl sticky top-24">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Stay Updated</h3>
                </div>

                <p className="mb-6 opacity-90">
                  Subscribe to our newsletter for the latest features, updates, and microfinance
                  insights.
                </p>

                {submitSuccess ? (
                  <div className="alert bg-success/20 border border-success/30 text-accent-content">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Successfully subscribed! Check your inbox.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="form-control">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" />
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Enter your email"
                          className={`input w-full pl-10 bg-white/20 border-white/30 placeholder:text-accent-content/60 text-accent-content ${
                            emailError ? 'border-error' : ''
                          }`}
                          disabled={isSubmitting}
                        />
                      </div>
                      {emailError && (
                        <label className="label">
                          <span className="label-text-alt flex items-center gap-1 text-error bg-error/20 px-2 py-1 rounded">
                            <AlertTriangle className="w-3 h-3" />
                            {emailError}
                          </span>
                        </label>
                      )}
                    </div>

                    <button
                      onClick={handleNewsletterSubmit}
                      className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4" />
                    <span>Weekly insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Product updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoanLinkHomeSections;