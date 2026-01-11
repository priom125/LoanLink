import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import {
  LogOut,
  User,
  Mail,
  Shield,
  Loader2,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Settings,
  TrendingUp,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function UserProfile() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: myLoan = [], isLoading: loansLoading } = useQuery({
    queryKey: ["my-loans", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-loan?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: userData = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`user-data?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const Role = userData[0]?.role;
  const Name = userData[0]?.name;
  const PhotoUrl = userData[0]?.photoURL;
  const RoleStatus = userData[0]?.roleStatus;

  const handleLogout = () => {
    setIsLoggingOut(true);
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setIsLoggingOut(false);
      });
  };

  // Calculate loan statistics
  const totalLoans = myLoan.length;
  const activeLoans = myLoan.filter((loan) => loan.status === "active").length;
  const completedLoans = myLoan.filter((loan) => loan.status === "completed").length;

  if (userDataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      {/* Main Profile Card */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-6 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-base-300">
            {/* Avatar with Status Ring */}
            <div className="relative">
              <div className="avatar online">
                <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img
                    src={PhotoUrl || user?.photoURL || "https://placehold.co/200x200/1a1a1a/ffffff?text=User"}
                    alt="Profile Avatar"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/200x200/1a1a1a/ffffff?text=User";
                    }}
                  />
                </div>
              </div>
              {/* Edit Button Overlay */}
              <button className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary shadow-lg">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {/* Name and Email */}
            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-base-content">
              {Name || "No Name Provided"}
            </h1>
            <p className="text-base-content/70 font-medium mt-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email || "No Email Provided"}
            </p>

            {/* Role Badge */}
            {Role && (
              <div className="mt-4">
                <span className="badge badge-primary badge-lg font-semibold px-4 py-3 capitalize">
                  {Role}
                </span>
              </div>
            )}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Role Status Card */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
              <div className="card-body p-4 flex flex-row items-center gap-3">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <User className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-base-content/60 font-medium">Role Status</p>
                  <p className="text-base font-bold text-base-content capitalize">
                    {RoleStatus || "Not Set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
              <div className="card-body p-4 flex flex-row items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-base-content/60 font-medium">Email Address</p>
                  <p className="text-sm font-semibold text-base-content truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
              <div className="card-body p-4 flex flex-row items-center gap-3">
                <div className={`${user?.emailVerified ? "bg-success/10" : "bg-error/10"} p-3 rounded-lg`}>
                  {user?.emailVerified ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-error" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-base-content/60 font-medium">Verification Status</p>
                  <p className={`text-base font-bold ${user?.emailVerified ? "text-success" : "text-error"}`}>
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Type Card */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
              <div className="card-body p-4 flex flex-row items-center gap-3">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-base-content/60 font-medium">Account Type</p>
                  <p className="text-base font-bold text-base-content capitalize">
                    {Role || "Standard User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="btn btn-error flex-1 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing Out...
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </>
              )}
            </button>
            <button className="btn btn-outline flex-1 hover:btn-primary transition-all duration-300">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Loan Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Loans */}
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Total Loans</p>
                <p className="text-3xl font-extrabold mt-1">
                  {loansLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    totalLoans
                  )}
                </p>
              </div>
              <BookOpen className="w-10 h-10 opacity-60" />
            </div>
          </div>
        </div>

        {/* Active Loans */}
        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-lg">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Active Loans</p>
                <p className="text-3xl font-extrabold mt-1">
                  {loansLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    activeLoans
                  )}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 opacity-60" />
            </div>
          </div>
        </div>

        {/* Completed Loans */}
        <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-lg">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Completed</p>
                <p className="text-3xl font-extrabold mt-1">
                  {loansLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    completedLoans
                  )}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      {/* <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body p-6">
          <h3 className="text-xl font-bold text-base-content mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="btn btn-outline hover:btn-primary transition-all duration-300">
              <BookOpen className="w-4 h-4" />
              My Loans
            </button>
            <button className="btn btn-outline hover:btn-secondary transition-all duration-300">
              <TrendingUp className="w-4 h-4" />
              Apply New
            </button>
         
            <button className="btn btn-outline hover:btn-info transition-all duration-300">
              <Mail className="w-4 h-4" />
              Support
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default UserProfile;