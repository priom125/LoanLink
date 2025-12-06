import React from 'react'
import { Outlet, useNavigation } from 'react-router';

import { ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Loading from '../Pages/Loading';

function HomeLayouts() {
     const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1  mx-auto">{isLoading ? <Loading /> : <Outlet />}</div>
      <ToastContainer position="top-center" autoClose={5000} />

     <Footer/>
      </div>
  )
}

export default HomeLayouts