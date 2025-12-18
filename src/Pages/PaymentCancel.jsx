import React from 'react';
import { Link } from 'react-router';

function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        
        {/* Warning Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-amber-100 p-4">
            <svg 
              className="w-16 h-16 text-amber-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          The transaction was not completed. No funds have been deducted from your account. You can try again whenever you're ready.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.history.back()} 
            className="block w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition duration-200 shadow-md"
          >
            Try Again
          </button>
          
          <Link 
            to="/dashboard" 
            className="block w-full bg-white text-gray-700 border border-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-50 transition duration-200"
          >
            Return to Dashboard
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Need help? <a href="mailto:support@example.com" className="text-blue-500 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}

export default PaymentCancel;