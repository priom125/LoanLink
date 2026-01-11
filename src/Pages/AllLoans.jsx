import React, { useState, useMemo } from 'react'
import { useLoaderData, NavLink } from 'react-router';
import { Search, Filter, X, LayoutGrid, ArrowRight, DollarSign, Calendar, Percent } from 'lucide-react';

/**
 * AllLoanPageCard Component
 * Local implementation to resolve import errors.
 */
const AllLoanPageCard = ({ loanCategories }) => {
  const { _id, loanTitle, display_url, interestRate, category, description } = loanCategories;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 group hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
      <figure className="relative h-48 overflow-hidden">
        <img 
          src={display_url || "https://placehold.co/600x400?text=Loan+Category"} 
          alt={loanTitle} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <div className="badge badge-primary font-bold px-3 py-3 shadow-lg">
            {interestRate}% P.A.
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-white/90 text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </figure>
      
      <div className="card-body p-6 flex-grow">
        <h3 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors">
          {loanTitle}
        </h3>
        <p className="text-sm text-base-content/60 line-clamp-3 my-2">
          {description || "Access flexible financing solutions tailored specifically for your unique requirements and goals."}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mt-4 py-4 border-y border-base-200">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">Low Interest</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">Flexible Terms</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <NavLink 
            to={`/loan-details/${_id}`}
            className="btn btn-primary btn-sm md:btn-md gap-2 group/btn"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

/**
 * AllLoans Component
 * Displays a paginated, searchable, and filterable list of all loan categories.
 */
function AllLoans() {
  const loaderData = useLoaderData();
  const loanCategories = Array.isArray(loaderData) ? loaderData : [];
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extract unique categories for the filter dropdown
  const categories = useMemo(() => {
    return ["all", ...new Set(loanCategories.map(loan => loan.category).filter(Boolean))];
  }, [loanCategories]);

  // Logic for Search and Filtering
  const filteredItems = useMemo(() => {
    return loanCategories.filter((loan) => {
      const matchesSearch = 
        loan.loanTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedCategory === "all" || loan.category === selectedCategory;
      return matchesSearch && matchesFilter;
    });
  }, [loanCategories, searchTerm, selectedCategory]);

  // Reset pagination to page 1 whenever search or filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Calculate pagination based on FILTERED results
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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
      <div className='py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            Explore Our Loan Categories
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Find the perfect financial solution tailored to your needs. Search through our wide range of specialized loan products.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="card bg-base-100 shadow-xl border border-base-200 mb-12">
          <div className="card-body p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder="What kind of loan are you looking for?"
                  className="input input-bordered w-full pl-12 h-14 bg-base-200/30 focus:bg-base-100 transition-all text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="relative md:w-72">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 pointer-events-none" />
                <select
                  className="select select-bordered w-full pl-12 h-14 bg-base-200/30 text-lg"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== "all").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Grid */}
        {currentItems.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {currentItems.map((item, index) => (
              <AllLoanPageCard key={item._id ?? index} loanCategories={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-base-200 p-8 rounded-full mb-6">
              <Search className="w-16 h-16 opacity-20" />
            </div>
            <h3 className="text-2xl font-bold text-base-content">No results found</h3>
            <p className="text-base-content/60 mt-2 max-w-xs">
              We couldn't find any loans matching "{searchTerm}". Try broadening your search or choosing a different category.
            </p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}
              className="btn btn-primary btn-outline mt-6"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-6 mt-16">
            <div className="flex items-center gap-2 text-sm font-medium text-base-content/50 uppercase tracking-widest">
              <LayoutGrid className="w-4 h-4" />
              Showing {currentItems.length} of {filteredItems.length} results
            </div>
            
            <div className="join shadow-lg">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="join-item btn btn-md bg-base-100 hover:bg-base-200 disabled:bg-base-200"
              >
                Prev
              </button>

              <div className="join hidden sm:flex">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <button key={`ellipsis-${index}`} className="join-item btn btn-md no-animation btn-disabled bg-base-100">
                      ...
                    </button>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`join-item btn btn-md ${
                        currentPage === page
                          ? 'btn-primary'
                          : 'bg-base-100 hover:bg-base-200'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Mobile Page Indicator */}
              <button className="join-item btn btn-md sm:hidden bg-base-100 no-animation">
                Page {currentPage} of {totalPages}
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="join-item btn btn-md bg-base-100 hover:bg-base-200 disabled:bg-base-200"
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

export default AllLoans;