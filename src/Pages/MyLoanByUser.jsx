import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import {
  Eye,
  X,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Receipt,
  Loader2,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
} from "lucide-react";

function MyLoanByUser() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanToCancel, setLoanToCancel] = useState(null);
  const [receiptLoan, setReceiptLoan] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const {
    data: myLoans = [],
    refetch,
    isLoading: loansLoading,
  } = useQuery({
    queryKey: ["my-loans", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-loan?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`my-payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getPaymentByLoanId = (loanId) => {
    return payments.find((payment) => payment.loanID === loanId);
  };

  const handleCancel = async (id) => {
    setIsCanceling(true);
    try {
      const res = await axiosInstance.delete(`cancel-loan/${id}`);

      if (res.status === 200) {
        await refetch();
        setLoanToCancel(null);
      }
    } catch (error) {
      console.error("Error canceling loan:", error);
    } finally {
      setIsCanceling(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "badge-success";
      case "Pending":
        return "badge-warning";
      case "Rejected":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  if (loansLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading your loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Loan Applications</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Track and manage all your loan applications ({myLoans.length} total)
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Total Applications</p>
                <p className="text-2xl font-extrabold mt-1">{myLoans.length}</p>
              </div>
              <FileText className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-success to-success/80 text-success-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Approved</p>
                <p className="text-2xl font-extrabold mt-1">
                  {myLoans.filter((l) => l.status === "Approved").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-warning to-warning/80 text-warning-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Pending</p>
                <p className="text-2xl font-extrabold mt-1">
                  {myLoans.filter((l) => l.status === "Pending").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-base-content font-semibold">Loan ID</th>
                  <th className="text-base-content font-semibold">Loan Info</th>
                  <th className="text-base-content font-semibold">Amount</th>
                  <th className="text-base-content font-semibold">Fee Status</th>
                  <th className="text-base-content font-semibold">Status</th>
                  <th className="text-base-content font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myLoans.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-base-content/50">
                        <FileText className="w-12 h-12" />
                        <p className="text-lg font-medium">No loan applications yet</p>
                        <NavLink to="/apply-loan" className="btn btn-primary btn-sm mt-2">
                          Apply for a Loan
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                ) : (
                  myLoans.map((loan) => (
                    <tr key={loan._id} className="hover">
                      {/* Loan ID */}
                      <td>
                        <span className="font-mono text-xs text-base-content/70">
                          {loan._id.slice(-8)}
                        </span>
                      </td>

                      {/* Loan Info */}
                      <td>
                        <div className="font-semibold text-base-content">{loan.loanTitle}</div>
                        <div className="text-xs text-base-content/60">{loan.category}</div>
                      </td>

                      {/* Amount */}
                      <td>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-bold text-primary">{loan.loanAmount}</span>
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td>
                        {loan.paymentStatus === "Paid" ? (
                          <button
                            onClick={() => {
                              const payment = getPaymentByLoanId(loan._id);
                              if (payment) {
                                setReceiptLoan(payment);
                              }
                            }}
                            className="btn btn-xs btn-success gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Paid
                          </button>
                        ) : (
                          <NavLink to={`/dashboard/payment/${loan._id}`}>
                            <button className="btn btn-xs btn-warning gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Unpaid ($10)
                            </button>
                          </NavLink>
                        )}
                      </td>

                      {/* Application Status */}
                      <td>
                        <span className={`badge ${getStatusColor(loan.status)} badge-sm`}>
                          {loan.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2 justify-center flex-wrap">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedLoan(loan)}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {loan.status === "Pending" && (
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => setLoanToCancel(loan)}
                              title="Cancel application"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}

                          <NavLink to={`/dashboard/payment/${loan._id}`}>
                            <button
                              className="btn btn-sm btn-success"
                              title="Make payment"
                            >
                              <CreditCard className="w-4 h-4" />
                            </button>
                          </NavLink>
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

      {/* MODALS */}

      {/* 1. Loan Details Modal */}
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
                <h3 className="font-bold text-xl text-base-content">Application Details</h3>
                <p className="text-xs text-base-content/60">Loan ID: {selectedLoan._id.slice(-8)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <span className="text-xs text-base-content/60 font-medium">Contact</span>
                  </div>
                  <p className="font-semibold text-base-content">{selectedLoan.contactNumber}</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-success" />
                    <span className="text-xs text-base-content/60 font-medium">Category</span>
                  </div>
                  <p className="font-semibold text-base-content">{selectedLoan.category}</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-xs text-base-content/60 font-medium">Loan Amount</span>
                  </div>
                  <p className="font-bold text-primary text-lg">${selectedLoan.loanAmount}</p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-warning" />
                    <span className="text-xs text-base-content/60 font-medium">Status</span>
                  </div>
                  <span className={`badge ${getStatusColor(selectedLoan.status)}`}>
                    {selectedLoan.status}
                  </span>
                </div>
              </div>
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

      {/* 2. Cancellation Confirmation Modal */}
      {loanToCancel && (
        <div className="modal modal-open">
          <div className="modal-box border-2 border-error/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/10 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              <h3 className="font-bold text-xl text-error">Cancel Application?</h3>
            </div>

            <p className="text-base-content/70 mb-2">
              Are you sure you want to cancel this loan application? This action cannot be undone.
            </p>
            <p className="text-xs text-base-content/50 italic mb-4">
              Loan ID: {loanToCancel._id}
            </p>

            <div className="card bg-base-200 border border-base-300 mb-6">
              <div className="card-body p-4">
                <p className="text-sm">
                  <strong>Loan:</strong> {loanToCancel.loanTitle}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> ${loanToCancel.loanAmount}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> <span className="badge badge-warning badge-sm">{loanToCancel.status}</span>
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline hover:btn-ghost"
                disabled={isCanceling}
                onClick={() => setLoanToCancel(null)}
              >
                No, Keep It
              </button>
              <button
                className="btn btn-error"
                disabled={isCanceling}
                onClick={() => handleCancel(loanToCancel._id)}
              >
                {isCanceling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Canceling...
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    Yes, Cancel
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !isCanceling && setLoanToCancel(null)}></div>
        </div>
      )}

      {/* 3. Payment Receipt Modal */}
      {receiptLoan && (
        <div className="modal modal-open">
          <div className="modal-box border-2 border-success/20">
            <button
              onClick={() => setReceiptLoan(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-success/10 p-3 rounded-full">
                <Receipt className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-base-content">Payment Receipt</h3>
                <p className="text-xs text-base-content/60">Transaction Confirmation</p>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300 mb-6">
              <div className="card-body p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Transaction ID</span>
                  <span className="font-mono text-sm font-semibold text-base-content">
                    {receiptLoan.transactionID}
                  </span>
                </div>

                <div className="divider my-0"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Email</span>
                  <span className="text-sm font-medium text-base-content truncate max-w-[200px]">
                    {receiptLoan.customerEmail}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Amount</span>
                  <span className="text-lg font-bold text-success">$10.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Status</span>
                  <span className="badge badge-success">{receiptLoan.paymentStatus}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Date</span>
                  <span className="text-sm font-medium text-base-content">
                    {new Date(receiptLoan.paidAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button onClick={() => setReceiptLoan(null)} className="btn btn-neutral w-full">
              Close Receipt
            </button>
          </div>
          <div className="modal-backdrop" onClick={() => setReceiptLoan(null)}></div>
        </div>
      )}
    </div>
  );
}

export default MyLoanByUser;