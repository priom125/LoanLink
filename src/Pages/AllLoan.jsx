import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react"; // 1. Import useState
import useAxios from "../hooks/useAxios";
import { NavLink } from "react-router"; 
// Assuming you have a Modal component or structure available

function AllLoan() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  // --- STATE FOR MODAL MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanIdToDelete, setLoanIdToDelete] = useState(null);
  
  // 1. Data Fetching
  const { 
    data: AllLoanCategory = [], 
    isLoading, 
  } = useQuery({
    queryKey: ["AllLoanCategory"],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loan-category");
      return res.data;
    },
  });

  // 2. Deletion Logic (useMutation)
  const deleteMutation = useMutation({
    mutationFn: async (idToDelete) => {
      const res = await axiosInstance.delete(`delete-loan-category/${idToDelete}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllLoanCategory"] });
      // Close modal on success
      setIsModalOpen(false); 
      setLoanIdToDelete(null);
      // You can add a success toast here
    },
    onError: (error) => {
        console.error("Deletion failed:", error);
        // You can add an error toast here
    }
  });

  // 3. Handler to OPEN the modal
  const handleOpenModal = (id) => {
    setLoanIdToDelete(id); // Store the ID of the loan to be deleted
    setIsModalOpen(true);  // Open the modal
  };

  // 4. Handler for CONFIRMING deletion (called inside the modal)
  const handleConfirmDelete = () => {
    if (loanIdToDelete) {
        deleteMutation.mutate(loanIdToDelete);
    }
  };
  
  // 5. Handler to CLOSE the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLoanIdToDelete(null); // Clear the ID
  };

  if (isLoading) {
    return <p>Loading loan categories...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Interest</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Show on Home</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {AllLoanCategory.map((loan) => (
            <tr key={loan._id}>
              {/* ... (Your existing table columns) ... */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={loan.display_url}
                        alt="Loan category image"
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
              <td>{loan.createdByRole}</td>
              <td>{loan.showOnHome ? "Yes" : "No"}</td>

              <td className="space-x-2">
                <NavLink
                  to={`/dashboard/all-loan/update-loan/${loan._id}`}
                  className="btn btn-success btn-sm"
                >
                  Update
                </NavLink>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleOpenModal(loan._id)} // Open modal instead of deleting immediately
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- CONFIRMATION MODAL (Using DaisyUI/Tailwind structure) --- */}
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
          </div>
        </div>
      )}
      {/* --- END MODAL --- */}

    </div>
  );
}

export default AllLoan;