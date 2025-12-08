import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router'
import { LogIn, AtSign, Lock, AlertTriangle, Chrome } from 'lucide-react';
import { AuthContext } from '../Auth/AuthProvider';

function Login() {
      const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch,
        reset 
    } = useForm();

    const {googleLogin,signIn} = useContext(AuthContext);

        const [submissionStatus, setSubmissionStatus] = useState(null); 
    const [loading, setLoading] = useState(false);

    
    const ErrorMessage = ({ message }) => (
        <p className="flex items-center mt-1 text-sm text-red-500 font-medium">
            <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
            {message}
        </p>
    );

        const handleGoogleLogin = () => {
        // Placeholder for Google login logic
        googleLogin()
        .then(result => {
            const user = result.user;
            console.log("Google user:", user);
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
        console.log("Google login clicked");
    };

    // Simulate API call for form submission
    const handleLogin = async (data) => {
        setLoading(true);
        setSubmissionStatus(null);
        console.log("Attempting login for:", data.email);

        try {
            await signIn(data.email, data.password);
            console.log("Login successful for:", data.email);
            setSubmissionStatus('success');
            reset();

            
        } catch (error) {
            console.error("Login failed:", error.message);
            setSubmissionStatus('error');
        } finally {
            setLoading(false);
        }
    };
    


  return (
<div className="min-h-screen flex items-center justify-center p-4">
            {/* Dark theme card container */}
            <div className="w-full max-w-md bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-700 transform transition-all duration-300 hover:shadow-3xl">
                
                {/* Header */}
                <div className="text-center mb-8">
                    {/* Icon color changed to base-500 (indigo-500) */}
                    <LogIn className="w-10 h-10 mx-auto text-indigo-500" /> 
                    <h2 className="mt-4 text-3xl font-extrabold text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter your credentials or use a social provider.
                    </p>
                </div>

                {/* Submission Status Message */}
                {submissionStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-900/40 border-l-4 border-green-500 text-green-300 rounded-lg" role="alert">
                        <p className="font-bold">Login Successful!</p>
                        <p>Welcome back! You are now signed in.</p>
                    </div>
                )}
                {/* Improved Error Message Display */}
                {submissionStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-900/40 border-l-4 border-red-500 text-red-300 rounded-lg" role="alert">
                        <p className="font-bold">Login Failed</p>
                        <p>Invalid email or password. Please check your details.</p>
                    </div>
                )}

                {/* Social Login Button (Google) - Dark Theme adjustments */}
       <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-700/80 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>

          <span>Sign in with Google</span>
        </button>

                {/* OR Divider - Dark Theme adjustments */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    
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
                                // Input Dark Theme styles
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="user@example.com"
                            />
                        </div>
                        {errors.email && <ErrorMessage message={errors.email.message} />}
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
                                autoComplete="current-password"
                                disabled={loading}
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                // Input Dark Theme styles
                                className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'} rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
                                placeholder="••••••••"
                            />
                        </div>
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
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer/Links: Link to Register page - Dark Theme adjustments */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <NavLink 
                            to="/register"
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
                        >
                            Register
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Login