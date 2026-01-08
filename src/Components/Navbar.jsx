import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const { data: userData = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-data?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const Role = Array.isArray(userData) ? userData[0]?.role : userData?.role;
  let dashboardPath = "/dashboard";
  if (Role === "manager") dashboardPath = "/dashboard/manage-loans";
  else if (Role === "admin") dashboardPath = "/dashboard/manage-users";

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsProfileOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderAvatar = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-primary"
        />
      );
    }
    const initial = (user?.displayName || user?.email || "U")
      .charAt(0)
      .toUpperCase();
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-semibold text-lg shadow-md">
        {initial}
      </div>
    );
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-content font-semibold shadow-sm"
        : "hover:bg-base-200 font-medium"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <NavLink 
              to="/" 
              className="font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
            >
              Loan<span className="text-accent">Link</span>
            </NavLink>

            {/* DESKTOP NAV LINKS */}
            <ul className="hidden lg:flex items-center gap-2">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-loans" className={navLinkClass}>
                  All Loans
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink to="/about-us" className={navLinkClass}>
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={navLinkClass}>
                      Contact
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink to={dashboardPath} className={navLinkClass}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="dashboard/my-loans" className={navLinkClass}>
                      My Loans
                    </NavLink>
                  </li>
                       <li>
                    <NavLink to="/contact" className={navLinkClass}>
                      Contact
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
                aria-label="Toggle theme"
              />
              {/* Sun icon */}
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* Moon icon */}
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z" />
              </svg>
            </label>

            {/* LOADING STATE */}
            {loading || userDataLoading ? (
              <div className="w-10 h-10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              /* LOGGED IN STATE - Profile Dropdown */
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors"
                  aria-label="User menu"
                  aria-expanded={isProfileOpen}
                >
                  {renderAvatar()}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg border border-base-300 py-2 z-20">
                      <div className="px-4 py-3 border-b border-base-300">
                        <p className="font-semibold text-sm truncate">
                          {userData?.[0]?.name || "User"}
                        </p>
                        <p className="text-xs text-base-content/70 truncate">
                          {user?.email}
                        </p>
                        {Role && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                            {Role}
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        <NavLink
                          to="dashboard/my-profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile
                        </NavLink>

                      </div>
                      <div className="border-t border-base-300 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* LOGGED OUT STATE */
              <div className="hidden lg:flex items-center gap-2">
                <NavLink to="/login" className="btn btn-sm btn-primary">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-sm btn-outline">
                  Register
                </NavLink>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden btn btn-ghost btn-square btn-sm"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-base-300 py-4 space-y-2">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/all-loans"
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              All Loans
            </NavLink>
            {!user && (
              <>
                <NavLink
                  to="/about-us"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink
                  to={dashboardPath}
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="dashboard/my-loans"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  My Loans
                </NavLink>
                <NavLink
                  to="/profile"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  Settings
                </NavLink>
              </>
            )}
            
            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="flex gap-2 pt-2">
                <NavLink
                  to="/login"
                  className="btn btn-sm btn-primary flex-1"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-sm btn-outline flex-1"
                  onClick={closeMobileMenu}
                >
                  Register
                </NavLink>
              </div>
            )}
            
            {/* Mobile User Info & Logout */}
            {user && (
              <div className="pt-2 border-t border-base-300 mt-2">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg mb-2">
                  {renderAvatar()}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-base-content/70 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="btn btn-sm btn-error btn-outline w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;