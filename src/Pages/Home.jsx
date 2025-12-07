import React from 'react'
import HeroSection from '../Components/HeroSection'
import AllLoanCards from '../Components/AllLoanCards'
import { useLoaderData } from 'react-router';

function Home() {

  const loanCategories = useLoaderData();
  // console.log(loanCategories);
  return (
    <div>
      <HeroSection/>
      <AllLoanCards loanCategories={loanCategories}/>
    </div>
  )
}

export default Home