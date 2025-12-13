import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'; // Import useState
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';

function AllLoanApplications() {
    const axiosInstance = useAxios();

    // 1. State for the current filter status (default is to show all)
    const [filterStatus, setFilterStatus] = useState('All'); 

    const { data: AllLoan = [], isLoading, isError } = useQuery({
        queryKey: ['AllLoan'],
        queryFn: async () => {
            const res = await axiosInstance.get("all-loan");
            return res.data;
        },
    });

    // 2. Filter the loans based on the selected status
    const filteredLoans = AllLoan.filter(loan => {
        if (filterStatus === 'All') {
            return true; // Show all loans
        }
        // Filter by the selected status (Pending, Approved, Rejected)
        return loan.status === filterStatus;
    });

    // Handle loading and error states for a better user experience
    if (isLoading) {
        return <div className="text-center py-8">Loading loan applications...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-red-600">Error fetching loan applications.</div>;
    }

    // Helper array for filter buttons
    const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

    return (
        <div className="p-4">
            
            {/* Filter Buttons/Tabs */}
            <div className="flex space-x-4 mb-6 justify-start">
                {statuses.map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        // Highlight the currently active filter button
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                            filterStatus === status 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        {status} 
                        {/* Optional: Show count for visual feedback (e.g., Pending (5)) */}
                        <span className="ml-1 text-sm font-normal">
                            ({AllLoan.filter(loan => status === 'All' ? true : loan.status === status).length})
                        </span>
                    </button>
                ))}
            </div>
            
            <div className="overflow-x-auto border rounded-lg shadow-lg">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Loan Id</th>
                            <th>User</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render the filtered loans */}
                        {filteredLoans.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No {filterStatus !== 'All' ? filterStatus : ''} loan applications found.
                                </td>
                            </tr>
                        ) : (
                            filteredLoans.map((loan) => (
                                <tr key={loan._id}>
                                    <td>
                                        Loan ID: {loan._id}
                                    </td>
                                    <td>
                                        <div>
                                            <span className="font-bold">Name: {loan.firstName} {loan.lastName}</span><br />
                                            <span className="font-bold">Email: {loan.userEmail}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{loan.category}</div>
                                    </td>
                                    <td>{loan.loanAmount}</td>
                                    <td>
                                        <span className={`badge badge-sm font-semibold ${
                                            loan.status === 'Approved' ? 'badge-success' : 
                                            loan.status === 'Rejected' ? 'badge-error' : 
                                            'badge-warning'
                                        }`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <NavLink to={`update-loan-applications/${loan._id}`} className="btn btn-info btn-sm">View</NavLink>
                                        {/* Add specific actions based on status here, e.g., Approve/Reject buttons if status is 'Pending' */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default AllLoanApplications;