import React, { useState } from 'react'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

function PendingLoan() {


  const [selectedLoan, setSelectedLoan] = useState(null);

  const axiosInstance = useAxios();

const {data:pendingLoan = [],refetch} = useQuery({
    queryKey: ['pendingLoan', ],
    queryFn: async () => {
        const res = await axiosInstance.get("pending-loan");
        return res.data;
    },
});

// console.log(pendingLoan);


const handleApprove = async (id) => {
  try {
    await axiosInstance.patch(`update-loan/${id}`, {
      status: "Approved",
    });

    refetch(); // 🔥 Auto refresh data
  } catch (error) {
    console.error(
      "Error approving loan:",
      error.response?.data || error.message
    );
  }
};





const handleReject = async (id) => {
try {
    await axiosInstance.patch(`update-loan/${id}`, {
      status: "Rejected",
    });

    refetch(); // 🔥 Auto refresh data
  } catch (error) {
    console.error(
      "Error approving loan:",
      error.response?.data || error.message
    );
  }
}

  return (
        <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>User Info</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {pendingLoan.map((loan) => (

            <tr key={loan._id}>
              <td>
               Laon ID : {loan._id}
              </td>
              <td>
                <div className="flex flex-col">
                  <span className="font-bold">Name: {loan.firstName}</span>
                  <span className="font-bold">Email: {loan.userEmail}</span>
                  </div>
              </td>
              <td>
                <div className="font-bold">Amount : {loan.loanAmount} BDT</div>
              </td>

              <td>Date : {loan.submissionDate}</td>
              <td className="space-x-2">
                <button className="btn btn-success btn-sm" onClick={() => handleApprove(loan._id)}>Approve</button>
                <button className="btn btn-error btn-sm" onClick={() => handleReject(loan._id)}>Reject</button>
                <button className="btn  btn-sm"  onClick={() => setSelectedLoan(loan)}>View</button>
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

      </table>
    </div>
  )
}

export default PendingLoan