import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Auth/AuthProvider';
import Loading from '../Pages/Loading';

const ManagerProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosInstance.get(
        `user-data?email=${user.email}`
      );
      return res.data;
    },
  });



  // Global loading state
  if (loading || isLoading) {
    return (
      <div className="text-center mt-20 text-xl">
       <Loading />
      </div>
    );
  }

  // Role check
  if (dbUser[0]?.role !== 'admin') {
    return (
      <h2 className="text-center text-3xl mt-20 text-red-600">
        Access Denied
      </h2>
    );
  }

  // Manager can access
  return children;
};

export default ManagerProtectedRoutes;
