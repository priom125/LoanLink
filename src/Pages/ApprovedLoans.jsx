import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  X,
  Loader2,
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  FileText,
  MapPin,
  Briefcase,
  Target,
} from "lucide-react";

function ApprovedLoans() {
  const axiosInstance = useAxios();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: approvedLoan = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedLoan"],
    queryFn: async () => {
      const res = await axiosInstance.get("approved-loan");
      return res.data;
    },
  });

  const handleViewClick = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading approved loans...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-error mx-auto" />
          <p className="text-error font-medium">Error loading approved loans. Please try again.</p>
        </div>
      </div>
    );
  }

  // sum the total loan amounts
const totalLoanAmount = approvedLoan.reduce(
  (sum, item) => sum + Number(item.loanAmount || 0),
  0
);

  

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Approved Loan Applications</h1>
          <p className="text-sm text-base-content/70 mt-1">
            View all approved loan applications ({approvedLoan.length} approved)
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-success to-success/80 text-success-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Total Approved</p>
                <p className="text-2xl font-extrabold mt-1">{approvedLoan.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Total Amount</p>
                <p className="text-2xl font-extrabold mt-1">
                 {totalLoanAmount} BDT
                </p>
              </div>
              <DollarSign className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Average Loan</p>
                <p className="text-2xl font-extrabold mt-1">
                  {approvedLoan.length > 0
                    ? Math.round(totalLoanAmount / approvedLoan.length).toLocaleString()
                    : 0}{" "}
                  BDT
                </p>
              </div>
              <FileText className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-base-content font-semibold">Loan ID</th>
                  <th className="text-base-content font-semibold">Applicant Info</th>
                  <th className="text-base-content font-semibold">Amount</th>
                  <th className="text-base-content font-semibold">Submission Date</th>
                  <th className="text-base-content font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedLoan.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-base-content/50">
                        <CheckCircle className="w-12 h-12" />
                        <p className="text-lg font-medium">No approved loans yet</p>
                        <p className="text-sm">Approved applications will appear here</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  approvedLoan.map((loan) => (
                    <tr key={loan._id} className="hover">
                      {/* Loan ID */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-success" />
                          <span className="font-mono text-xs text-base-content/70">
                            {loan._id.slice(-8)}
                          </span>
                        </div>
                      </td>

                      {/* User Info */}
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-base-content">
                              {loan.firstName} {loan.lastName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-base-content/50" />
                            <span className="text-xs text-base-content/70">{loan.userEmail}</span>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-success" />
                          <div>
                            <span className="font-bold text-success text-lg">
                              {loan.loanAmount?.toLocaleString()}
                            </span>
                            <span className="text-xs text-base-content/70 ml-1">BDT</span>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-warning" />
                          <span className="text-sm text-base-content/70">
                            {loan.submissionDate}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleViewClick(loan)}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl border-2 border-success/20">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-success/10 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-base-content">Approved Loan Details</h3>
                <p className="text-xs text-base-content/60">
                  Loan ID: {selectedLoan._id.slice(-8)}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* User Information Section */}
              <div>
                <h4 className="text-sm font-semibold text-base-content/60 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-base-content/60 font-medium">
                          First Name
                        </span>
                      </div>
                      <p className="font-semibold text-base-content">{selectedLoan.firstName}</p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-base-content/60 font-medium">Last Name</span>
                      </div>
                      <p className="font-semibold text-base-content">
                        {selectedLoan.lastName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-xs text-base-content/60 font-medium">Email</span>
                      </div>
                      <p className="font-semibold text-base-content truncate">
                        {selectedLoan.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-accent" />
                        <span className="text-xs text-base-content/60 font-medium">Phone</span>
                      </div>
                      <p className="font-semibold text-base-content">
                        {selectedLoan.phone || selectedLoan.contactNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Information Section */}
              <div>
                <h4 className="text-sm font-semibold text-base-content/60 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Loan Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span className="text-xs text-base-content/60 font-medium">
                          Loan Amount
                        </span>
                      </div>
                      <p className="font-bold text-success text-2xl">
                        {selectedLoan.loanAmount?.toLocaleString()} BDT
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-xs text-base-content/60 font-medium">Loan Type</span>
                      </div>
                      <p className="font-semibold text-base-content">
                        {selectedLoan.loanType || selectedLoan.loanTitle || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-warning" />
                        <span className="text-xs text-base-content/60 font-medium">
                          Submission Date
                        </span>
                      </div>
                      <p className="font-semibold text-base-content">
                        {selectedLoan.submissionDate}
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-xs text-base-content/60 font-medium">Status</span>
                      </div>
                      <span className="badge badge-success badge-lg">Approved</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              {(selectedLoan.purpose || selectedLoan.income || selectedLoan.address) && (
                <div>
                  <h4 className="text-sm font-semibold text-base-content/60 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedLoan.purpose && (
                      <div className="card bg-base-200 shadow-sm border border-base-300">
                        <div className="card-body p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-info" />
                            <span className="text-xs text-base-content/60 font-medium">
                              Purpose
                            </span>
                          </div>
                          <p className="font-semibold text-base-content">{selectedLoan.purpose}</p>
                        </div>
                      </div>
                    )}

                    {selectedLoan.income && (
                      <div className="card bg-base-200 shadow-sm border border-base-300">
                        <div className="card-body p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-success" />
                            <span className="text-xs text-base-content/60 font-medium">
                              Annual Income
                            </span>
                          </div>
                          <p className="font-bold text-success text-lg">
                            {selectedLoan.income?.toLocaleString()} BDT
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedLoan.address && (
                      <div className="card bg-base-200 shadow-sm border border-base-300">
                        <div className="card-body p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-error" />
                            <span className="text-xs text-base-content/60 font-medium">
                              Address
                            </span>
                          </div>
                          <p className="font-semibold text-base-content">{selectedLoan.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-action mt-6">
              <button className="btn btn-primary w-full" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}

export default ApprovedLoans;