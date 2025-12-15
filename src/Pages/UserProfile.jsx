import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import {
  LogOut,
  User,
  Mail,
  Shield,
  Loader,
  BookOpenCheck,
  MapPin,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const { user, logOut } = useContext(AuthContext);

  const axiosInstance = useAxios();

  const { data: myLoan = [] } = useQuery({
    queryKey: ["my-loans", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-loan?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: userData = [] } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-data?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(userData)

  const Role = userData[0]?.role;
  const Name = userData[0]?.name;
  const PhotoUrl = userData[0]?.photoURL;
 
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-gray-950 text-white backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-indigo-100">
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <img
            src={PhotoUrl}
            alt="Profile Avatar"
            className="w-24 h-24 object-cover rounded-full ring-4 ring-indigo-500 ring-offset-4"
          />
          <h1 className="mt-4 text-3xl font-extrabold text-indigo-500">
            {Name || "No Name Provided"}
          </h1>
          <p className="text-sm  font-medium mt-1">
            {user?.email || "No Email Provided"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <p className="flex space-x-2">
            <User className="text-green-500" /> {Role}
          </p>
          <p className="flex space-x-2">
            <Mail className="text-green-500" /> {user?.email}
          </p>
          <p className="flex space-x-2">
            <Shield className="text-green-500" />{" "}
            {user?.emailVerified ? "Verified" : "Not Verified"}
          </p>
          <p className="flex space-x-2">
            <MapPin className="text-green-500" /> {myLoan[0]?.address}
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full max-w-sm px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
