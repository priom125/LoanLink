import React, { useContext } from 'react'

import { Navigate, useLocation } from 'react-router';

import { AuthContext } from '../Auth/AuthProvider';
import Loading from '../Pages/Loading';

const ProtectedRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();


  if(loading) {
    return <Loading />;
  }


  if(user && user?.email){
    return children;
  }


  return <Navigate to="/login" state={{ from: location.pathname }} />;
}

export default ProtectedRoute