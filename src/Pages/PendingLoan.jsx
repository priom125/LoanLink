import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  CheckCircle,
  XCircle,
  X,
  Loader2,
  AlertTriangle,
  Clock,
  User,
  Mail,
  DollarSign,
  Calendar,
  FileText,
  Phone,
} from "lucide-react";

function PendingLoan() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const axiosInstance = useAxios();

  const {
    data: pendingLoan = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingLoan"],
    queryFn: async () => {
      const res = await axiosInstance.get("pending-loan");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    setProcessingId(id);
    setActionType("approve");
    try {
      await axiosInstance.patch(`update-loan/${id}`, {
        status: "Approved",
      });
      await refetch();
    } catch (error) {
      console.error("Error approving loan:", error.response?.data || error.message);
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    setActionType("reject");
    try {
      await axiosInstance.patch(`update-loan/${id}`, {
        status: "Rejected",
      });
      await refetch();
    } catch (error) {
      console.error("Error rejecting loan:", error.response?.data || error.message);
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading pending loans...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-error mx-auto" />
          <p className="text-error font-medium">Error loading pending loans. Please try again.</p>
        </div>
      </div>
    );
  }

  console.log(pendingLoan[0].loanAmount);

  // Calculate total amount of pending loans
const totalLoanAmount = pendingLoan.reduce(
  (sum, item) => sum + Number(item.loanAmount || 0),
  0
);

console.log("Total Loan Amount:", totalLoanAmount);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Pending Loan Applications</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Review and process pending loan requests ({pendingLoan.length} pending)
          </p>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-warning to-warning/80 text-warning-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Pending Review</p>
                <p className="text-2xl font-extrabold mt-1">{pendingLoan.length}</p>
              </div>
              <Clock className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-success to-success/80 text-success-content shadow-lg">
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

        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Requires Action</p>
                <p className="text-2xl font-extrabold mt-1">{pendingLoan.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-60" />
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
                {pendingLoan.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-base-content/50">
                        <CheckCircle className="w-12 h-12" />
                        <p className="text-lg font-medium">No pending loans</p>
                        <p className="text-sm">All applications have been processed</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pendingLoan.map((loan) => (
                    <tr key={loan._id} className="hover">
                      {/* Loan ID */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-mono text-xs text-base-content/70">
                            {loan._id.slice(-8)}
                          </span>
                        </div>
                      </td>

                      {/* User Info */}
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-secondary" />
                            <span className="font-semibold text-base-content">
                              {loan.firstName} {loan.lastName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-base-content/50" />
                            <span className="text-xs text-base-content/70">{loan.userEmail}</span>
                          </div>
                          {loan.contactNumber && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-base-content/50" />
                              <span className="text-xs text-base-content/70">{loan.contactNumber}</span>
                            </div>
                          )}
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
                        <div className="flex gap-2 justify-center flex-wrap">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleApprove(loan._id)}
                            disabled={processingId === loan._id}
                            title="Approve loan"
                          >
                            {processingId === loan._id && actionType === "approve" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleReject(loan._id)}
                            disabled={processingId === loan._id}
                            title="Reject loan"
                          >
                            {processingId === loan._id && actionType === "reject" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedLoan(loan)}
                            disabled={processingId === loan._id}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
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

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl border-2 border-primary/20">
            <button
              onClick={() => setSelectedLoan(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-base-content">Loan Application Details</h3>
                <p className="text-xs text-base-content/60">
                  ID: {selectedLoan._id.slice(-8)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Applicant Name */}
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-base-content/60 font-medium">Full Name</span>
                  </div>
                  <p className="font-semibold text-base-content">
                    {selectedLoan.firstName} {selectedLoan.lastName}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-xs text-base-content/60 font-medium">Email Address</span>
                  </div>
                  <p className="font-semibold text-base-content truncate">
                    {selectedLoan.userEmail}
                  </p>
                </div>
              </div>

              {/* Phone */}
              {selectedLoan.contactNumber && (
                <div className="card bg-base-200 shadow-sm border border-base-300">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-xs text-base-content/60 font-medium">Contact Number</span>
                    </div>
                    <p className="font-semibold text-base-content">
                      {selectedLoan.contactNumber}
                    </p>
                  </div>
                </div>
              )}

              {/* Loan Amount */}
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-xs text-base-content/60 font-medium">Loan Amount</span>
                  </div>
                  <p className="font-bold text-success text-lg">
                    {selectedLoan.loanAmount?.toLocaleString()} BDT
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-xs text-base-content/60 font-medium">Status</span>
                  </div>
                  <span className="badge badge-warning">{selectedLoan.status}</span>
                </div>
              </div>

              {/* Submission Date */}
              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-info" />
                    <span className="text-xs text-base-content/60 font-medium">Submission Date</span>
                  </div>
                  <p className="font-semibold text-base-content">
                    {selectedLoan.submissionDate}
                  </p>
                </div>
              </div>

              {/* Category */}
              {selectedLoan.category && (
                <div className="card bg-base-200 shadow-sm border border-base-300">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-xs text-base-content/60 font-medium">Category</span>
                    </div>
                    <p className="font-semibold text-base-content">{selectedLoan.category}</p>
                  </div>
                </div>
              )}

              {/* Loan Title */}
              {selectedLoan.loanTitle && (
                <div className="card bg-base-200 shadow-sm border border-base-300">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-base-content/60 font-medium">Loan Type</span>
                    </div>
                    <p className="font-semibold text-base-content">{selectedLoan.loanTitle}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                className="btn btn-success flex-1"
                onClick={() => {
                  handleApprove(selectedLoan._id);
                  setSelectedLoan(null);
                }}
                disabled={processingId === selectedLoan._id}
              >
                <CheckCircle className="w-5 h-5" />
                Approve
              </button>
              <button
                className="btn btn-error flex-1"
                onClick={() => {
                  handleReject(selectedLoan._id);
                  setSelectedLoan(null);
                }}
                disabled={processingId === selectedLoan._id}
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline hover:btn-primary w-full"
                onClick={() => setSelectedLoan(null)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedLoan(null)}></div>
        </div>
      )}
    </div>
  );
}

export default PendingLoan;