import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CartComponent = () => {
  

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch('http://localhost:4000/getallcarts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const cartsWithValidQuantity = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1, // Set quantity to 1 if it's NaN or null
          basePrice: item.price, // Store the base price of the item
          selectedSize: 'M', // Default selected size
        }));
        setCarts(cartsWithValidQuantity);
        calculateTotalValue(cartsWithValidQuantity);
        setLoading(false);
      } catch (error) {
        setError('Error fetching carts: ' + error.message);
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const calculateTotalValue = (carts) => {
    const total = carts.reduce((acc, cart) => acc + cart.quantity * cart.basePrice, 0);
    setTotalValue(total);
  };

  const handleIncrement = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/increasequantity/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Quantity increased successfully, update the local state
        const updatedCarts = carts.map((cart) =>
          cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
        );
        setCarts(updatedCarts);
        calculateTotalValue(updatedCarts);
      } else {
        console.error('Failed to increase quantity');
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecrement = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/decreasequantity/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Quantity decreased successfully, update the local state
        const updatedCarts = carts.map((cart) =>
          cart.id === id && cart.quantity > 1 ? { ...cart, quantity: cart.quantity - 1 } : cart
        );
        setCarts(updatedCarts);
        calculateTotalValue(updatedCarts);
      } else {
        console.error('Failed to decrease quantity');
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const deleteCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/deletecart/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Item successfully deleted, update the state
        const updatedCarts = carts.filter((cart) => cart.id !== id);
        setCarts(updatedCarts);
        calculateTotalValue(updatedCarts);
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#055B5C] via-green-500 to-[#018C85] animate-gradient-x">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-white mb-4 p-4">CART</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-8">
          {carts.length > 0 ? (
            carts.map((cart) => (
              <div key={cart.id} className="bg-white border-4 border-gray-200 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <img src={cart.image} alt="Product" className="w-full h-96 object-cover mb-4" />
                <p className="font-bold text-lg mb-2">{cart.name}</p>
                <p className="text-sm text-gray-600 mb-2">{cart.description}</p>
                <p className="text-gray-800 mb-2">Rating: {cart.rating}</p>
                <p className="text-gray-800 mb-2">
                  Price: {(cart.quantity * cart.basePrice).toFixed(2)} {/* Display calculated price */}
                </p>

                <div className="icon flex items-center space-x-4">
                  <button
                    className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300"
                    onClick={() => handleDecrement(cart.id)}
                  >
                    -
                  </button>
                  <span>{cart.quantity}</span> {/* Display quantity */}
                  <button
                    className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300"
                    onClick={() => handleIncrement(cart.id)}
                  >
                    +
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-blue-500 hover:text-blue-700 font-bold">
                    <button onClick={() => deleteCart(cart.id)} className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300">
                      DELETE
                    </button>
                  </div>
                  <Link to={`/buy/${cart.id}`} className="text-blue-500 hover:text-blue-700 font-bold">
                    <button  className="bg-[#055B5C] text-white px-4 py-2 rounded-md hover:bg-[#018C85] transition-colors duration-300">Seize the Moment</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white">No carts available</div>
          )}
        </div>
        <div className="mt-8 px-4">
          <h3 className="text-xl font-bold text-white">Total Value: {totalValue.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
