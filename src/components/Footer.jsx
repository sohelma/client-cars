import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
  <footer className="bg-gradient-to-b from-black to-indigo-900 text-gray-300 py-12 mt-10">
  <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Contact */}
    <div>
       <Link to="/" className="flex items-center space-x-2">
  <img
    src="/images/logo1.png"
    alt="RentWheels"
    className="h-10 w-auto"
  />
  <span className="text-sm font-bold text-blue-600">Car Rental Platform</span>
</Link>
      <h2 className="text-xl font-semibold text-white mb-3">Contact Detail</h2>
      <p>📍 01 Motijheel C/A, Dhaka, Bangladesh</p>
      <p>📞 +880 1333-000000</p>
      <p>✉️ info@rentwheels.com</p>
    </div> 

    {/* Social Links */}
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">Follow Us</h2>
      <div className="flex flex-wrap gap-4 mt-2">
        <a href="#" className="flex items-center gap-2 transition transform hover:scale-110 hover:text-indigo-500">
          <FaFacebook className="text-2xl text-white rounded-full p-1 bg-indigo-600" />
          Facebook
        </a>
        <a href="#" className="flex items-center gap-2 transition transform hover:scale-110 hover:text-sky-400">
          <FaXTwitter className="text-2xl text-white rounded-full p-1 bg-sky-500" />
          Twitter
        </a>
        <a href="#" className="flex items-center gap-2 transition transform hover:scale-110 hover:text-blue-500">
          <FaLinkedin className="text-2xl text-white rounded-full p-1 bg-blue-600" />
          LinkedIn
        </a>
        <a href="#" className="flex items-center gap-2 transition transform hover:scale-110 hover:text-pink-400">
          <FaInstagram className="text-2xl text-white rounded-full p-1 bg-pink-500" />
          Instagram
        </a>
      </div>
    </div>

    {/* Privacy Policy */}
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">Privacy & Policy</h2>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
        <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
      </ul>
    </div>
  </div>

  {/* Footer*/}
  <div className="text-center text-blue-500 border-t border-gray-700 mt-10 pt-6">
     © 2025 RentWheels — All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
