import React, { useState } from 'react'
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

function ApprovedLoans() {
    const axiosInstance = useAxios();
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: approvedLoan = []} = useQuery({
        queryKey: ['approvedLoan'],
        queryFn: async () => {
            const res = await axiosInstance.get("approved-loan");
            return res.data;
        },
    });

    const handleViewClick = (loan) => {
        setSelectedLoan(loan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLoan(null);
    };

    console.log(approvedLoan);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
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
                        {approvedLoan.map((loan) => (
                            <tr key={loan._id}>
                                <td>
                                    Loan ID: {loan._id}
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Name: {loan.firstName}</span>
                                        <span className="font-bold">Email: {loan.userEmail}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">Amount: {loan.loanAmount} BDT</div>
                                </td>
                                <td>Date: {loan.submissionDate}</td>
                                <td className="space-x-2">
                                    <button 
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleViewClick(loan)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedLoan && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-2xl mb-4">Loan Details</h3>
                        
                        <div className="space-y-4">
                            {/* Loan ID */}
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500">Loan ID</p>
                                <p className="font-semibold text-lg">{selectedLoan._id}</p>
                            </div>

                            {/* User Information */}
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500 mb-2">User Information</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400">First Name</p>
                                        <p className="font-medium">{selectedLoan.firstName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Last Name</p>
                                        <p className="font-medium">{selectedLoan.lastName || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Email</p>
                                        <p className="font-medium">{selectedLoan.userEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Phone</p>
                                        <p className="font-medium">{selectedLoan.phone || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Details */}
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500 mb-2">Loan Information</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400">Loan Amount</p>
                                        <p className="font-bold text-xl text-success">{selectedLoan.loanAmount} BDT</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Loan Type</p>
                                        <p className="font-medium">{selectedLoan.loanType || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Submission Date</p>
                                        <p className="font-medium">{selectedLoan.submissionDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Status</p>
                                        <span className="badge badge-success">Approved</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            {selectedLoan.purpose && (
                                <div className="border-b pb-3">
                                    <p className="text-sm text-gray-500">Purpose</p>
                                    <p className="font-medium">{selectedLoan.purpose}</p>
                                </div>
                            )}

                            {selectedLoan.income && (
                                <div className="border-b pb-3">
                                    <p className="text-sm text-gray-500">Annual Income</p>
                                    <p className="font-medium">{selectedLoan.income} BDT</p>
                                </div>
                            )}

                            {selectedLoan.address && (
                                <div className="border-b pb-3">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{selectedLoan.address}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop bg-black bg-opacity-50" onClick={closeModal}></div>
                </div>
            )}
        </>
    )
}

export default ApprovedLoans