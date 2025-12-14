import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
// NavLink is imported but not used in the final display logic, but kept for completeness.
// import { NavLink } from 'react-router'; 

// 1. New Modal Component (can be placed in a separate file, but kept here for simplicity)
const LoanDetailsModal = ({ loan, onClose }) => {
    // If no loan is passed or loan is null, don't render the modal
    if (!loan) return null;

    // A utility function to format the loan status badge style
    const getStatusClass = (status) => {
        if (status === 'Approved') return 'bg-green-500';
        if (status === 'Rejected') return 'bg-red-500';
        return 'bg-yellow-500'; // Pending
    };

    return (
        // The main modal container (fixed position, covering the screen)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50" onClick={onClose}>
            {/* Modal content area, stops click propagation from closing the modal accidentally */}
            <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Loan Application Details</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">Loan ID:</span> {loan._id}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                        <div>
                            <p className="font-semibold text-lg text-blue-600 mb-1">Applicant Information</p>
                            <p><strong>Name:</strong> {loan.firstName} {loan.lastName}</p>
                            <p><strong>Email:</strong> {loan.userEmail}</p>
                            {/* Assuming these fields exist in your loan object */}
                            <p><strong>Phone:</strong> {loan.phone || 'N/A'}</p> 
                            <p><strong>Address:</strong> {loan.address || 'N/A'}</p> 
                        </div>

                        <div>
                            <p className="font-semibold text-lg text-blue-600 mb-1">Loan Details</p>
                            <p><strong>Category:</strong> {loan.category}</p>
                            <p><strong>Amount:</strong> ${loan.loanAmount}</p>
                            <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                          
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                         <p className="font-semibold text-lg text-blue-600 mb-1">Current Status</p>
                         <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${getStatusClass(loan.status)} shadow-md`}>
                            {loan.status}
                         </span>
                         {/* Optional: Show reviewer notes if available */}
                         {loan.notes && <p className="mt-2 text-gray-600"><strong>Notes:</strong> {loan.notes}</p>}
                    </div>

                    {/* Add more fields here as needed (e.g., documents, submission date, etc.) */}
                </div>

                <div className="mt-6 text-right">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


function AllLoanApplications() {
    const axiosInstance = useAxios();

    // 1. State for the current filter status (default is to show all)
    const [filterStatus, setFilterStatus] = useState('All'); 
    
    // 2. State for the modal: stores the loan data to display in the modal
    const [selectedLoan, setSelectedLoan] = useState(null); 

    const { data: AllLoan = [], isLoading, isError } = useQuery({
        queryKey: ['AllLoan'],
        queryFn: async () => {
            const res = await axiosInstance.get("all-loan");
            return res.data;
        },
    });

    // 3. Filter the loans based on the selected status
    const filteredLoans = AllLoan.filter(loan => {
        if (filterStatus === 'All') {
            return true; // Show all loans
        }
        // Filter by the selected status (Pending, Approved, Rejected)
        return loan.status === filterStatus;
    });

    // 4. Handler for opening the modal
    const handleViewDetails = (loan) => {
        setSelectedLoan(loan);
    };

    // 5. Handler for closing the modal
    const handleCloseModal = () => {
        setSelectedLoan(null);
    };


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
                                        Loan ID: {loan._id.substring(0, 8)}... {/* Truncate for display */}
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