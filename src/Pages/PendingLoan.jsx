import React from 'react'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

function PendingLoan() {
  const axiosInstance = useAxios();

const {data:pendingLoan = []} = useQuery({
    queryKey: ['pendingLoan', ],
    queryFn: async () => {
        const res = await axiosInstance.get("pending-loan");
        return res.data;
    },
});

console.log(pendingLoan);

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
                <button className="btn btn-success btn-sm">Update</button>
                <button className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PendingLoan