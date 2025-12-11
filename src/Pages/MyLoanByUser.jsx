import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth/AuthProvider'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


function MyLoanByUser() {

const {user} = useContext(AuthContext);
const axiosInstance = useAxios();

const {data:myLoan = []} = useQuery({
    queryKey: ['my-loans', user?.email],
    queryFn: async () => {
        const res = await axiosInstance.get(`/my-loan?email=${user?.email}`);
        return res.data;
    },
});

console.log(myLoan);

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
            <button className="btn btn-primary btn-sm">View Details</button>
            <button className="btn btn-error btn-sm">Cancel</button>
            <button className="btn btn-success btn-sm">Pay</button>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
</div>
  )
}

export default MyLoanByUser