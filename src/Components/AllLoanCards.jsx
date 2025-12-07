import React from 'react'
import LoanCard from './LoanCard'

function AllLoanCards({ loanCategories }) {
  if (!loanCategories || loanCategories.length === 0) {
    return <div className="text-center py-8 text-gray-400">No loan categories found.</div>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      {loanCategories.map((item, index) => (
        <LoanCard key={item.id ?? index} loanCategories={item} />
      ))}
    </div>
  )
}

export default AllLoanCards










