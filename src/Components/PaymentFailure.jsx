// PaymentFailure.jsx
import React from 'react';


const PaymentFailure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        
        <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
        <p className="text-gray-700 mt-2">
          Unfortunately, your payment could not be processed. Please try again later or contact support if the issue persists.
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => window.location.href = '/retry'} // Adjust the redirect as needed
          >
            Retry Payment
          </button>
          <button
            className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => window.location.href = '/support'} // Adjust the redirect as needed
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
