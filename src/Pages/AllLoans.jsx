import React from 'react'
import { useLoaderData } from 'react-router';
import LoanCard from '../Components/LoanCard';
import AllLoanPageCard from '../Components/AllLoanPageCard';

function AllLoans() {
  const loanCategories = useLoaderData();

  console.log(loanCategories);
  return (
 
   <section className="w-full min-h-screen my-20">
    <div className='py-12 px-4 sm:px-6 lg:px-8  max-w-full'>
      <h2 className="text-4xl font-extrabold text-base-content text-center mb-12">
        Explore Our Loan Categories
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-full px-10 mx-auto mb-20">
        {loanCategories.map((item, index) => (
          <AllLoanPageCard key={item.id ?? index} loanCategories={item} />
        ))}
      </div>
      </div>
    </section>
 
  )
}

export default AllLoans