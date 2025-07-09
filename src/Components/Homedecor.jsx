import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeDecor() {
  const [decors, setDecors] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDecors = async () => {
      try {
        const response = await axios.get('https://quirko-e-commerce.onrender.com/getalldecor');
        setDecors(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching decor: ' + error.message);
        setLoading(false);
      }
    };

    fetchDecors();
  }, []);

  const addToCart = async (id) => {
    try {
      const selectedDecor = decors.find((decor) => decor.id === id);
      if (selectedDecor) {
        const response = await axios.post('https://quirko-e-commerce.onrender.com/addcart', selectedDecor);
        if (response.status === 200) {
          setCartItems([...cartItems, selectedDecor]);
          console.log('Item added to cart:', selectedDecor);
        } else {
          throw new Error('Failed to add item to cart');
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-[#055B5C] via-green-500 to-[#018C85] animate-gradient-x">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-white mb-4 p-4">Home Decor List</h1>
        <div className="self-start mb-4 p-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 pb-8">
          {decors.map((decor) => (
            <div key={decor.id} className="card-wrapper">
              <div className="bg-white border-4 border-gray-200 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="relative overflow-hidden">
                  <img
                    src={decor.image}
                    alt={decor.decor_name}
                    className="w-full h-72 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link to="/carts">
                    <button
                      onClick={() => addToCart(decor.id)}
                      className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300 mr-2"
                    >
                      ADD TO CART
                    </button>
                    </Link>
                    <Link to={`/buy/${decor.id}`}>
                      <button className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300">
                        Seize the Moment
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold font-times">{decor.decor_name}</h2>
                  <p className="text-gray-700 font-times">{decor.description}</p>
                  <p className="mt-2 font-times">Rating: {decor.rating}</p>
                  <p className="mt-2 font-times">Price: {decor.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
