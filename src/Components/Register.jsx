import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus, User, AtSign, Lock, AlertTriangle, Image, Briefcase } from 'lucide-react'; 
import { NavLink } from 'react-router';

function Register() {
   const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm();

    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null
    const [loading, setLoading] = useState(false);

    // Helper component for displaying form errors
    const ErrorMessage = ({ message }) => (
        <p className="flex items-center mt-1 text-sm text-red-400 font-medium">
            <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
            {message}
        </p>
    );


  const handleRegister = async (data) => {
        setLoading(true);
        setSubmissionStatus(null);
        console.log("Attempting registration for:", data.email);

        try {

            console.log("Registration successful! User Data:", data);
            // reset(); // Keeping data visible for demonstration purposes
        } catch (error) {
            console.error("Registration failed:", error.message);
            // In a real scenario, this would handle server-side errors (e.g., email already exists)
            setSubmissionStatus('error');
        } finally {
            setLoading(false);
        }
    };
  return (
     <div className="min-h-screen  flex items-center justify-center p-4">
            {/* Dark theme card container */}
            <div className="w-full max-w-md bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-700 transform transition-all duration-300 hover:shadow-3xl">
                
                {/* Header */}
                <div className="text-center mb-8">
                    {/* Icon color uses indigo-500 base */}
                    <UserPlus className="w-10 h-10 mx-auto text-indigo-500" /> 
                    <h2 className="mt-4 text-3xl font-extrabold text-white">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Join us today! Fill out the form below.
                    </p>
                </div>

                {/* Submission Status Message (Simulated Toast/Sweet Alert) */}
                {submissionStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-900/40 border-l-4 border-green-500 text-green-300 rounded-lg animate-pulse" role="alert">
                        <p className="font-bold">Registration Successful!</p>
                        <p>Welcome! Your account has been created.</p>
                    </div>
                )}
                {submissionStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-900/40 border-l-4 border-red-500 text-red-300 rounded-lg" role="alert">
                        <p className="font-bold">Registration Failed</p>
                        <p>An error occurred during registration. Please try again.</p>
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                    
                    {/* Name Input Group */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                disabled={loading}
                                {...register('name', { required: 'Name is required' })}
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="Priom Sheikh"
                            />
                        </div>
                        {errors.name && <ErrorMessage message={errors.name.message} />}
                    </div>

                    {/* Email Input Group */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email address
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                disabled={loading}
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                    </div>

                    {/* PhotoURL Input Group */}
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-300 mb-1">
                            Profile Picture URL (Optional)
                        </label>
                        <div className="relative">
                            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                disabled={loading}
                                {...register('photoURL')}
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.photoURL ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="http://example.com/photo.jpg"
                            />
                        </div>
                        {errors.photoURL && <ErrorMessage message={errors.photoURL.message} />}
                    </div>

                    {/* Role Dropdown */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                            Role
                        </label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <select
                                id="role"
                                name="role"
                                disabled={loading}
                                {...register('role', { required: 'Role is required' })}
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                            >
                                <option value="" disabled className="text-gray-500 bg-gray-800">Select your role</option>
                                <option value="borrower" className="bg-gray-800 text-white">Borrower</option>
                                <option value="manager" className="bg-gray-800 text-white">Manager</option>
                            </select>
                        </div>
                        {errors.role && <ErrorMessage message={errors.role.message} />}
                    </div>
                    
                    {/* Password Input Group */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                disabled={loading}
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: "Length must be at least 6 characters."
                                    },
                                    pattern: {
                                        // Regex to ensure at least one uppercase and one lowercase letter
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                        message: "Password must contain at least one uppercase letter and one lowercase letter."
                                    }
                                })}
                                // Input Dark Theme styles
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="••••••••"
                            />
                        </div>
                        {/* Custom error message for validation rules */}
                        {errors.password && <ErrorMessage message={errors.password.message} />}
                    </div>

                    {/* Action Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            // Button color uses indigo-500 base
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white transition duration-200 ease-in-out 
                                ${loading 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700'
                                }`}
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Register
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer/Links: Link to Login page */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <NavLink 
                        to="/login" 
                        
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
                        >
                            Log In
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Register