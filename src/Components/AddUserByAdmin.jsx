import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

// Define the available roles for the dropdown
const userRoles = [
  { value: 'manager', label: 'Manager' },
  { value: 'borrower', label: 'Borrower' },
];

const AddUserByAdmin = () => {
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: userRoles[0].value,
      roleStatus: 'Pending',
    },
  });

  const axiosInstance = useAxios();

  // Function called on successful form submission (after validation)
  const onSubmit = async (data) => {
    setMessage(null);
    setIsError(false);
    console.log('Attempting to add user:', data);

    const url = 'https://loanlink-nine.vercel.app/users';
    const fullSubmission = {
      name: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      roleStatus: 'Pending',
    };

    try {
      const response = await axiosInstance.post(url, fullSubmission);
      console.log('Registration successful! Response:', response.data);
      setMessage('User added successfully! They can now log in.');
      setIsError(false);
      reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('API Error:', error);
      const errorMsg =
        error?.response?.data?.message || error.message || 'Unknown error';
      setMessage(`Failed to add user: ${errorMsg}`);
      setIsError(true);
    }
  };

  // Dark theme Tailwind CSS classes
  const inputStyle =
    'mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-500';
  const labelStyle = 'block text-sm font-semibold text-gray-300 mb-2';
  const errorStyle =
    'mt-2 text-sm font-medium text-red-400 flex items-center gap-1';

  return (
    <div className=" bg-gradient-to-brp-4 sm:p-8 flex justify-center items-start">
      {/* Wrapper to center the toggle button and the form card */}
      <div className="w-full max-w-2xl">
        {/* Toggle Button */}
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="mb-6 w-full cursor-pointer flex items-center justify-center gap-3 py-4 px-6 rounded-xl shadow-lg text-lg font-bold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:scale-95 transform"
        >
          {isFormVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {isFormVisible ? 'Hide User Creation Form' : 'Show User Creation Form'}
        </button>

        {/* Conditional Form Rendering based on isFormVisible state */}
        {isFormVisible && (
          <div className="bg-gray-800 p-6 sm:p-10 shadow-2xl rounded-2xl border border-gray-700 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-600 rounded-lg">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Admin Portal
              </h2>
            </div>
            <p className="text-gray-400 mb-8">
              Add new users and assign their roles securely.
            </p>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-4 mb-6 rounded-lg font-medium transition-all duration-300 flex items-start gap-3 ${
                  isError
                    ? 'bg-red-900/50 text-red-200 border border-red-700'
                    : 'bg-green-900/50 text-green-200 border border-green-700'
                }`}
              >
                {isError ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Form Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name and Last Name - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* --- First Name Input --- */}
                <div>
                  <label htmlFor="firstName" className={labelStyle}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    {...register('firstName', {
                      required: 'First name is required',
                      maxLength: { value: 50, message: 'Max 50 characters' },
                    })}
                    className={inputStyle}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                  />
                  {errors.firstName && (
                    <p role="alert" className={errorStyle}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* --- Last Name Input --- */}
                <div>
                  <label htmlFor="lastName" className={labelStyle}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    {...register('lastName', {
                      required: 'Last name is required',
                      maxLength: { value: 50, message: 'Max 50 characters' },
                    })}
                    className={inputStyle}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                  />
                  {errors.lastName && (
                    <p role="alert" className={errorStyle}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- Email Input --- */}
              <div>
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email format',
                    },
                  })}
                  className={inputStyle}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p role="alert" className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* --- Role Dropdown (Select) --- */}
              <div>
                <label htmlFor="role" className={labelStyle}>
                  User Role
                </label>
                <select
                  id="role"
                  {...register('role', {
                    required: 'Role selection is required',
                  })}
                  className={inputStyle}
                  aria-invalid={errors.role ? 'true' : 'false'}
                >
                  {userRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p role="alert" className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200">
                  New users will be created with <strong>Pending</strong> status.
                  They'll need to log in to activate their account.
                </p>
              </div>

              {/* --- Submit Button --- */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent 
                  rounded-xl shadow-lg text-lg font-bold text-white transition-all duration-300
                  ${
                    isSubmitting
                      ? 'bg-blue-500 cursor-wait opacity-70'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Adding User...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Add User
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserByAdmin;