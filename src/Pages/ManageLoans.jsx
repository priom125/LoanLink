import React from 'react'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

function ManageLoans() {

  
const axiosInstance = useAxios();

const {data:allLoan = []} = useQuery({
    queryKey: ['all-loans', ],
    queryFn: async () => {
        const res = await axiosInstance.get("all-loan-category");
        return res.data;
    },
});
  return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Image</th>
        <th>Title</th>
        <th>Interest</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {allLoan.map((loan) => (
        <tr key={loan._id}>
           <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={loan.display_url}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
          <td>{loan.loanTitle}</td>
          <td>
            <div className="font-bold">{loan.interestRate}</div>
           
          </td>

          <td>
            {loan.category}
          </td>
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

export default ManageLoans