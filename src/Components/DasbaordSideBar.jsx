import React from "react";
import { NavLink, Outlet } from "react-router";
import { HandCoins, Home, User } from "lucide-react";

function DasbaordSideBar() {
  return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-gray-950 text-white">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">
        <NavLink to="/" className="font-bold text-white text-2xl">
                  Loan<span className="text-[#fb5350]">Link</span>
                </NavLink>
      </div>
    </nav>
    {/* Page content here */}
    <div className="p-4">
        <Outlet />
    </div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-gray-900 text-white is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <NavLink to="/">
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <Home className="my-1.5 inline-block size-4" />
            <span className="is-drawer-close:hidden">Home</span>
          </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-profile">
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
            {/* Home icon */}
            <User className="my-1.5 inline-block size-4" />
            <span className="is-drawer-close:hidden">My Profile</span>
          </button>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to="/dashboard/my-loan">
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Loan">
            {/* Settings icon */}
            <HandCoins className="my-1.5 inline-block size-4" />
            <span className="is-drawer-close:hidden">My Loan</span>
          </button>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</div>
  );
}

export default DasbaordSideBar;
