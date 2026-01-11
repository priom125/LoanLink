import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { NavLink } from "react-router";
import { Edit, Trash2, Home, X, AlertTriangle, Loader2, Search, Filter } from "lucide-react";

function AllLoan() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanIdToDelete, setLoanIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

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
        showOnHome: !showOnHome,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["AllLoanCategory"]);
    },
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
    toggleHomeMutation.mutate({ id, showOnHome: currentStatus });
  };

  // Filter and search logic
  const filteredLoans = AllLoanCategory.filter((loan) => {
    const matchesSearch =
      loan.loanTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || loan.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  // Get unique categories for filter
  const categories = ["all", ...new Set(AllLoanCategory.map((loan) => loan.category))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading loan categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">All Loan Categories</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage and monitor all loan categories ({filteredLoans.length} total)
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search by title or category..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <select
                className="select select-bordered w-full pl-10"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-base-content font-semibold">Image</th>
                  <th className="text-base-content font-semibold">Title</th>
                  <th className="text-base-content font-semibold">Interest Rate</th>
                  <th className="text-base-content font-semibold">Category</th>
                  <th className="text-base-content font-semibold">Created By</th>
                  <th className="text-base-content font-semibold text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Home className="w-4 h-4" />
                      <span>Show on Home</span>
                    </div>
                  </th>
                  <th className="text-base-content font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-base-content/50">
                        <Search className="w-12 h-12" />
                        <p className="text-lg font-medium">No loans found</p>
                        <p className="text-sm">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan._id} className="hover">
                      {/* Image */}
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-14 w-14 border-2 border-base-300">
                            <img
                              src={loan.display_url}
                              alt={loan.loanTitle}
                              onError={(e) => {
                                e.target.src = "https://placehold.co/100x100/1a1a1a/ffffff?text=Loan";
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Title */}
                      <td>
                        <div className="font-semibold text-base-content">{loan.loanTitle}</div>
                      </td>

                      {/* Interest Rate */}
                      <td>
                        <span className="badge badge-primary badge-lg font-semibold">
                          {loan.interestRate}%
                        </span>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="badge badge-outline badge-lg">
                          {loan.category}
                        </span>
                      </td>

                      {/* Created By */}
                      <td>
                        <span className="text-sm text-base-content/70 capitalize">
                          {loan.createdByRole}
                        </span>
                      </td>

                      {/* Toggle Home */}
                      <td>
                        <div className="flex justify-center">
                          <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                              <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={!!loan.showOnHome}
                                onChange={() => handleToggleHome(loan._id, loan.showOnHome)}
                                disabled={toggleHomeMutation.isPending}
                              />
                            </label>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2 justify-center">
                          <NavLink
                            to={`/dashboard/all-loan/update-loan/${loan._id}`}
                            className="btn btn-sm btn-primary hover:btn-primary/80 transition-all duration-200"
                            title="Update loan"
                          >
                            <Edit className="w-4 h-4" />
                          </NavLink>
                          <button
                            className="btn btn-sm btn-error hover:btn-error/80 transition-all duration-200"
                            onClick={() => handleOpenModal(loan._id)}
                            disabled={deleteMutation.isPending}
                            title="Delete loan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box border-2 border-error/20">
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/10 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              <h3 className="font-bold text-xl text-error">Confirm Deletion</h3>
            </div>

            <p className="text-base-content/70 mb-6 leading-relaxed">
              Are you sure you want to delete this loan category? This action cannot be undone and
              will permanently remove all associated data.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-outline hover:btn-ghost"
                onClick={handleCloseModal}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </button>
              <button
                className="btn btn-error hover:btn-error/80"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCloseModal}></div>
        </div>
      )}
    </div>
  );
}

export default AllLoan;