// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo1.png"
              alt="RentWheels"
              className="h-15 w-auto"
            />
            <span className="text-sm font-bold text-blue-600">Car Rental Platform </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/add-car" className="hover:text-blue-600 transition">Add Car</Link>
            <Link to="/my-listings" className="hover:text-blue-600 transition">My Listings</Link>
            <Link to="/my-bookings" className="hover:text-blue-600 transition">My Bookings</Link>
            <Link to="/browse-cars" className="hover:text-blue-600 transition">Browse Cars</Link>

            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                 <img
                    src={user.photoURL || "/images/user-placeholder.jpg"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={handleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <p className="px-4 py-1 font-semibold">{user.displayName}</p>
                    <p className="px-4 py-1 text-sm text-gray-500">{user.email}</p>
                    <button
                      onClick={() => { logOut(); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-1 mt-2 bg-white px-4 py-2 shadow-md">
          <Link to="/" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/add-car" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Add Car</Link>
          <Link to="/my-listings" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>My Listings</Link>
          <Link to="/my-bookings" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>My Bookings</Link>
          <Link to="/browse-cars" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Browse Cars</Link>

          {!user ? (
            <Link
              to="/login"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => { logOut(); setMenuOpen(false); }}
              className="mt-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
