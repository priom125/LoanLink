import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your API base URL
  timeout: 10000, // Request timeout
});

const useAxios = () => {
const {user} = useContext(AuthContext)
  useEffect(() => {
    const reqIntercepttor = axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config
    } )

    const resInterceptor = axiosInstance.interceptors.request.use((response)=>{
      return response
    },
    (error) =>{
      console.log(error);
      return Promise.reject(error);
    })

    return () => {
      axiosInstance.interceptors.request.eject(reqIntercepttor);
      axiosInstance.interceptors.request.eject(resInterceptor);
      
    }

  },[user])
    return axiosInstance;
};
export default useAxios;