import React, { useState } from "react";
import { NavLink } from "react-router";
import useAxios from "../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  X,
  Loader2,
  FileText,
  TrendingUp,
  Tag,
  Plus,
} from "lucide-react";

function ManageLoans() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanIdToDelete, setLoanIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: allLoan = [], isLoading, isError } = useQuery({
    queryKey: ["AllLoanCategory"],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loan-category");
      return res.data;
    },
  });

  const uniqueCategories = [...new Set(allLoan.map((loan) => loan.category))].sort();

  const filteredLoans = allLoan.filter((loan) => {
    const titleMatch = loan.loanTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch = selectedCategory
      ? loan.category === selectedCategory
      : true;

    return titleMatch && categoryMatch;
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
    onError: (error) => {
      console.error("Deletion failed:", error);
    },
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-base-content/70">Loading loan categories...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-error mx-auto" />
          <p className="text-error font-medium">Error loading loans. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Manage Loan Categories</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage and monitor all loan categories ({filteredLoans.length} of {allLoan.length})
          </p>
        </div>
        <NavLink to="/dashboard/add-loan" className="btn btn-primary gap-2 shadow-md">
          <Plus className="w-5 h-5" />
          Add New Loan
        </NavLink>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Total Loans</p>
                <p className="text-2xl font-extrabold mt-1">{allLoan.length}</p>
              </div>
              <FileText className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Categories</p>
                <p className="text-2xl font-extrabold mt-1">{uniqueCategories.length}</p>
              </div>
              <Tag className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-lg">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80 font-medium">Filtered Results</p>
                <p className="text-2xl font-extrabold mt-1">{filteredLoans.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search by loan title..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-64">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50 pointer-events-none" />
              <select
                className="select select-bordered w-full pl-10"
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
                  <th className="text-base-content font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length > 0 ? (
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
                        <div className="font-semibold text-base-content">
                          {loan.loanTitle}
                        </div>
                        {loan.description && (
                          <div className="text-xs text-base-content/60 truncate max-w-xs">
                            {loan.description}
                          </div>
                        )}
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

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2 justify-center">
                          <NavLink
                            to={`update-user-role/${loan._id}`}
                            className="btn btn-sm btn-primary hover:btn-primary/80 transition-all duration-200"
                            title="Update loan"
                          >
                            <Edit className="w-4 h-4" />
                          </NavLink>
                          <button
                            className="btn btn-sm btn-error hover:btn-error/80 transition-all duration-200"
                            onClick={() => handleOpenModal(loan._id)}
                            disabled={deleteMutation.isPending && loanIdToDelete === loan._id}
                            title="Delete loan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-base-content/50">
                        <Search className="w-12 h-12" />
                        <p className="text-lg font-medium">No loans found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deletion Confirmation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box border-2 border-error/20">
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              disabled={deleteMutation.isPending}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/10 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              <h3 className="font-bold text-xl text-error">Confirm Deletion</h3>
            </div>

            <p className="text-base-content/70 mb-2 leading-relaxed">
              Are you sure you want to delete this loan category? This action cannot be undone and
              will permanently remove all associated data.
            </p>

            {deleteMutation.isError && (
              <div className="alert alert-error mt-4">
                <AlertTriangle className="w-5 h-5" />
                <span>Error: Could not delete loan category. Please try again.</span>
              </div>
            )}

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
          <div className="modal-backdrop" onClick={() => !deleteMutation.isPending && handleCloseModal()}></div>
        </div>
      )}
    </div>
  );
}

export default ManageLoans;