import React from "react";
import LoanCard from "./LoanCard";

function AllLoanCards({ loanCategories }) {
  if (!loanCategories || loanCategories.length === 0) {
    return (
      <div className="text-center py-8 text-base-content">
        No loan categories found.
      </div>
    );
  }

   const ShowHome = loanCategories.filter(
  (item) => item.showOnHome === true
);
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-base-content text-center mb-12">
        Explore Our Loan Categories
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {ShowHome.map((item, index) => (
          <LoanCard key={item.id ?? index} loanCategories={item} />
        ))}
      </div>
    </section>
  );
}

export default AllLoanCards;
