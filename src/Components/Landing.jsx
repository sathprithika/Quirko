

import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const LoginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user text-white hover:text-white">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={() => loginWithRedirect()}
      className="cursor-pointer font-bold text-white hover:text-white rounded flex items-center gap-2 transition-transform transform hover:scale-105"
    >
      <LoginIcon />
      <span>Log In</span>
    </div>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="cursor-pointer font-bold text-white hover:text-white rounded flex items-center gap-2 transition-transform transform hover:scale-105" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

const VintageSalesInfo = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        //rotateButtons(); // Commented out because it's not recommended
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  function performSearch() {
    const searchItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    const filteredResults = searchItems.filter(item =>
      item.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  }

  function togglePause() {
    setIsPaused(prevState => !prevState);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600">
      <div className="p-4 flex flex-col md:flex-row justify-between items-center w-full bg-gradient-to-r from-[#055B5C] via-green-500 to-[#018C85] shadow-md">
        <div className="mb-4 md:mb-10 flex items-center gap-4">
          <p className="text-white font-bold text-2xl">QUIRKO</p>
        </div>

        <div className="flex gap-4 md:gap-8 mx-8">
          <LoginButton />
          <LogoutButton />
          <Link to="/carts">
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart text-white hover:text-gray-200">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">3</span> {/* Example badge */}
            </button>
          </Link>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 flex justify-center w-full">
          <div className="text-center">
            {searchResults.map((result, index) => (
              <p key={index} className="text-white font-semibold">{result}</p>
            ))}
          </div>
        </div>
      )}

      {/* Parent Container with Gradient */}
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 p-6 w-full flex flex-col items-center justify-center rounded-lg shadow-md">
        {/* Inner Yellow Div */}
        <div className="bg-yellow-200 w-full flex flex-col items-center justify-center p-6 rounded-lg shadow-md mb-6">
          <div className="text-black mb-4 text-center">
            <p className="text-2xl font-semibold">✨ Embrace the Vintage Charm ✨</p>
            <p className="text-lg">
              Discover unique gems that add elegance and history to your life. 🎩🏺
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
          <div className="flex flex-col gap-5 mb-4 sm:mb-0">
            <Link to="/clothes">
              <div className="bg-green-800 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Vintage Clothing</h1>
                <img src="https://i.pinimg.com/736x/da/90/3f/da903fe79ed2da44d63fa5a00990a298.jpg" alt="Vintage Clothing" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
            <Link to="/accessories">
              <div className="bg-blue-800 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Vintage Accessories</h1>
                <img src="https://i.pinimg.com/736x/7f/c1/6b/7fc16b324965c3ba03bcd1cd6bf39760.jpg" alt="Vintage Accessories" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
            <Link to="/decor">
              <div className="bg-orange-800 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Home Decor</h1>
                <img src="https://i.pinimg.com/736x/c7/c3/49/c7c349f5f834ef46732e8a91da33e060.jpg" alt="Home Decor" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-5 mb-4 sm:mb-0">
            <Link to="/electronics">
              <div className="bg-orange-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Vintage Electronics</h1>
                <img src="https://m.media-amazon.com/images/I/61Rk793W8BS.AC_UF894,1000_QL80.jpg" alt="Vintage Electronics" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
            <Link to="/sports">
              <div className="bg-green-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Sporting Goods</h1>
                <img src="https://thumbs.dreamstime.com/b/teenager-sports-equipment-sport-vintage-suitcase-including-footwear-boxing-gloves-weights-baseball-bat-48207073.jpg" alt="Sporting Goods" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
            <Link to="/arts">
              <div className="bg-blue-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Vintage Arts</h1>
                <img src="https://m.media-amazon.com/images/I/81ALk7C74jL.AC_UF1000,1000_QL80.jpg" alt="Vintage Arts" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-purple-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
              <h1 className="text-xl font-bold mb-4">Handmade Items</h1>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCP1pguJEwqs-UwPRCj2lfTHUwVJTENEkL7EQ7itk-g&s" alt="Handmade Items" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
            </div>
            <div className="bg-pink-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
              <h1 className="text-xl font-bold mb-4">Vintage Weapons</h1>
              <img src="https://rukminim2.flixcart.com/image/850/1000/xif0q/painting/9/0/0/15-1-royal-antique-wooden-handmade-gun-wall-frame-set-of-weapons-original-imagjvj5zhjqb65q.jpeg?q=90&crop=false" alt="Vintage Weapons" className="rounded-bl-3xl rounded-br-3xl rounded-t-full w-full h-28" />
            </div>
            <div className="bg-yellow-500 text-white p-4 w-full sm:w-36 h-52 rounded-xl">
              <h1 className="text-xl font-bold mb-4">Vintage Gift Items</h1>
              <img src="https://www.heirloomsathome.com/wp-content/uploads/2020/11/nina-mercado-_qN6tmGjmtg-unsplash-scaled.jpg" alt="Vintage Gift Items" className="rounded-bl-3xl rounded-br-3xl rounded-t-full h-28 w-full" />
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-6">
 
  <div class="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] rounded-lg shadow-md p-6 mt-6 text-white flex-1">
    <h2 class="text-3xl font-bold mb-4">About Us</h2>
    <p class="text-lg mb-4">Welcome to Vintage Sales, your number one source for all things vintage. We're dedicated to giving you the very best of vintage clothing, accessories, and home decor, with a focus on quality, customer service, and uniqueness. Founded in 2024, Vintage Sales has come a long way from its beginnings. When we first started out, our passion for vintage items drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online store. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
  </div>


  <div class="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] rounded-lg shadow-md p-6 mt-6 text-white flex-1">
    <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="text-white">Email: sathprithika.s2022cse@sece.ac.in</p>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="text-white">Phone: +91 9994577940</p>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="text-white">Address: 123,A1 Street, Udumalpet, Tiruppur, 642202</p>
      </div>
    </div>
  </div>
</div>



        </div>
      </div>
      </div>
      



  );
};

export default VintageSalesInfo;
