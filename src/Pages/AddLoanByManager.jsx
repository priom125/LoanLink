import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FileText,
  Tag,
  DollarSign,
  Percent,
  TrendingUp,
  Paperclip,
  CreditCard,
  Calendar,
  Home,
  Image,
  AlertTriangle,
  Send,
  Edit3,
} from "lucide-react";
// Imported ToastContainer and toast
import { ToastContainer, toast } from "react-toastify";
import useAxios from "../hooks/useAxios";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";


const SYSTEM_DATE = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});



// Helper component for displaying form errors
const ErrorMessage = ({ message }) => (
  <p className="flex items-center mt-1 text-sm text-red-400 font-medium">
    <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
    {message}
  </p>
);

// Toggle Switch Component (for Show on Home)
const ToggleSwitch = ({ label, register, name, loading }) => (
  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-300 flex items-center"
    >
      <Home className="w-5 h-5 mr-2 text-indigo-400" />
      {label}
    </label>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={name}
        className="sr-only peer"
        disabled={loading}
        {...register(name)}
      />
      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

// Main Application Component
const AddLoanByManager = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      showOnHome: true, // Defaulting toggle to ON
      category: "Personal",
    },
  });

  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  const { user } = useContext(AuthContext);

  const { data: userData = [] } = useQuery({
    queryKey: ['UserData', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`user-data?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log('fetched user data:', userData);

  const role = Array.isArray(userData) ? userData[0]?.role : userData?.role;
  console.log('user role:', role);

  // POST form data using axios instance
  const handleAddLoan = async (data) => {
    setLoading(true);

    try {
      // Build base payload first
      const newLoanProduct = {
        ...data,
        dateCreated: SYSTEM_DATE,
        status: "Pending",
        createdByEmail: user?.email,
        createdByRole: role ?? 'manager',
      };

      // If an image file was provided, upload it first to imgbb
      const file = data.imagesUpload?.[0];
      if (file) {
        const imageUploadUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_HOST}`;
        const formData = new FormData();
        formData.append("image", file);

        // Use axios instance to upload image
        const imageResponse = await axiosInstance.post(imageUploadUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = imageResponse?.data?.data?.display_url;
        if (imageUrl) {
          // attach the uploaded image URL to payload
          newLoanProduct.display_url = imageUrl;
        }
        console.log("Image uploaded, url:", imageUrl);
      }

      // Now send the full payload to backend
      const url = "/dashboard/add-loan-category";
      const response = await axiosInstance.post(url, newLoanProduct);

      toast.success(`Loan "${data.loanTitle}" created successfully!`);
      console.log("New Loan Product Created Successfully! Data:", response.data);
    } catch (error) {
      console.error("Loan Creation failed:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Creation failed: Please check server logs or network connection.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };





  return (
    // Dark theme background
    <div className="min-h-screen flex items-start justify-center p-4 py-8">
      {/* Dark theme card container, wide layout */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <FileText className="w-10 h-10 mx-auto text-indigo-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-white">
            Define New Loan Product
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create a new loan offering for customers on the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleAddLoan)} className="space-y-6">
          {/* --- Top Row: System Date & Show on Home --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* System Date (Read-Only) */}
            <div className="md:col-span-1">
              <p className="text-sm font-medium text-gray-300 mb-1">
                Date Created (System)
              </p>
              <div className="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600 text-white font-semibold">
                <Calendar className="w-5 h-5 mr-3 text-yellow-400" />
                {SYSTEM_DATE}
              </div>
            </div>

            {/* Show on Home Toggle - Alignment Fix */}
            <div className="md:col-span-2">
              {/* Dummy label to reserve space and align toggle with date input box */}
              <p className="text-sm font-medium text-gray-300 mb-1 opacity-0 pointer-events-none select-none">
                Placeholder
              </p>
              <ToggleSwitch
                label="Show on Home Page / Available to Public"
                name="showOnHome"
                register={register}
                loading={loading}
              />
            </div>
          </div>

          {/* --- Loan Title & Category Row --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Loan Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="loanTitle"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Loan Title
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="loanTitle"
                  type="text"
                  disabled={loading}
                  {...register("loanTitle", {
                    required: "Loan Title is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.loanTitle
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="e.g., Small Business Startup Loan"
                />
              </div>
              {errors.loanTitle && (
                <ErrorMessage message={errors.loanTitle.message} />
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  id="category"
                  disabled={loading}
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.category
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                >
                  <option value="Personal" className="bg-gray-800">
                    Personal Loan
                  </option>
                  <option value="Home" className="bg-gray-800">
                    Home Loan
                  </option>
                  <option value="Business" className="bg-gray-800">
                    Business Loan
                  </option>
                  <option value="Auto" className="bg-gray-800">
                    Auto Loan
                  </option>
                </select>
              </div>
              {errors.category && (
                <ErrorMessage message={errors.category.message} />
              )}
            </div>
          </div>

          {/* --- Description --- */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <div className="relative">
              <Edit3 className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <textarea
                id="description"
                rows="3"
                disabled={loading}
                {...register("description", {
                  required: "Description is required",
                })}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-600 focus:ring-indigo-500"
                } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm resize-none`}
                placeholder="A brief, customer-facing summary of the loan product's features."
              />
            </div>
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>

          {/* --- Financial Terms Row --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interest Rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Interest Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  disabled={loading}
                  {...register("interestRate", {
                    required: "Rate is required",
                    min: { value: 0.1, message: "Rate must be positive" },
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.interestRate
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="6.50"
                />
              </div>
              {errors.interestRate && (
                <ErrorMessage message={errors.interestRate.message} />
              )}
            </div>

            {/* Max Loan Limit */}
            <div>
              <label
                htmlFor="maxLoanLimit"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Max Loan Limit
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="maxLoanLimit"
                  type="number"
                  step="1000"
                  disabled={loading}
                  {...register("maxLoanLimit", {
                    required: "Limit is required",
                    min: { value: 1000, message: "Must be at least 1,000" },
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.maxLoanLimit
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="50000"
                />
              </div>
              {errors.maxLoanLimit && (
                <ErrorMessage message={errors.maxLoanLimit.message} />
              )}
            </div>

            {/* EMI Plans / Terms */}
            <div>
              <label
                htmlFor="emiPlans"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                EMI Plans / Terms (e.g., 12, 24, 36 months)
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="emiPlans"
                  type="text"
                  disabled={loading}
                  {...register("emiPlans", {
                    required: "EMI plans are required",
                  })}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                    errors.emiPlans
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                  placeholder="12, 24, 36"
                />
              </div>
              {errors.emiPlans && (
                <ErrorMessage message={errors.emiPlans.message} />
              )}
            </div>
          </div>

          {/* --- Required Documents --- */}
          <div>
            <label
              htmlFor="requiredDocuments"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Required Documents (List separated by commas)
            </label>
            <div className="relative">
              <Paperclip className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <textarea
                id="requiredDocuments"
                rows="2"
                disabled={loading}
                {...register("requiredDocuments", {
                  required: "Required Documents list is mandatory",
                })}
                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${
                  errors.requiredDocuments
                    ? "border-red-500"
                    : "border-gray-600 focus:ring-indigo-500"
                } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm resize-none`}
                placeholder="e.g., Photo ID, Proof of Income, Utility Bill"
              />
            </div>
            {errors.requiredDocuments && (
              <ErrorMessage message={errors.requiredDocuments.message} />
            )}
          </div>

          {/* --- Images Upload Simulation --- */}
          <div>
            <label
              htmlFor="imagesUpload"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Marketing Images (Upload Simulation)
            </label>
            <div className="relative flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-indigo-500 transition duration-150">
              <Image className="w-5 h-5 mr-3 text-gray-400" />
              <input
                id="imagesUpload"
                type="file"
                accept="image/*"
                multiple
                disabled={loading}
                // Note: File handling for real uploads is complex, this registers the input value.
                {...register("imagesUpload")}
                className="text-sm text-gray-400 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              // Button color uses indigo-500 base
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white transition duration-200 ease-in-out 
                                ${
                                  loading
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700 focus:ring-offset-gray-800"
                                }`}
            >
              {loading ? (
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
                  Save Loan Product
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer/Links */}
        <div className="mt-8 text-center text-sm">
          <p className="text-gray-400">
            Go back to{" "}
            <NavLink
              to="/dashboard/manage-users" // Placeholder for navigation to Loan Dashboard
              className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
            >
              Loan Management
            </NavLink>
          </p>
        </div>
      </div>
      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddLoanByManager;
