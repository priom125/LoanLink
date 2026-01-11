import React from "react";
import {
  Target,
  Heart,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Award,
  Shield,
  CheckCircle,
  DollarSign,
  BarChart,
  Sparkles,
} from "lucide-react";

function AboutUs() {
  const coreValues = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description:
        "We operate with complete transparency, ensuring trust in every transaction.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Efficiency",
      description:
        "Our digital-first approach ensures quick turnaround times for vital funding.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Impact",
      description:
        "Everything we build is designed to maximize the positive social and economic impact for our clients' beneficiaries.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const achievements = [
    {
      icon: <Users className="w-10 h-10" />,
      value: "500+",
      label: "Partner Organizations",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      value: "3",
      label: "Continents Served",
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      value: "$12M+",
      label: "Portfolio Managed",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      value: "99.8%",
      label: "Success Rate",
    },
  ];

  const features = [
    {
      icon: <BarChart className="w-5 h-5" />,
      text: "Real-time Portfolio Analytics",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Automated Compliance Checks",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Fast Processing Times",
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Industry-Leading Security",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Since 2021</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-base-content">
            Our Mission: Empowering Global{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Microfinance
            </span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Digitizing and simplifying the microloan ecosystem for organizations serving
            underserved communities worldwide
          </p>
        </div>

        {/* Vision Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-base-content">The LoanLink Vision</h2>
            </div>
            <p className="text-lg text-base-content/80 leading-relaxed">
              LoanLink was founded in 2021 with a singular goal: to digitize and simplify the
              microloan ecosystem for non-governmental organizations and small financial
              institutions operating in underserved communities. We believe that technology should
              be an accelerator for social good, not a barrier. Our platform eliminates tedious
              paperwork, speeds up risk assessment, and ensures transparent, equitable fund
              distribution.
            </p>
          </div>
        </div>

        {/* Achievements Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body p-6 text-center">
                <div className="flex justify-center mb-3">{achievement.icon}</div>
                <p className="text-3xl font-extrabold">{achievement.value}</p>
                <p className="text-sm opacity-80">{achievement.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent/10 p-3 rounded-full">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-base-content">Our Core Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="card bg-base-200 shadow-md border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="card-body p-6">
                    <div className={`${value.bgColor} p-3 rounded-lg inline-flex mb-4`}>
                      <div className={value.color}>{value.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-2">{value.title}</h3>
                    <p className="text-base-content/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary/10 p-3 rounded-full">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold text-base-content">Our History of Growth</h2>
            </div>

            <p className="text-lg text-base-content/80 leading-relaxed mb-6">
              Starting with a pilot program in Southeast Asia, LoanLink quickly scaled its
              operations based on the immediate need for reliable, digital microfinance management
              tools. Today, we partner with institutions across three continents, helping them
              manage portfolios totaling over $12 million. We continue to innovate, incorporating
              features like automated compliance checks and real-time portfolio analytics to stay
              ahead of the curve.
            </p>

            {/* Timeline Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="text-primary font-bold text-2xl mb-1">2021</div>
                  <p className="text-sm text-base-content/70">Founded in Southeast Asia</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="text-accent font-bold text-2xl mb-1">2022</div>
                  <p className="text-sm text-base-content/70">Expanded to 3 continents</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="text-secondary font-bold text-2xl mb-1">2023</div>
                  <p className="text-sm text-base-content/70">Reached $12M+ portfolio</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="text-success font-bold text-2xl mb-1">2024</div>
                  <p className="text-sm text-base-content/70">500+ partner organizations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-xl">
          <div className="card-body p-6 sm:p-10">
            <h3 className="text-2xl font-bold mb-6">Why Organizations Choose LoanLink</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
          <div className="card-body p-8 text-center">
            <h3 className="text-2xl font-bold text-base-content mb-2">
              Join Our Growing Community
            </h3>
            <p className="text-base-content/70 mb-6">
              Partner with us to transform microfinance in your region
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Users className="w-5 h-5" />
                Become a Partner
              </button>
              <button className="btn btn-outline btn-lg hover:btn-accent transition-all duration-300">
                <Globe className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;