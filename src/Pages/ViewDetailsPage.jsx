import React, { useContext } from "react";
import { NavLink, useLoaderData } from "react-router";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";
import {
  DollarSign,
  Percent,
  Calendar,
  FileText,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Info,
  Shield,
  Clock,
  Tag,
  Loader2,
} from "lucide-react";

function ViewDetailsPage() {
  const { user } = useContext(AuthContext);
  const loan = useLoaderData();

  const AvailableEMIPlans = loan.emiPlans || [];
  const EMIPlansArray = Array.isArray(AvailableEMIPlans)
    ? AvailableEMIPlans
    : typeof AvailableEMIPlans === "string"
    ? AvailableEMIPlans.split(",").map((s) => s.trim())
    : [];

  const axiosInstance = useAxios();

  const { data: UserData = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`user-data?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const Role = UserData[0]?.role;
  const isDisabled = Role === "admin" || Role === "manager";

  // Get category color scheme
  const getCategoryTheme = (category) => {
    const themes = {
      Personal: { badge: "badge-primary", accent: "text-primary" },
      Home: { badge: "badge-secondary", accent: "text-secondary" },
      Business: { badge: "badge-accent", accent: "text-accent" },
      Auto: { badge: "badge-info", accent: "text-info" },
    };
    return themes[category] || themes.Personal;
  };

  const theme = getCategoryTheme(loan.category);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading loan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Image Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
          <figure className="relative h-64 sm:h-96">
            <img
              src={loan.display_url}
              alt={loan.loanTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1200x600/1a1a1a/ffffff?text=Loan+Image";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className={`badge ${theme.badge} badge-lg font-semibold shadow-lg`}>
                {loan.category}
              </span>
            </div>
          </figure>
        </div>

        {/* Title Section */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content">
              {loan.loanTitle}
            </h1>
            {loan.createdByRole && (
              <div className="flex items-center gap-2 mt-2">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm text-base-content/70">
                  Verified by {loan.createdByRole}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Max Loan Limit */}
          <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 opacity-80" />
                    <p className="text-xs uppercase font-medium opacity-80">Max Limit</p>
                  </div>
                  <p className="text-3xl font-extrabold">
                    ${loan.maxLoanLimit?.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 opacity-30" />
              </div>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-lg">
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="w-5 h-5 opacity-80" />
                    <p className="text-xs uppercase font-medium opacity-80">Interest Rate</p>
                  </div>
                  <p className="text-3xl font-extrabold">{loan.interestRate}%</p>
                </div>
                <Percent className="w-12 h-12 opacity-30" />
              </div>
            </div>
          </div>

          {/* EMI Plans */}
          <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 opacity-80" />
                    <p className="text-xs uppercase font-medium opacity-80">Repayment Plans</p>
                  </div>
                  <p className="text-2xl font-extrabold">
                    {EMIPlansArray.length > 0 ? `${EMIPlansArray.length} Options` : "Flexible"}
                  </p>
                </div>
                <CreditCard className="w-12 h-12 opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-base-content">Loan Overview</h2>
            </div>
            <p className="text-lg text-base-content/80 leading-relaxed">{loan.description}</p>
          </div>
        </div>

        {/* EMI Plans Detailed Section */}
        {EMIPlansArray.length > 0 && (
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-base-content">
                  Flexible EMI Plans Available
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {EMIPlansArray.map((plan, index) => (
                  <div
                    key={index}
                    className="card bg-base-200 shadow-sm border border-base-300 hover:shadow-md transition-shadow"
                  >
                    <div className="card-body p-4 text-center">
                      <Clock className={`w-6 h-6 mx-auto mb-2 ${theme.accent}`} />
                      <p className="font-bold text-xl text-base-content">{plan}</p>
                      <p className="text-xs text-base-content/60">months</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Required Documents Section */}
        {loan.requiredDocuments && (
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-warning" />
                <h2 className="text-2xl font-bold text-base-content">Required Documents</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {loan.requiredDocuments.split(",").map((doc, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-lg gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {doc.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features/Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <h3 className="font-bold text-base-content">Quick Approval</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Fast processing with minimal documentation requirements
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base-content">Secure Process</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Your information is protected with industry-standard security
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-base-content">Flexible Repayment</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Choose from multiple EMI options that suit your budget
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <h3 className="font-bold text-base-content">Competitive Rates</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Enjoy attractive interest rates on your loan amount
              </p>
            </div>
          </div>
        </div>

        {/* Admin/Manager Restriction Alert */}
        {isDisabled && (
          <div className="alert alert-warning shadow-lg">
            <AlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Application Restricted</h3>
              <div className="text-sm">
                Admins and managers cannot apply for loans. This is a view-only access.
              </div>
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
          <div className="card-body p-8 text-center">
            <h3 className="text-2xl font-bold text-base-content mb-2">
              Ready to get started?
            </h3>
            <p className="text-base-content/70 mb-6">
              Apply now and get approved within 24-48 hours
            </p>
            <NavLink
              to={isDisabled ? "#" : `/apply-loan/${loan._id}`}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
              className={`btn btn-lg shadow-xl transition-all duration-300 ${
                isDisabled
                  ? "btn-disabled"
                  : "btn-primary hover:shadow-2xl hover:scale-105"
              }`}
            >
              {isDisabled ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Application Restricted
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* Back to Loans Link */}
        <div className="text-center">
          <NavLink
            to="/all-loans"
            className="link link-primary inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to All Loans
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsPage;