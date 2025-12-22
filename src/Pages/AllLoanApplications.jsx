import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import LoanDetailsModal from '../Components/LoanDetailsModal';


<LoanDetailsModal/>

function AllLoanApplications() {
    const axiosInstance = useAxios();


    const [filterStatus, setFilterStatus] = useState('All'); 
    

    const [selectedLoan, setSelectedLoan] = useState(null); 

    const { data: AllLoan = [], isLoading, isError } = useQuery({
        queryKey: ['AllLoan'],
        queryFn: async () => {
            const res = await axiosInstance.get("all-loan");
            return res.data;
        },
    });


    const filteredLoans = AllLoan.filter(loan => {
        if (filterStatus === 'All') {
            return true; // Show all loans
        }

        return loan.status === filterStatus;
    });

    const handleViewDetails = (loan) => {
        setSelectedLoan(loan);
    };

    const handleCloseModal = () => {
        setSelectedLoan(null);
    };



    if (isLoading) {
        return <div className="text-center py-8">Loading loan applications...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-red-600">Error fetching loan applications.</div>;
    }


    const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

    return (
        <div className="p-4">
            

            <div className="flex space-x-4 mb-6 justify-start">
                {statuses.map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
               
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                            filterStatus === status 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        {status} 
               
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
                                        Loan ID: {loan._id.substring(0, 8)}...
                                    </td>
                                    <td>
                                        <div>
                                            <span className="font-bold">Name: {loan.firstName} {loan.lastName}</span><br />
                                            <span className="text-sm text-gray-600">Email: {loan.userEmail}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{loan.category}</div>
                                    </td>
                                    <td>${loan.loanAmount}</td>
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
                                        {/* 6. Updated 'View' Button to open the modal */}
                                        <button 
                                            onClick={() => handleViewDetails(loan)} 
                                            className="btn btn-info btn-sm"
                                        >
                                            View
                                        </button>
                                        {/* Add specific actions based on status here, e.g., Approve/Reject buttons if status is 'Pending' */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* 7. Render the Modal component */}
            <LoanDetailsModal loan={selectedLoan} onClose={handleCloseModal} />

        </div>
    );
}

export default AllLoanApplications;