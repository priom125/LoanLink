import React, { useState } from "react";
import { NavLink } from 'react-router'; // Changed to react-router-dom for NavLink
import useAxios from "../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function ManageLoans() {
    const axiosInstance = useAxios();
    // 1. Missing Hooks/State Variables added here
    const queryClient = useQueryClient(); // <-- ADDED: For invalidating queries
    const [isModalOpen, setIsModalOpen] = useState(false); // <-- ADDED: For modal control
    const [loanIdToDelete, setLoanIdToDelete] = useState(null); // <-- ADDED: For storing ID to delete

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // 1. Fetching Logic (useQuery)
    const { data: allLoan = [], isLoading, isError } = useQuery({
        // IMPORTANT: The queryKey used for fetching should match the one used for invalidation
        queryKey: ["AllLoanCategory"], // Changed key to match invalidation key in mutation
        queryFn: async () => {
            const res = await axiosInstance.get("all-loan-category");
            return res.data;
        },
    });

    const uniqueCategories = [
        ...new Set(allLoan.map((loan) => loan.category)),
    ].sort();


    const filteredLoans = allLoan.filter((loan) => {
        const titleMatch = loan.loanTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const categoryMatch = selectedCategory
            ? loan.category === selectedCategory
            : true;

        return titleMatch && categoryMatch;
    });

    // 2. Deletion Logic (useMutation)
    const deleteMutation = useMutation({
        mutationFn: async (idToDelete) => {
            const res = await axiosInstance.delete(`delete-loan-category/${idToDelete}`);
            return res.data;
        },
        onSuccess: () => {
            // Invalidate the list to re-fetch and update the UI
            queryClient.invalidateQueries({ queryKey: ["AllLoanCategory"] }); 
            // Close modal on success
            setIsModalOpen(false); 
            setLoanIdToDelete(null);
            console.log("Loan category deleted successfully!"); // Placeholder for a toast notification
        },
        onError: (error) => {
            console.error("Deletion failed:", error); // Placeholder for an error toast
            // The modal will remain open so the user can see the error or try again
        }
    });

  
    const handleOpenModal = (id) => {
        setLoanIdToDelete(id); 
        setIsModalOpen(true);  
    };

   
    const handleConfirmDelete = () => {
        if (loanIdToDelete) {
            deleteMutation.mutate(loanIdToDelete);
        }
    };
    
   
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setLoanIdToDelete(null); 
    };

    if (isLoading) {
        return <p className="text-center py-8">Loading loan categories...</p>;
    }

    if (isError) {
        return <p className="text-center py-8 text-error">Error loading loans.</p>;
    }

    return (
        <div className="overflow-x-auto">

            <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-base-200 rounded-lg shadow-md">
                
                <input
                    type="text"
                    placeholder="Search by Title..."
                    className="input input-bordered w-full sm:w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                

                <select
                    className="select select-bordered w-full sm:w-1/2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            

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
                    {filteredLoans.length > 0 ? (
                        filteredLoans.map((loan) => (
                            <tr key={loan._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={loan.display_url}
                                                    alt="Loan Display"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{loan.loanTitle}</td>
                                <td>
                                    <div className="font-bold">{loan.interestRate}%</div>
                                </td>
                                <td>{loan.category}</td>
                                <td className="space-x-2">
                                    <NavLink
                                        // Changed the route for updating a loan category
                                        to={`update-user-role/${loan._id}`} 
                                        className="btn btn-success btn-sm"
                                    >
                                        Update
                                    </NavLink>
                                    <button 
                                        className="btn btn-error btn-sm" 
                                        onClick={() => handleOpenModal(loan._id)}
                                        // Disable delete button if a deletion is already pending
                                        disabled={deleteMutation.isPending && loanIdToDelete === loan._id}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No loans found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {/* Deletion Confirmation Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-red-600">Confirm Deletion</h3>
                        <p className="py-4">
                            Are you sure you want to delete this loan category? This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button 
                                className="btn" 
                                onClick={handleCloseModal}
                                disabled={deleteMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-error" 
                                onClick={handleConfirmDelete}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                        {deleteMutation.isError && (
                            <p className="text-red-500 mt-4">Error: Could not delete loan category. Please try again.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageLoans;