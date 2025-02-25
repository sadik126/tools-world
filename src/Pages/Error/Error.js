import Lottie from 'lottie-react';
import React from 'react';

import errorAnimation from '../../assets/error.json';
import errorGif from '../../assets/errorimage.gif';


const Error = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Lottie Animation */}
      <div className="w-72 h-72">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* যদি Lottie কাজ না করে, তাহলে GIF দেখাবে */}
      <img
        src={errorGif}
        alt="Error"
        className="w-64 h-64 rounded-lg shadow-lg hidden"
        onError={(e) => (e.target.style.display = "block")} // Fallback GIF
      />

      <h2 className="text-3xl font-bold text-red-500 mt-4">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mt-2">We couldn't load the page you were looking for.</p>

      {/* Home Button */}
      <button
        className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg text-lg font-semibold transition-transform transform hover:scale-105 active:scale-95"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
        </div>
    );
};

export default Error;