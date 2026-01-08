import React from "react";
import { NavLink } from "react-router";
import { Facebook, Linkedin, X, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/all-loans", label: "All Loans" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: <Facebook className="w-5 h-5" />,
      hoverColor: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: <X className="w-5 h-5" />,
      hoverColor: "hover:text-sky-400",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: "hover:text-blue-600",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: "priom6046@gmail.com",
      href: "mailto:priom6046@gmail.com",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Phone",
      value: "+880 1613-347903",
      href: "tel:+8801613347903",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
    },
  ];

  return (
    <footer className="bg-base-300 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* COMPANY INFO */}
          <div className="space-y-4">
            <NavLink to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                Loan<span className="text-accent">Link</span>
              </h2>
            </NavLink>
            <p className="text-sm text-base-content/70 leading-relaxed">
              A comprehensive web-based management system designed to streamline
              the entire microloan lifecycle for small financial organizations,
              NGOs, and microloan providers.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `inline-block text-sm transition-colors ${
                        isActive
                          ? "text-accent font-medium"
                          : "text-base-content/70 hover:text-accent hover:translate-x-1 transform transition-transform"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-base-content/70 hover:text-accent transition-colors block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-base-content/70 block">
                        {item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">
              Follow Us
            </h3>
            <p className="text-sm text-base-content/70">
              Stay connected with us on social media for updates and news.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-circle btn-sm bg-base-100 border-base-content/20 hover:border-transparent ${social.hoverColor} transition-all duration-300 hover:scale-110`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-base-content/10 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-content/60 text-center sm:text-left">
              © {currentYear} LoanLink. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <NavLink
                to="/privacy-policy"
                className="text-base-content/60 hover:text-accent transition-colors"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms-of-service"
                className="text-base-content/60 hover:text-accent transition-colors"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;