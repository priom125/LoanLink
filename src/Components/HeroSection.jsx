import React from "react";
import { NavLink } from "react-router";
import hero from "../assets/hero.png";

const HeroSection = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-8 mb-20">
      {/* Hero Banner Section */}
      <section className="max-w-full">
        <div className=" shadow-2xl shadow-black/50 rounded-3xl overflow-hidden transition-all duration-500 transform hover:shadow-3xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-0 items-stretch">
            {/* Descriptive Text and CTA - Dark Panel */}
            <div className="p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center bg-gray-900">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight mb-6">
                Streamline Your{" "}
                <span className="text-green-400">Microloan Management</span>
              </h1>

              <p className="mt-4 text-xl text-gray-300 leading-relaxed">
                **LoanLink** is the all-in-one web system for microloan
                providers. Eliminate manual tracking and manage applications,
                approvals, EMI schedules, and repayments seamlessly in one
                powerful platform.
              </p>

              <p className="mt-6 text-xl font-bold text-blue-400">
                Ready to revolutionize your lending process?
              </p>

              {/* Call-to-Action Button */}
              <div className="mt-10 ">
                <NavLink to="/apply-loan">
                  <button className="w-full sm:w-80 inline-flex items-center cursor-pointer justify-center px-12 py-5 border-4 border-transparent text-xl font-bold rounded-full shadow-2xl text-white bg-green-500 hover:bg-green-600 transition duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-8 focus:ring-green-400 active:bg-green-700">
                    Apply for Loan
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="relative h-96 sm:h-[600px] lg:h-auto w-full min-h-[500px]">
              <img
                src={hero}
                className="absolute inset-0 w-full h-full object-cover lg:rounded-r-3xl lg:rounded-bl-none rounded-b-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
