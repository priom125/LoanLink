import React from 'react'
import { NavLink } from 'react-router'

function LoanCard({ loanCategories }) {
  const loan = loanCategories || {}

  return (
    <div className="bg-gray-900 border border-gray-800 shadow-2xl shadow-black/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-green-500/20 transform hover:scale-[1.01]">
      <div className="h-40 overflow-hidden">
        <img
          src={loan.display_url || '/placeholder.png'}
          alt={loan.loanTitle || 'Loan image'}
          className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {loan.loanTitle || 'Untitled Loan'}
        </h2>

        <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">
          {loan.description || ''}
        </p>

        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg mb-6">
          <span className="text-sm font-medium text-gray-400">
            Max Loan Limit: {loan.maxLoanLimit ?? 'N/A'}
          </span>
        </div>

        <NavLink to={`/loan-details/${loan._id}`}>
          <button className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-gray-900 bg-green-500 hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 active:bg-green-700">
            View Details
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default LoanCard