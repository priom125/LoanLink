import React from 'react';
import { NavLink } from 'react-router';
import { DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

function LoanCard({ loanCategories }) {
  const loan = loanCategories || {};

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Truncate description
  const truncateText = (text, maxLength = 80) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <article className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
      {/* Image Container - Fixed Height */}
      <figure className="relative h-48 overflow-hidden">
        <img
          src={loan.display_url || 'https://placehold.co/600x400/1a1a1a/ffffff?text=Loan+Image'}
          alt={loan.loanTitle || 'Loan image'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-300/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="badge badge-primary badge-lg shadow-lg font-semibold">
            Featured
          </span>
        </div>
      </figure>

      {/* Card Body - Flex Grow */}
      <div className="card-body p-5 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="card-title text-xl font-bold text-base-content line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {loan.loanTitle || 'Untitled Loan'}
        </h2>

        {/* Description */}
        <p className="text-sm text-base-content/70 leading-relaxed flex-grow mb-4 line-clamp-3">
          {truncateText(loan.description)}
        </p>

        {/* Loan Details Card */}
        <div className="bg-base-200 rounded-lg p-4 mb-4 border border-base-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <span className="text-xs font-medium text-base-content/60">
                Max Loan Amount
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-primary">
                {formatCurrency(loan.maxLoanLimit)}
              </span>
            </div>
          </div>

          {/* Additional Info Row */}
          {loan.interestRate && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-300">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xs font-medium text-base-content/60">
                  Interest Rate
                </span>
              </div>
              <span className="text-sm font-semibold text-secondary">
                {loan.interestRate}%
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="card-actions mt-auto">
          <NavLink to={`/loan-details/${loan._id}`} className="w-full">
            <button className="btn btn-primary w-full shadow-md hover:shadow-lg transition-all duration-300 group/btn">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default LoanCard;