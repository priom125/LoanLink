import React from 'react'
import { NavLink, useLoaderData } from 'react-router';

function ViewDetailsPage() {

    const loan = useLoaderData();
    console.log(loan.emiPlans);
    const AvailableEMIPlans = loan.emiPlans || [];
    const EMIPlansArray = Array.isArray(AvailableEMIPlans)
        ? AvailableEMIPlans
        : (typeof AvailableEMIPlans === 'string' ? AvailableEMIPlans.split(',').map(s => s.trim()) : []);
  return (
        <div className="w-full max-w-full  py-12 my-10 px-4 sm:px-6 lg:px-8">
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                
                {/* Loan Image */}
                <div className="h-64 sm:h-96 overflow-hidden">
                    <img
                        src={loan.display_url}
                        alt={loan.loanTitle}
                        className="w-full h-full object-cover"
                       
                    />
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                    
                    {/* Title and Category */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 border-b border-gray-800 pb-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                            {loan.loanTitle}
                        </h1>
                        <span className={`mt-3 sm:mt-0 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider ${
                            loan.color === 'green'
                            ? 'bg-green-500/20 text-green-400'
                            : loan.color === 'yellow'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                            {loan.category}
                        </span>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        
                        {/* Max Limit */}
                        <div className="p-4 bg-gray-800 rounded-lg text-center">
                            <p className="text-sm text-gray-400 uppercase font-medium">Max Limit</p>
                            <p className={`text-2xl font-bold ${
                                loan.color === 'green'
                                ? 'text-green-400'
                                : loan.color === 'yellow'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}>{loan.maxLoanLimit}</p>
                        </div>

                        {/* Interest Rate */}
                        <div className="p-4 bg-gray-800 rounded-lg text-center">
                            <p className="text-sm text-gray-400 uppercase font-medium">Interest Rate</p>
                            <p className={`text-2xl font-bold ${
                                loan.color === 'green'
                                ? 'text-green-400'
                                : loan.color === 'yellow'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}>{loan.interestRate}</p>
                        </div>
                        
                        {/* Available EMI Plans */}
                        <div className="p-4 bg-gray-800 rounded-lg text-center col-span-2 md:col-span-1">
                            <p className="text-sm text-gray-400 uppercase font-medium">Available Repayment Plans</p>
                            <p className={`text-xl font-bold text-gray-200 mt-1`}>
                                {EMIPlansArray.length ? EMIPlansArray.join(', ') : 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Loan Overview
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {loan.description}
                        </p>
                    </section>

                    {/* Available EMI Plans (Detailed List) */}
                    <section className="mb-10 border-t border-gray-800 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Flexible EMI Plans
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {EMIPlansArray.map((plan, index) => (
                                <span key={index} className={`px-4 py-2 rounded-full font-medium ${
                                    loan.color === 'green'
                                    ? 'bg-green-500/20 text-green-400'
                                    : loan.color === 'yellow'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-red-500/20 text-red-400'
                                } border border-gray-700`}>
                                    {plan}
                                </span>
                            ))}
                        </div>
                    </section>
                    
                    {/* Apply Button */}
                    <div className="mt-8">
                        <NavLink
                            to={`/apply-loan/${loan._id}`}
                            onClick={() => onApplyClick(loan.loanTitle)}
                            className={`w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-xl font-bold rounded-lg shadow-xl text-gray-900 ${
                                loan.color === 'green'
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-400'
                                : loan.color === 'yellow'
                                ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-400'
                                : 'bg-red-600 hover:bg-red-700 focus:ring-red-400'
                            } transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Apply Now
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default ViewDetailsPage