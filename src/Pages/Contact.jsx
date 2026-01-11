import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock,
  Loader2,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "loanlink@gmail.com",
      href: "mailto:loanlink@gmail.com",
      color: "text-primary",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+880 1246-96565",
      href: "tel:+8801246965655",
      color: "text-accent",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      value: "123 Sabbir Lane, Suite 456, Masdair City, TS 78901",
      href: null,
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 py-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-base-content">
            Get in Touch
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            We'd love to hear from you. Fill out the form below, and we'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="alert alert-success shadow-lg">
            <CheckCircle className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Message sent successfully!</h3>
              <div className="text-sm">We'll get back to you within 24-48 hours.</div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-base-content">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input input-bordered w-full pl-10 ${
                        errors.name ? "input-error" : ""
                      }`}
                      placeholder="Your Name"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    </label>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input input-bordered w-full pl-10 ${
                        errors.email ? "input-error" : ""
                      }`}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    </label>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-control">
                  <label htmlFor="message" className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-base-content/50" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`textarea textarea-bordered w-full pl-10 resize-none ${
                        errors.message ? "textarea-error" : ""
                      }`}
                      placeholder="Your message..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-base-content">Contact Information</h2>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="card bg-base-200 shadow-sm border border-base-300">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-4">
                          <div className={`${info.color} flex-shrink-0 mt-1`}>{info.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-base-content/60 mb-1">
                              {info.label}
                            </p>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="font-semibold text-base-content hover:text-primary transition-colors break-words"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="font-semibold text-base-content break-words">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-xl">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-80">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Card */}
            <div className="card bg-base-200 shadow-md border border-base-300">
              <div className="card-body p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base-content mb-1">Quick Response</h4>
                    <p className="text-sm text-base-content/70">
                      We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
          <div className="card-body p-0">
            <div className="bg-base-200 h-64 sm:h-96 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <p className="text-base-content/70 font-medium">Map Integration</p>
                <p className="text-sm text-base-content/50">
                  Interactive map can be integrated here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;