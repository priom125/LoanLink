import React from 'react'
import HeroSection from '../Components/HeroSection'
import AllLoanCards from '../Components/AllLoanCards'
import { useLoaderData } from 'react-router';
import HowItsWorksSection from '../Components/HowItsWorksSection';
import CustomerFeedbackCarousel from '../Components/CustomerFeedbackCarousel';
import TrustIndecatorSection from '../Components/TrustIndecatorSection';
import FAQSection from '../Components/FAQSection';

function Home() {

  const loanCategories = useLoaderData();
  // console.log(loanCategories);
  return (
    <div className="bg-gray-950 min-h-screen pt-8">
      <HeroSection/>
      <AllLoanCards loanCategories={loanCategories}/>
      <HowItsWorksSection/>
      <TrustIndecatorSection/>
      <CustomerFeedbackCarousel/>
      <FAQSection/>

    </div>
  )
}

export default Home