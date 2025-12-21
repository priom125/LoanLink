import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react"; // 1. Import useState
import useAxios from "../hooks/useAxios";
import { NavLink } from "react-router"; 


function AllLoan() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanIdToDelete, setLoanIdToDelete] = useState(null);


  const { data: AllLoanCategory = [], isLoading } = useQuery({
    queryKey: ["AllLoanCategory"],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loan-category");
      return res.data;
    },
  });


  const toggleHomeMutation = useMutation({
  mutationFn: async ({ id, showOnHome }) => {

    return await axiosInstance.patch(`/update-loan-category/${id}`, {
      showOnHome: !showOnHome 
    });
  },
  onSuccess: () => {

    queryClient.invalidateQueries(["AllLoanCategory"]);
  }
});


  const deleteMutation = useMutation({
    mutationFn: async (idToDelete) => {
      const res = await axiosInstance.delete(`delete-loan-category/${idToDelete}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllLoanCategory"] });
      setIsModalOpen(false);
      setLoanIdToDelete(null);
    },
  });

  const handleOpenModal = (id) => {
    setLoanIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (loanIdToDelete) deleteMutation.mutate(loanIdToDelete);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLoanIdToDelete(null);
  };

const handleToggleHome = (id, currentStatus) => {
  console.log("Toggle clicked for ID:", id, "Current Status:", currentStatus);
  toggleHomeMutation.mutate({ id, showOnHome: currentStatus });
};

  if (isLoading) return <p>Loading loan categories...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
             
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={loan.display_url} alt="Loan" />
                  </div>
                </div>
              </td>
              <td>{loan.loanTitle}</td>
              <td>{loan.interestRate}%</td>
              <td>{loan.category}</td>
              <td>{loan.createdByRole}</td>
              
           
             <td>
  <div className="form-control"> 
    <label className="label cursor-pointer">
      <input
        type="checkbox"
        className="toggle toggle-primary"
      
        checked={!!loan.showOnHome} 
        onChange={() => handleToggleHome(loan._id, loan.showOnHome)}
      
        disabled={toggleHomeMutation.isPending}
      />
    </label>
  </div>
</td>

              <td className="space-x-2">
                <NavLink
                  to={`/dashboard/all-loan/update-loan/${loan._id}`}
                  className="btn btn-success btn-sm"
                >
                  Update
                </NavLink>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleOpenModal(loan._id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Confirm Deletion</h3>
            <p className="py-4">Are you sure? This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-error" onClick={handleConfirmDelete}>
                {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllLoan;