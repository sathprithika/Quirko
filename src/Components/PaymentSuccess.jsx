// PaymentSuccess.jsx
import React from 'react';


const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        
        <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-gray-700 mt-2">
          Your payment has been processed successfully. Thank you for your purchase!
        </p>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => window.location.href = '/dashboard'} // Adjust the redirect as needed
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
