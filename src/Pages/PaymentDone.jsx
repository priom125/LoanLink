import React from 'react'
import { Link, useSearchParams } from 'react-router';

function PaymentDone() {

    const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  return (
   <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        
        {/* Animated Checkmark Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <svg 
              className="w-16 h-16 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your loan application fee has been processed successfully.
        </p>

        {/* Transaction Box */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Amount Paid:</span>
            <span className="text-sm font-bold text-gray-900">$10.00</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Session ID:</span>
            <span className="text-[10px] font-mono text-gray-400 break-all">
              {sessionId || "N/A"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            to="/dashboard/my-loans" 
            className="block w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition duration-200 shadow-md"
          >
            View My Applications
          </Link>
          <Link 
            to="/" 
            className="block w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PaymentDone