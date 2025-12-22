import React, { useState, useMemo } from 'react'
import { useLoaderData } from 'react-router';
import AllLoanPageCard from '../Components/AllLoanPageCard';

function AllLoans() {
  const loanCategories = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(loanCategories.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return loanCategories.slice(startIndex, endIndex);
  }, [loanCategories, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className="w-full min-h-screen my-20">
      <div className='py-12 px-4 sm:px-6 lg:px-8 max-w-full'>
        <h2 className="text-4xl font-extrabold text-base-content text-center mb-12">
          Explore Our Loan Categories
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-full px-10 mx-auto mb-8">
          {currentItems.map((item, index) => (
            <AllLoanPageCard key={item.id ?? index} loanCategories={item} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="text-sm text-base-content/70">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, loanCategories.length)} of {loanCategories.length} loan categories
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-base-content/50">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-primary-content border-primary font-semibold'
                          : 'border-base-300 bg-base-100 text-base-content hover:bg-base-200'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AllLoans