import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import {
  UserPlus,
  Mail,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  User,
  Image as ImageIcon,
} from "lucide-react";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const fullSubmission = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "borrower",
        roleStatus: "Pending",
      };

      try {
        const url = "https://loanlink-nine.vercel.app/users";
        await axios.post(url, fullSubmission);
        toast.success("Account created successfully!");
      } catch (backendError) {
        if (backendError.response?.status === 409) {
          toast.info("Account already exists. Logging you in...");
        } else {
          throw backendError;
        }
      }

      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("Google signup error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);

    try {
      // Create user with Firebase
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // Update profile with name and photo
      await updateUserProfile(data.name, data.photoURL || null);

      // Save to backend
      const fullSubmission = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL || null,
        role: "borrower",
        roleStatus: "Pending",
      };

      const url = "https://loanlink-nine.vercel.app/users";
      await axios.post(url, fullSubmission);

      toast.success("Account created successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header Card */}
        <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-xl">
          <div className="card-body text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary-content/20 p-4 rounded-full">
                <UserPlus className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold">Create Account</h1>
            <p className="opacity-90">Join LoanLink today</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-8">
            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
              className="btn btn-outline w-full gap-2 hover:btn-secondary transition-all"
              type="button"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Registration Form */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    disabled={loading || googleLoading}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`input input-bordered w-full pl-10 ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.name.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={loading || googleLoading}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`input input-bordered w-full pl-10 ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Photo URL Field (Optional) */}
              <div className="form-control">
                <label htmlFor="photoURL" className="label">
                  <span className="label-text font-medium">
                    Photo URL <span className="text-base-content/50">(Optional)</span>
                  </span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    id="photoURL"
                    type="url"
                    disabled={loading || googleLoading}
                    {...register("photoURL", {
                      pattern: {
                        value: /^https?:\/\/.+/i,
                        message: "Invalid URL format",
                      },
                    })}
                    className={`input input-bordered w-full pl-10 ${
                      errors.photoURL ? "input-error" : ""
                    }`}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                {errors.photoURL && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.photoURL.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={loading || googleLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])/,
                        message: "Password must contain uppercase and lowercase letters",
                      },
                    })}
                    className={`input input-bordered w-full pl-10 pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.password.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={loading || googleLoading}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    className={`input input-bordered w-full pl-10 pr-12 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.confirmPassword.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(handleRegister)}
                disabled={loading || googleLoading}
                className="btn btn-secondary btn-lg w-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Login Link Card */}
        <div className="card bg-base-200 shadow-md border border-base-300">
          <div className="card-body p-4 text-center">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <NavLink to="/login" className="link link-secondary font-medium">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-base-content/60">
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Your data is protected with industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;