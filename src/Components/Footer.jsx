import React from "react";

import { NavLink } from "react-router";
import { Facebook, Linkedin, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#04050a] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
       
          <div className="flex flex-col items-start">
      
            <h2 className="text-xl font-semibold text-white">LoanLink</h2>
            <p className="text-sm text-gray-400 mt-2">
             LoanLink is a web-based management system designed to streamline the entire microloan lifecycle for small financial organizations, NGOs, and microloan providers.
            </p>
          </div>

        
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
              <li><NavLink to="/all-loans" className="hover:text-white">All-Loans</NavLink></li>
              <li><NavLink to="/about-us" className="hover:text-white">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
            </ul>
          </div>

      
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: priom6046@gmail.com</li>
              <li>Phone: 01613347903</li>
              
            </ul>
          </div>

       
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <NavLink to="#" className="hover:text-blue-500"> <Facebook /></NavLink>
              <NavLink to="#" className="hover:text-sky-400"><X /></NavLink>
              <NavLink to="#" className="hover:text-pink-500"><Linkedin /></NavLink>
           
            </div>
          </div>
        </div>

    
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 LocalEats All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;