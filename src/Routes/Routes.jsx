import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home';

import HomeLayouts from '../Layouts/HomeLayouts'
import AboutUs from '../Pages/AboutUs';
import AllLoans from '../Pages/AllLoans';
import Contact from '../Pages/Contact';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Components/Login';
import Register from '../Components/Register';
import ApplyLoanForm from '../Components/ApplyLoanForm';
import Loading from '../Pages/Loading';
import DashBoard from '../Pages/DashBoard';
import ViewDetailsPage from '../Pages/ViewDetailsPage';
import ProtectedRoute from './ProtectedRoutes';




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts/>,
   
    children: [
      {
        
        index: true,
        element: <Home />,
        loader: async () => {
          return fetch('http://localhost:3000/loan-category');
        },
        hydrateFallbackElement: <Loading/>,
   
 
      },
      {
       path: "/all-loans",
        element: <AllLoans />,
        loader: async () => {
          return fetch('http://localhost:3000/all-loan-category');
        },
        hydrateFallbackElement: <Loading/>,
 
      },
      {
        path: '/loan-details/:id',
        element:<ProtectedRoute><ViewDetailsPage/></ProtectedRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/loan/${params.id}`);
          return res.json();
        }
      },
      {
        path: "/about-us",
        element: <AboutUs />,
   
 
      },
      {
        path: "/contact",
        element: <Contact />,
   
 
      },
      {
        path: "/apply-loan",
        element: <ApplyLoanForm />,
   
 
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
   
 
      },

    ],
  },
  {
    path: "/",
    element: <AuthLayout/>,
   
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
]);

export default router;