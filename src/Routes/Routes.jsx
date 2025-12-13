import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";

import HomeLayouts from "../Layouts/HomeLayouts";
import AboutUs from "../Pages/AboutUs";
import AllLoans from "../Pages/AllLoans";
import Contact from "../Pages/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Login";
import Register from "../Components/Register";
import ApplyLoanForm from "../Components/ApplyLoanForm";
import Loading from "../Pages/Loading";
import DashBoard from "../Pages/DashBoard";
import ViewDetailsPage from "../Pages/ViewDetailsPage";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardLauout from "../Layouts/DashboardLauout";
import DasbaordSideBar from "../Components/DasbaordSideBar";
import MyLoanByUser from "../Pages/MyLoanByUser";
import UserProfile from "../Pages/UserProfile";
import { hydrate } from "@tanstack/react-query";
import ManagerDashBoard from "../Pages/ManagerDashBoard";
import AddLoanByManager from "../Pages/AddLoanByManager";
import PendingLoan from "../Pages/PendingLoan";
import ApprovedLoans from "../Pages/ApprovedLoans";
import ManageLoans from "../Pages/ManageLoans";
import AllLoanApplications from "../Pages/AllLoanApplications";
import AllLoan from "../Pages/AllLoan";
import ApplyLoan from "../Pages/ApplyLoan";
import UpdateUserRole from "../Pages/UpdateUserRole";
import UpdateLoansByAdmin from "../Pages/UpdateLoansByAdmin";
import UpdateLoanApllicationsStatus from "../Pages/UpdateLoanApllicationsStatus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,

    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          return fetch("http://localhost:3000/loan-category");
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/all-loans",
        element: <AllLoans />,
        loader: async () => {
          return fetch("http://localhost:3000/all-loan-category");
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/loan-details/:id",
        element: (
          <ProtectedRoute>
            <ViewDetailsPage />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/loan/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/apply-loan",
        element: <ApplyLoan />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/apply-loan/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ApplyLoanForm />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/loan/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/apply-loan",
        element: (
          <ProtectedRoute>
            {" "}
            <ApplyLoanForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,

    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DasbaordSideBar />,
    children: [
      // Default route for /dashboard -> show My Profile
      {
        index: true,
        element: <UserProfile />,
      },
      // explicit child routes (relative paths)
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-loan",
        element: (
          <ProtectedRoute>
            <MyLoanByUser />
          </ProtectedRoute>
        ),
      },
      // keep the old dashboard overview (optional)
      {
        path: "add-loan",
        element: <AddLoanByManager />,
      },
      {
        path: "manage-users",
        element: <ManagerDashBoard />,
      },
      {
        path: "loan-applications",
        element: <AllLoanApplications />,
      },
            {
        path: "loan-applications/update-loan-applications/:id",
        element: <UpdateLoanApllicationsStatus />,
      },
      {
        path: "all-loan",
        element: <AllLoan />,
       
      },
      {
        path: "all-loan/update-loan/:id",
        element: <UpdateLoansByAdmin />,
       
      },
      {
        path: "manage-loans",
        element: <ManageLoans />,
      },
      {

        path: "manage-users/update-user-role/:id", 
        element: <UpdateUserRole />,
      },
      {
        path: "pending-loans",
        element: <PendingLoan />,
      },
      {
        path: "approved-loans",
        element: <ApprovedLoans />,
      },
    ],
  },
]);

export default router;
