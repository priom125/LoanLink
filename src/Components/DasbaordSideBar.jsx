import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import {
  BookCopy,
  HandCoins,
  Handshake,
  Home,
  MonitorCog,
  StickyNote,
  User,
  UserCog,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";
import useAxios from "../hooks/useAxios";
import Loading from "../Pages/Loading";

function DasbaordSideBar() {
  const { user } = useContext(AuthContext);

  const axiosInstance = useAxios();

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-data?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const Role = userData?.[0]?.role;

  const defaultNavItems = (
    <>
      <li>
        <NavLink to="/">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Homepage"
          >
            <Home className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Home</span>
          </button>
        </NavLink>
      </li>
    </>
  );

  const borrowerNavItems = (
    <>
      <li>
        <NavLink to="/dashboard/my-profile">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="My Profile"
          >
            <User className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">My Profile</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-loan">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="My Loan"
          >
            <HandCoins className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">My Loan</span>
          </button>
        </NavLink>
      </li>
    </>
  );
  const adminNavItems = (
    <>
      <li>
        <NavLink to="/dashboard/manage-users">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Manage Users"
          >
            {/* Added mr-2 for spacing */}
            <UserCog className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Manage Users</span>
          </button>
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/all-loan">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="All Loans"
          >
            {/* Added mr-2 for spacing */}
            <HandCoins className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">All Loans</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/loan-applications">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Loan Applications"
          >
            <BookCopy className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Loan Applications</span>
          </button>
        </NavLink>
      </li>
    </>
  );

  const managerNavItems = (
    <>
      <li>
        <NavLink to="/dashboard/add-loan">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Add Loan"
          >
            <StickyNote className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Add Loan</span>
          </button>
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/manage-loans">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Manage Loans"
          >
            {/* Added mr-2 for spacing */}
            <MonitorCog className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Manage Users</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pending-loans">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Pending Loans"
          >
            {/* Added mr-2 for spacing */}
            <HandCoins className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Pending Loans</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approved-loans">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Approved Loans"
          >
            {/* Added mr-2 for spacing */}
            <Handshake className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">Approved Loans</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-profile">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="My Profile"
          >
            <User className="my-1.5 inline-block size-4 mr-2" />
            <span className="is-drawer-close:hidden">My Profile</span>
          </button>
        </NavLink>
      </li>
    </>
  );

  let roleSpecificItems = null;

  if (Role === "borrower") {
    roleSpecificItems = borrowerNavItems;
  } else if (Role === "manager") {
    roleSpecificItems = managerNavItems;
  } else if (Role === "admin") {
    roleSpecificItems = adminNavItems;
  }

  // (Loading State Block - Omitted for brevity, assumed to be the same)

  if (isLoading || !user) {
    return (
      <div className="drawer lg:drawer-open">
        <div className="drawer-content p-4">
          <Loading />
          <Outlet />
        </div>
        {/* Minimal sidebar for loading state */}
        <div className="drawer-side">
          <div className="flex min-h-full flex-col items-start bg-gray-900 text-white w-64">
            <ul className="menu w-full">
              <li>
                <span className="loading loading-dots loading-lg"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-gray-950 text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
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
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-gray-900 text-white is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {defaultNavItems}
            {roleSpecificItems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DasbaordSideBar;
