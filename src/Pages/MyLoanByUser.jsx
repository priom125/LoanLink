import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthProvider'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


function MyLoanByUser() {

   const [selectedLoan, setSelectedLoan] = useState(null);
   const [loanToCancel, setLoanToCancel] = useState(null);


const {user} = useContext(AuthContext);
const axiosInstance = useAxios();

const {data:myLoan = [],refetch} = useQuery({
    queryKey: ['my-loans', user?.email],
    queryFn: async () => {
        const res = await axiosInstance.get(`/my-loan?email=${user?.email}`);
        return res.data;
    },
});

console.log(myLoan);

const handleCancel = async (id) => {
  try {
    await axiosInstance.delete(`cancel-loan/${id}`);
    refetch();
  } catch (error) {
    console.error(
      "Error canceling loan:",
      error.response?.data || error.message
    );
  }
};


  return (
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Loan Id</th>
        <th>Loan Info</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {myLoan.map((loan) => (
        <tr key={loan._id}>
          <td>{loan._id}</td>
          <td>
            <div className="font-bold">{loan.loanTitle}</div>
            <div className="text-sm opacity-50">{loan.loanCategory}</div>
          </td>
          <td>${loan.loanAmount}</td>
          <td>
            {loan.status === 'approved' ? (
              <span className="badge badge-success">Approved</span>
            ) : (
              <span className="badge badge-warning">Pending</span>
            )}
          </td>
          <td className="space-x-2">
            <button className="btn btn-primary btn-sm" onClick={() => setSelectedLoan(loan)}>View Details</button>
      {
  loan.status === 'Pending' && (
    <button
      className="btn btn-error btn-sm"
      onClick={() => setLoanToCancel(loan)}
    >
      Cancel
    </button>
  )
}

            <button className="btn btn-success btn-sm">Pay</button>
          </td>
        </tr>
      ))}

    </tbody>
     {selectedLoan && (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-2">Loan Details</h3>

      <p><strong>Name:</strong> {selectedLoan.firstName}</p>
      <p><strong>Email:</strong> {selectedLoan.userEmail}</p>
      <p><strong>Amount:</strong> {selectedLoan.loanAmount} BDT</p>
      <p><strong>Status:</strong> {selectedLoan.status}</p>
      <p><strong>Contact Number:</strong> {selectedLoan.contactNumber}</p>
      <p><strong>Loan Title:</strong> {selectedLoan.loanTitle}</p>
      <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}</p>


      <div className="modal-action">
        <button
          className="btn"
          onClick={() => setSelectedLoan(null)}
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
)}

{loanToCancel && (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg text-error mb-2">
        Confirm Cancellation
      </h3>

      <p className="mb-4">
        Are you sure you want to cancel this loan?
      </p>

      <div className="bg-base-200 p-3 rounded mb-4">
        <p><strong>Loan:</strong> {loanToCancel.loanTitle}</p>
        <p><strong>Amount:</strong> {loanToCancel.loanAmount} BDT</p>
      </div>

      <div className="modal-action">
        <button
          className="btn"
          onClick={() => setLoanToCancel(null)}
        >
          No
        </button>

        <button
          className="btn btn-error"
          onClick={async () => {
            await handleCancel(loanToCancel._id);
            setLoanToCancel(null);
          }}
        >
          Yes, Cancel Loan
        </button>
      </div>
    </div>
  </dialog>
)}


  </table>
</div>
  )
}

export default MyLoanByUser