// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-indigo-900 text-gray-300 py-12 mt-10 
    ">
      
      {/* Main Container */}
      <div className="w-9/12 mx-auto flex flex-col md:flex-row justify-between gap-10
      w-full sm:w-[500px] md:w-[600px] lg:w-[1200px] mx-auto">

        {/* Contact Us */}
        <div className="md:max-w-xs flex flex-col space-y-3">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img src="/images/logo1.png" alt="RentWheels" className="h-10 w-auto" />
            <span className="text-lg font-bold text-blue-600">Car Rental Platform</span>
          </Link>
          <h2 className="text-xl font-semibold text-white">Contact Us</h2>
          <Link to="/location" className="flex items-center space-x-2 hover:text-blue-400 transition">
            <FaMapMarkerAlt className="text-blue-500" /> <span>01 Motijheel C/A, Dhaka</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-2 hover:text-blue-400 transition">
            <FaPhoneAlt className="text-blue-500" /> <span>+880 1333-000000</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-2 hover:text-blue-400 transition">
            <FaEnvelope className="text-blue-500" /> <span>info@rentwheels.com</span>
          </Link>
        </div>

        {/* Follow Us */}
        <div className="md:max-w-xs flex flex-
         space-y-4">
          <h2 className="text-xl font-semibold text-white">Follow Us</h2>
          <Link to="/facebook" className="flex items-center gap-3 group hover:text-blue-400 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-500 transition-all">
              <FaFacebookF className="text-white text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-blue-400 transition">Facebook</span>
          </Link>
          <Link to="/x" className="flex items-center gap-3 group hover:text-sky-400 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black rounded-full border border-gray-500 transition-all group-hover:bg-gray-800">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-gray-300 group-hover:text-sky-400 transition">X</span>
          </Link>
          <Link to="/linkedin" className="flex items-center gap-3 group hover:text-blue-500 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full group-hover:bg-blue-600 transition-all">
              <FaLinkedinIn className="text-white text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-blue-500 transition">LinkedIn</span>
          </Link>
          <Link to="/instagram" className="flex items-center gap-3 group hover:text-pink-400 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full group-hover:bg-pink-400 transition-all">
              <FaInstagram className="text-white text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-pink-400 transition">Instagram</span>
          </Link>
        </div>

        {/* Privacy & Policy */}
        <div className="md:max-w-xs flex flex-col space-y-3">
          <h2 className="text-xl font-semibold text-white">Privacy & Policy</h2>
          <Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link>
          <Link to="/cookies" className="hover:text-blue-400 transition">Cookie Policy</Link>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-blue-500 border-t border-gray-700 mt-10 pt-6 text-sm">
        © 2025 RentWheels — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
