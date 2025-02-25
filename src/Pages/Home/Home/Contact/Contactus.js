import React from 'react';
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const Contactus = () => {
    return (
        <div>
           <div className="min-h-screen flex items-center justify-center  px-6 py-16">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-gray-700">
        
        {/* Title */}
        <h2 className="text-4xl font-bold  text-center mb-6">Get in Touch</h2>
        <p className=" text-center mb-10">
          Have questions? Need support? Fill out the form below and we'll get back to you ASAP!
        </p>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-gray-800 text-white py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-400" />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full bg-gray-800 text-white py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Message Field */}
          <div>
            <textarea 
              rows="4" 
              placeholder="Your Message" 
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
          >
            <FaPaperPlane /> Send Message
          </button>

        </form>
      </div>
    </div>

        </div>
    );
};

export default Contactus;