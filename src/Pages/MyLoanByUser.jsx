import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

function MyLoanByUser() {
  const [selectedLoan, setSelectedLoan] = useState(null); // For General Details
  const [loanToCancel, setLoanToCancel] = useState(null); // For Cancel Confirmation
  const [receiptLoan, setReceiptLoan] = useState(null); // For Payment Receipt

  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const { data: myLoans = [], refetch } = useQuery({
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
      const res = await axiosInstance.get(`/my-payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(myLoans)
  const paymentData = payments;

  const getPaymentByLoanId = (loanId) => {
    return payments.find((payment) => payment.loanID === loanId);
  };

  // console.log(paymentData);

  const handleCancel = async (id) => {
    try {
      await axiosInstance.delete(`cancel-loan/${id}`);
      refetch();
    } catch (error) {
      console.error("Error canceling loan:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Loan Applications</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Loan ID</th>
              <th>Loan Info</th>

              <th>Fee Status</th>
              <th>Application Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myLoans.map((loan) => (
              <tr key={loan._id} className="hover">
                <td className="font-bold">{loan._id}</td>
                <td className="font-bold">{loan.loanTitle}</td>

                {/* Payment Status Column */}
                <td>
                  {loan.paymentStatus === "Paid" ? (
                    <button
                      onClick={() => {
                        const payment = getPaymentByLoanId(loan._id);
                        if (payment) {
                          setReceiptLoan(payment);
                        }
                      }}
                      className="btn btn-xs btn-outline btn-success normal-case"
                    >
                      ✅ Paid
                    </button>
                  ) : (
                    <NavLink to={`/dashboard/payment/${loan._id}`}>
                      <button className="btn btn-xs btn-warning normal-case">
                        Unpaid (Pay $10)
                      </button>
                    </NavLink>
                  )}
                </td>

                {/* Application Status */}
                <td>
                  <span
                    className={`badge badge-sm ${
                      loan.status === "approved"
                        ? "badge-success"
                        : loan.status === "pending"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="space-x-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    View Details
                  </button>
                  {loan.status === "Pending" && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => setLoanToCancel(loan)}
                    >
                      Cancel
                    </button>
                  )}

                  <NavLink to={`/dashboard/payment/${loan._id}`}>
                    <button className="btn btn-success">Pay</button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}

      {/* 1. General Details Modal */}
      {selectedLoan && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">
              Application Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Name:</strong> {selectedLoan.firstName}{" "}
                {selectedLoan.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLoan.userEmail}
              </p>
              <p>
                <strong>Contact:</strong> {selectedLoan.contactNumber}
              </p>
              <p>
                <strong>Category:</strong> {selectedLoan.category}
              </p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedLoan(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 2. Cancellation Modal */}
      {loanToCancel && (
        <dialog open className="modal">
          <div className="modal-box border-t-4 border-error">
            <h3 className="font-bold text-lg text-error">
              Cancel Application?
            </h3>
            <p className="py-4 text-gray-600">
              Are you sure? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setLoanToCancel(null)}
              >
                No, Keep it
              </button>
              <button
                className="btn btn-error text-white"
                onClick={async () => {
                  await handleCancel(loanToCancel._id);
                  setLoanToCancel(null);
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 3. Payment Receipt Modal (Triggered by Paid Badge) */}
      {receiptLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">
              Payment Receipts
            </h3>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              <div className="border rounded-lg p-4 text-sm space-y-1">
                <p>
                  <strong>Transaction ID:</strong> {receiptLoan.transactionID}
                </p>
                <p>
                  <strong>Email:</strong> {receiptLoan.customerEmail}
                </p>
                <p>
                  <strong>Amount:</strong> $10.00
                </p>
                <p>
                  <strong>Payment Status:</strong> {receiptLoan.paymentStatus}
                </p>
                <p>
                  <strong>Date:</strong> {receiptLoan.paidAt}
                </p>
              </div>
            </div>

            <button
              onClick={() => setReceiptLoan(null)}
              className="mt-6 w-full btn btn-neutral"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyLoanByUser;
