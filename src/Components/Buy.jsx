import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';



export default function CheckoutForm() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    pincode: '',
    state: '',
    phoneNumber: '',
    country: '',
    countryCode: '+91',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await axios.get(`https://quirko-e-commerce.onrender.com/getclothes/${id}`);
        setClothes([
          {
            ...response.data,
            quantity: 1,
            selectedSize: 'M',
          },
        ]);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching clothes: ${error.message}`);
        setLoading(false);
      }
    };

    fetchClothes();
  }, [id]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSizeChange = (index, newSize) => {
    setClothes((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, selectedSize: newSize } : item))
    );
  };

  const handleIncrement = (index) => {
    setClothes((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrement = (index) => {
    setClothes((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!deliveryInfo.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!deliveryInfo.streetAddress.trim()) newErrors.streetAddress = 'Street Address is required';
    if (!deliveryInfo.city.trim()) newErrors.city = 'City is required';
    if (!deliveryInfo.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!deliveryInfo.state.trim()) newErrors.state = 'State is required';
    if (!deliveryInfo.country.trim()) newErrors.country = 'Country is required';
    if (!deliveryInfo.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:4000/addbuy', {
        ...deliveryInfo,
        items,
      });
      alert('Order placed successfully');
      setDeliveryInfo({
        fullName: '',
        streetAddress: '',
        city: '',
        pincode: '',
        state: '',
        phoneNumber: '',
        country: '',
        countryCode: '+91',
      });
      setClothes([]);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="bg-gradient-to-br from-[#055B5C] via-green-500 to-[#018C85] animate-gradient-x">
      <div className="container px-40 py-8">
        <div className="relative bg-white shadow-xl md:mx-auto md:max-w-2xl md:rounded-lg md:px-10 p-4">
          <h1 className="text-2xl font-bold text-[#055B5C] mb-4 p-4">Delivery Information</h1>
          <div className="self-start mb-4 ml-4">
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
          <div className="mt-6 space-y-6">
            <div>
              {clothes.map((item, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                  <img src={item.image} alt="Product" className="w-full h-72 object-cover mb-2 rounded" />
                  <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                  <p className="text-sm text-gray-800 mb-2">{item.description}</p>
                  <p className="text-gray-800 mb-2">Rating: {item.rating}</p>
                  <p className="text-sm text-gray-800 mb-2">Price: ${parseFloat(item.price).toFixed(2)}</p>
                  <div className="flex items-center mb-4">
                    <button onClick={() => handleDecrement(index)} className="text-gray-500 hover:text-gray-800">
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center border-b-2 border-gray-300 mx-2"
                    />
                    <button onClick={() => handleIncrement(index)} className="text-gray-500 hover:text-gray-800">
                      +
                    </button>
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor={`size-${index}`} className="mr-2 text-gray-800">
                      Size:
                    </label>
                    <select
                      id={`size-${index}`}
                      value={item.selectedSize}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="border-b-2 border-gray-300"
                    >
                      {availableSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-800">
                    Total Price: ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              {accessories.map((acc, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                  <img src={acc.image} alt="Product" className="w-full h-72 object-cover mb-2 rounded" />
                  <h2 className="text-lg font-bold mb-1">{acc.name}</h2>
                  <p className="text-sm text-gray-800 mb-2">{acc.description}</p>
                  <p className="text-gray-800 mb-2">Rating: {acc.rating}</p>
                  <p className="text-sm text-gray-800 mb-2">Price: ${parseFloat(acc.price).toFixed(2)}</p>
                  <div className="flex items-center mb-4">
                    <button onClick={() => handleDecrement(index)} className="text-gray-500 hover:text-gray-800">
                      -
                    </button>
                    <input
                      type="text"
                      value={acc.quantity}
                      readOnly
                      className="w-10 text-center border-b-2 border-gray-300 mx-2"
                    />
                    <button onClick={() => handleIncrement(index)} className="text-gray-500 hover:text-gray-800">
                      +
                    </button>
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor={`size-${index}`} className="mr-2 text-gray-800">
                      Size:
                    </label>
                    <select
                      id={`size-${index}`}
                      value={acc.selectedSize}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="border-b-2 border-gray-300"
                    >
                      {availableSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-800">
                    Total Price: ${(parseFloat(acc.price) * acc.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-800">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={deliveryInfo.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-800">
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  value={deliveryInfo.streetAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-800">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={deliveryInfo.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-800">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={deliveryInfo.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-800">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={deliveryInfo.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-800">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={deliveryInfo.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800 mr-2">
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    name="countryCode"
                    value={deliveryInfo.countryCode}
                    onChange={handleChange}
                    className="shadow border rounded-l w-20 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="+91">India (+91)</option>
                    {/* Add other country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={deliveryInfo.phoneNumber}
                    onChange={handleChange}
                    className="shadow border rounded-r w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Phone Number"
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-[#055B5C] text-white px-40 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300">
                Place Order
              </button>
              <div className="mt-4"></div> 
              <a href="/Payment" className="bg-[#055B5C] text-white px-32  py-3 rounded-md hover:bg-[#018C85] transition-colors duration-300">
                Continue to payment
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

