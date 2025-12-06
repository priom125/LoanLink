import React from 'react'
import Navbar from '../Components/Navbar'
import Loading from '../Pages/Loading'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Footer from '../Components/Footer'

function AuthLayout() {
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

export default AuthLayout