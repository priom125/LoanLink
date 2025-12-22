import React from 'react';
import { NavLink } from 'react-router';
import { TrendingUp, Percent, DollarSign, Tag } from 'lucide-react';

function AllLoanPageCard({ loanCategories }) {
  const loan = loanCategories || {};



  return (
    <div className="bg-gray-900 border border-gray-800 shadow-2xl shadow-black/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-green-500/20 transform hover:scale-[1.02] hover:-translate-y-1">
      {/* Loan Image */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={loan.display_url || '/placeholder.png'}
          alt={loan.loanTitle || 'Loan image'}
          className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
        />
        {/* Category Badge */}
        {loan.loanCategory && (
          <div className="absolute top-3 right-3 bg-green-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {loan.category}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Loan Title */}
        <h2 className="text-2xl font-bold text-white mb-3 line-clamp-1">
          {loan.loanTitle || 'Untitled Loan'}
        </h2>

        {/* Loan Details Grid */}
        <div className="space-y-3 mb-6">
          {/* Loan Category */}
          {loan.category && (
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">Category</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {loan.category}
              </span>
            </div>
          )}

          {/* Interest Rate */}
          {loan.interestRate !== undefined && loan.interest !== null && (
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400">
                <Percent className="w-4 h-4" />
                <span className="text-sm font-medium">Interest Rate</span>
              </div>
              <span className="text-sm font-semibold text-green-400">
                {loan.interestRate}%
              </span>
            </div>
          )}

          {/* Max Loan Limit */}
          {loan.maxLoanLimit && (
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Max Loan</span>
              </div>
              <span className="text-sm font-semibold text-white">
                ${loan.maxLoanLimit.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <NavLink to={`/loan-details/${loan._id}`}>
          <button className="w-full group cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-gray-900 bg-green-500 hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 active:bg-green-700">
            View Details
            <TrendingUp className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default AllLoanPageCard;