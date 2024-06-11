import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: null,
    cvv: '',
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      expiryDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    let valid = true;
    const newErrors = {};

    if (formData.cardNumber.length !== 16 || isNaN(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
      valid = false;
    }

    if (formData.cardName.trim() === '') {
      newErrors.cardName = 'Please enter the name on the card';
      valid = false;
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Please select the expiry date';
      valid = false;
    }

    if (formData.cvv.length !== 3 || isNaN(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
      valid = false;
    }

    if (valid) {
      try {
        // Send form data to the backend
        await axios.post('http://localhost:4000/addpay', formData);
        alert('Form submitted successfully');
        // Reset form fields
        setFormData({
          cardNumber: '',
          cardName: '',
          expiryDate: null,
          cvv: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#055B5C] via-green-500 to-[#018C85] animate-gradient-x min-h-screen flex flex-col justify-center items-center py-8">
      <div className="self-start ml-4 py-2">
    <Link to="/">
      <button className="bg-[#055B5C] text-white px-4 py-2 mt-2 rounded-md hover:bg-[#018C85] transition-colors duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block align-middle mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        Back
      </button>
    </Link>
  </div>
      <h2 className="text-2xl font-bold text-white ml-4 mb-4">Payment Information</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border-2 border-gray-300 px-40 py-6 shadow-lg">
  <div className="mb-6">
    <label htmlFor="cardNumber" className="text-black block mb-2">
      Card Number
    </label>
    <input
      type="text"
      id="cardNumber"
      name="cardNumber"
      value={formData.cardNumber}
      onChange={handleChange}
      className={`border-2 border-gray-800 px-20 py-3 rounded-md w-full ${
        errors.cardNumber && 'border-red-500'
      }`}
    />
    {errors.cardNumber && (
      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
    )}
  </div>
  <div className="mb-6">
    <label htmlFor="cardName" className="text-black block mb-2">
      Name on Card
    </label>
    <input
      type="text"
      id="cardName"
      name="cardName"
      value={formData.cardName}
      onChange={handleChange}
      className={`border-2 border-gray-800 p-3 rounded-md w-full ${errors.cardName && 'border-red-500'}`}
    />
    {errors.cardName && (
      <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
    )}
  </div>
  <div className="mb-6">
    <label htmlFor="expiryDate" className="text-black block mb-2">
      Expiry Date
    </label>
    <DatePicker
      id="expiryDate"
      name="expiryDate"
      selected={formData.expiryDate}
      onChange={handleDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      className={`border-2 border-gray-800 px-20 py-3 rounded-md  w-full ${
        errors.expiryDate && 'border-red-500'
      }`}
    />
    {errors.expiryDate && (
      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
    )}
  </div>
  <div className="mb-6">
    <label htmlFor="cvv" className="text-black block mb-2">
      CVV
    </label>
    <input
      type="text"
      id="cvv"
      name="cvv"
      value={formData.cvv}
      onChange={handleChange}
      className={`border-2 border-gray-800 p-3 rounded-md w-full ${errors.cvv && 'border-red-500'}`}
    />
    {errors.cvv && (
      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
    )}
  </div>
  <button
    type="submit"
    className="bg-[#055B5C] text-white px-10 py-3 rounded-md hover:bg-[#018C85] transition-colors duration-300 w-full"
  >
    Submit
  </button>
</form>

    </div>
  );
};

export default PaymentPage;
