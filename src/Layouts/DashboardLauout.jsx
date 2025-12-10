import React from 'react'
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';
import Loading from '../Pages/Loading';
import { ToastContainer } from 'react-toastify';
import DasbaordSideBar from '../Components/DasbaordSideBar';

function DashboardLauout() {

     const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <div className="flex flex-col min-h-screen">
     <DasbaordSideBar/>

      <div className="flex-1  mx-auto">{isLoading ? <Loading /> : <Outlet />}</div>
      <ToastContainer position="top-center" autoClose={5000} />

     <Footer/>
      </div>
  )
}

export default DashboardLauout