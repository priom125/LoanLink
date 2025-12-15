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
import UpdateLoansByManager from "../Pages/UpdateLoansByManager";
import BorrowerProtectedRoutes from "./BorrowerProtectedRoutes";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import ManagerProtectedRoutes from "./ManagerProtectedRoutes";

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
         
            <UserProfile />
     
        ),
      },
      {
        path: "my-loan",
        element: <BorrowerProtectedRoutes>
          <MyLoanByUser />
        </BorrowerProtectedRoutes>,
      },
      // keep the old dashboard overview (optional)
      {
        path: "add-loan",
        element: <ManagerProtectedRoutes>
          <AddLoanByManager />
        </ManagerProtectedRoutes>,
      },
      {
        path: "manage-users",
        element: <AdminProtectedRoutes>
          <ManagerDashBoard />
        </AdminProtectedRoutes>,
      },
      {
        path: "loan-applications",
        element: <AdminProtectedRoutes>
          <AllLoanApplications />
        </AdminProtectedRoutes>,
      },
      {
        path: "loan-applications/update-loan-applications/:id",
        element: <AdminProtectedRoutes>
          <UpdateLoanApllicationsStatus />
        </AdminProtectedRoutes>,
      },
      {
        path: "all-loan",
        element: <AdminProtectedRoutes>
          <AllLoan />
        </AdminProtectedRoutes>,
      },
      {
        path: "all-loan/update-loan/:id",
        element: (
          <AdminProtectedRoutes>
            <UpdateLoansByAdmin />
          </AdminProtectedRoutes>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/loan/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "manage-loans",
        element:  <ManagerProtectedRoutes> <ManageLoans /></ManagerProtectedRoutes>,
      },
      {
        path: "manage-loans/update-user-role/:id",
        element: <ManagerProtectedRoutes>
          <UpdateLoansByManager />
        </ManagerProtectedRoutes>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/loan/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "manage-users/update-user-role/:id",
        element: <AdminProtectedRoutes>
          <UpdateUserRole />
        </AdminProtectedRoutes>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/user/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "pending-loans",
        element: <ManagerProtectedRoutes>
          <PendingLoan />
        </ManagerProtectedRoutes>,
      },
      {
        path: "approved-loans",
        element: <ManagerProtectedRoutes>
          <ApprovedLoans />
        </ManagerProtectedRoutes>,
      },
    ],
  },
]);

export default router;
