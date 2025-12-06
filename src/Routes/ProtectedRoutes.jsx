// import React, { useContext } from 'react'
// import { AuthContext } from '../Auth/AuthProvider';
// import { Navigate, useLocation } from 'react-router';
// import Loading from '../components/Loading';

// const ProtectedRoute = ({children}) => {
//   const {user, loading} = useContext(AuthContext);
//   const location = useLocation();


//   if(loading) {
//     return <Loading />;
//   }


//   if(user && user?.email){
//     return children;
//   }


//   return <Navigate to="/login" state={{ from: location.pathname }} />;
// }

// export default ProtectedRoute