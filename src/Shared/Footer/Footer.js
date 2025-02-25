import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from '../../../src/assets/tools_logo.png';

const Footer = () => {
    return (
        <>

<footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-gray-300">
      {/* Top Footer Section */}
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Services */}
        <div>
          <h3 className="text-xl font-bold text-white">Services</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Branding</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Design</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Marketing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-bold text-white">Company</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Press Kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-bold text-white">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Cookie Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-600 my-4"></div>

      {/* Bottom Footer Section */}
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo & Info */}
        <div className="flex items-center space-x-3">
        <img className='w-1/2 sm:w-100 md:max-w-md rounded-lg shadow-2xl' src={logo} />
             {/* <span className="text-lg font-semibold text-white">Tools World</span> */}
          <p className="text-sm">Providing quality tech products since 1992</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaFacebook /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaYoutube /></a>
        </div>

      </div>
      

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Tools World. All Rights Reserved.
      </div>
    </footer>


        </>
    );
};

export default Footer;