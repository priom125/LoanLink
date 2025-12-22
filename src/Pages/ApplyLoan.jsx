import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FileText,
  AtSign,
  DollarSign,
  Percent,
  User,
  Phone,
  CreditCard,
  Briefcase,
  TrendingUp,
  MapPin,
  Edit3,
  AlertTriangle,
  Send,
} from "lucide-react";
import { NavLink, useLoaderData } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import useAxios from "../hooks/useAxios";

function ApplyLoan() {
  const { user, loading } = useContext(AuthContext);
  const loanCategories = useLoaderData();

  const axiosInstance = useAxios();

  const AUTO_FILL_DATA = {
    status: "Pending",
    paymentStatus: "Unpaid",
    userEmail: user?.email || "",
    loanTitle: "Personal",
    interestRate: "8",
    category: loanCategories?.category || "Personal Loan",

  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const ErrorMessage = ({ message }) => (
    <p className="flex items-center mt-1 text-sm text-red-400 font-medium">
      <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
      {message}
    </p>
  );

  const handelApplySubmit = async (data) => {
    setSubmissionStatus(null);
    setSubmitting(true);

    try {
      const fullSubmission = {
        ...AUTO_FILL_DATA,
        ...data,
        submissionDate: new Date().toISOString(),
      };

      const url = "https://loanlink-nine.vercel.app/add-loan";
      const response = await axiosInstance.post(url, fullSubmission);

      // adjust success condition depending on your API response shape
      if (response.status >= 200 && response.status < 300) {
        setSubmissionStatus("success");
        console.log(
          "Loan Application Submitted Successfully! Data:",
          fullSubmission,
          "Response:",
          response.data
        );
        reset();
      } else {
        setSubmissionStatus("error");
        console.error("Unexpected response", response);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 my-10">
      <div className="w-full max-w-3xl bg-gray-800 p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700 transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <FileText className="w-10 h-10 mx-auto text-indigo-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-white">
            Loan Application
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Please provide your details for the loan application.
          </p>
        </div>

        {submissionStatus === "success" && (
          <div
            className="mb-6 p-4 bg-green-900/40 border-l-4 border-green-500 text-green-300 rounded-lg animate-pulse"
            role="alert"
          >
            <p className="font-bold">Application Submitted!</p>
            <p>
              Your loan application is now <strong>Pending</strong> review.
            </p>
          </div>
        )}
        {submissionStatus === "error" && (
          <div
            className="mb-6 p-4 bg-red-900/40 border-l-4 border-red-500 text-red-300 rounded-lg"
            role="alert"
          >
            <p className="font-bold">Submission Failed</p>
            <p>
              There was an issue processing your application. Please check your
              inputs.
            </p>
          </div>
        )}

        <div className="mb-8 p-4 bg-gray-700 rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm font-medium">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-gray-400 flex items-center">
              <AtSign className="w-4 h-4 mr-2" /> User Email
            </p>
            <p className="text-indigo-400 truncate">
              {user?.email || "Not signed in"}
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-gray-400 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Loan Title
            </p>
            <p className="text-white">{AUTO_FILL_DATA.loanTitle}</p>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <p className="text-gray-400 flex items-center">
              <Percent className="w-4 h-4 mr-2" /> Interest Rate
            </p>
            <p className="text-white">{AUTO_FILL_DATA.interestRate}</p>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <p className="text-gray-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" /> Status
            </p>
            <p className="text-yellow-400 font-bold">{AUTO_FILL_DATA.status}</p>
          </div>
        </div>

        {/* Loan Application Form */}
        <form onSubmit={handleSubmit(handelApplySubmit)} className="space-y-6">
          {/* --- Personal Details Row (2 Columns on MD+) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="firstName"
                  type="text"
                  disabled={loading || submitting}
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.firstName
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="Priom"
                />
              </div>
              {errors.firstName && (
                <ErrorMessage message={errors.firstName.message} />
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="lastName"
                  type="text"
                  disabled={loading || submitting}
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.lastName
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="Sheikh"
                />
              </div>
              {errors.lastName && (
                <ErrorMessage message={errors.lastName.message} />
              )}
            </div>
          </div>

          {/* --- Contact and ID Row (2 Columns on MD+) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Number */}
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="contactNumber"
                  type="tel"
                  disabled={loading || submitting}
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^\+?[0-9\s-]{8,}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.contactNumber
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="+1 555 123 4567"
                />
              </div>
              {errors.contactNumber && (
                <ErrorMessage message={errors.contactNumber.message} />
              )}
            </div>

            {/* National ID / Passport Number */}
            <div>
              <label
                htmlFor="nationalID"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                National ID / Passport Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="nationalID"
                  type="text"
                  disabled={loading || submitting}
                  {...register("nationalID", {
                    required: "ID/Passport Number is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.nationalID
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="ABC-123456789"
                />
              </div>
              {errors.nationalID && (
                <ErrorMessage message={errors.nationalID.message} />
              )}
            </div>
          </div>

          {/* --- Income and Loan Row (2 Columns on MD+) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Source */}
            <div>
              <label
                htmlFor="incomeSource"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Income Source (e.g., Employment, Self-Employed)
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="incomeSource"
                  type="text"
                  disabled={loading || submitting}
                  {...register("incomeSource", {
                    required: "Income Source is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.incomeSource
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="Software Engineer"
                />
              </div>
              {errors.incomeSource && (
                <ErrorMessage message={errors.incomeSource.message} />
              )}
            </div>

            {/* Monthly Income */}
            <div>
              <label
                htmlFor="monthlyIncome"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Monthly Income (Gross)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="monthlyIncome"
                  type="number"
                  step="0.01"
                  disabled={loading || submitting}
                  {...register("monthlyIncome", {
                    required: "Monthly Income is required",
                    min: {
                      value: 1,
                      message: "Income must be greater than zero",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.monthlyIncome
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="5000.00"
                />
              </div>
              {errors.monthlyIncome && (
                <ErrorMessage message={errors.monthlyIncome.message} />
              )}
            </div>
          </div>

          {/* --- Loan Amount and Address Row --- */}
          {/* Loan Amount */}
          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Loan Amount Requested
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="loanAmount"
                type="number"
                step="100"
                disabled={loading || submitting}
                {...register("loanAmount", {
                  required: "Loan Amount is required",
                  min: {
                    value: 500,
                    message: "Loan amount must be at least 500",
                  },
                })}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                  errors.loanAmount
                    ? "border-red-500"
                    : "border-gray-600 focus:ring-indigo-500"
                } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                placeholder="10000"
              />
            </div>
            {errors.loanAmount && (
              <ErrorMessage message={errors.loanAmount.message} />
            )}
          </div>

          {/* Address (Single field for simplicity) */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Current Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <textarea
                id="address"
                rows="3"
                disabled={loading || submitting}
                {...register("address", { required: "Address is required" })}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-600 focus:ring-indigo-500"
                } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm resize-none`}
                placeholder="Street Address, City, State/Province, Zip/Postal Code"
              />
            </div>
            {errors.address && (
              <ErrorMessage message={errors.address.message} />
            )}
          </div>

          {/* Reason for Loan (Textarea) */}
          <div>
            <label
              htmlFor="reasonForLoan"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Reason for Loan
            </label>
            <div className="relative">
              <Edit3 className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <textarea
                id="reasonForLoan"
                rows="3"
                disabled={loading || submitting}
                {...register("reasonForLoan", {
                  required: "Reason for loan is required",
                })}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                  errors.reasonForLoan
                    ? "border-red-500"
                    : "border-gray-600 focus:ring-indigo-500"
                } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm resize-none`}
                placeholder="e.g., Home renovation, debt consolidation, business investment."
              />
            </div>
            {errors.reasonForLoan && (
              <ErrorMessage message={errors.reasonForLoan.message} />
            )}
          </div>

          {/* Extra Notes (Textarea) */}
          <div>
            <label
              htmlFor="extraNotes"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Extra Notes (Optional)
            </label>
            <div className="relative">
              <Edit3 className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <textarea
                id="extraNotes"
                rows="3"
                disabled={loading || submitting}
                {...register("extraNotes")}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm resize-none`}
                placeholder="Add any relevant information here."
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading || submitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white transition duration-200 ease-in-out 
                                ${
                                  loading || submitting
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700 focus:ring-offset-gray-800"
                                }`}
            >
              {submitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer/Links: Changed to Back to Home/Dashboard */}
        <div className="mt-8 text-center text-sm">
          <p className="text-gray-400">
            Need to return?{" "}
            <NavLink
              to="/"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
            >
              Back to Home
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplyLoan;
