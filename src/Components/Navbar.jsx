import React, { useContext } from "react";
import { NavLink } from "react-router";

import { AuthContext } from "../Auth/AuthProvider";

function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="navbar bg-[#04050a] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2"
          >
            <li className="text-white font-semibold">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-white font-semibold">
              <NavLink to="/all-loans">All Loans</NavLink>
            </li>
            <li className="text-white font-semibold">
              <NavLink to="/about-us">About Us</NavLink>
            </li>
              <li className="text-white font-semibold">
         <NavLink to="/contact">Contact</NavLink>
          </li>
          </ul>
        </div>
        <NavLink to="/" className="font-bold text-white text-2xl">
          Loan<span className="text-[#fb5350]">Link</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li className="text-white font-semibold">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="text-white font-semibold">
          <NavLink to="/all-loans">All Loans</NavLink>
          </li>
          <li className="text-white font-semibold">
         <NavLink to="/about-us">About Us</NavLink>
          </li>
          <li className="text-white font-semibold">
         <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {loading ? (
  
          <div className="w-10 h-10 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
        ) : user ? (
    
         <NavLink to="/login">
            <button className="btn" onClick={handleLogout}>Logout</button>
          </NavLink>
        ) : (
       
    <div className="flex gap-4">
          <NavLink to="/login">
            <button className="btn">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="btn">Register</button>
          </NavLink>
    </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;