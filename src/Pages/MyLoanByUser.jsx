import React from 'react'
import { useLoaderData } from 'react-router'

function MyLoanByUser() {

  const myLoan = useLoaderData();
  console.log(myLoan);
  return (
    <div>MyLoanByUser</div>
  )
}

export default MyLoanByUser