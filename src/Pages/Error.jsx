import React from 'react'
import ErrorImage from '../assets/Error.png'
import { NavLink } from 'react-router'

function Error() {
  return (
    <div className='max-w-7xl items-center justify-center flex flex-col mx-auto my-20'>
        <img src={ErrorImage} alt="" />
        <h1 className='font-bold text-5xl my-10'>Page Not Found</h1>
       <NavLink to="/"> <button className='font-semibold text-xl btn btn-primary text-white'>Back to Home</button></NavLink>
    </div>
  )
}

export default Error