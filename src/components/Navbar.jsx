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
  <nav className="fixed w-full z-50 backdrop-blur-sm bg-gradient-to-b from-black to-indigo-900 text-gray-300 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/images/logo1.png" alt="RentWheels" className="h-12 w-auto" />
        <span className="text-lg font-bold text-blue-600">Car Rental Platform</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center font-medium">
       {["Home", "Add Car", "My Listings", "My Bookings", "Browse Cars"].map((item) => {
  const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/ /g, "-")}`;
  return (
    <Link
      key={item}
      to={path}
      className="hover:text-blue-600 transition duration-200"
    >
      {item}
    </Link>
  );
})}


        {!user ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL || "/images/user-placeholder.jpg"}
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-600"
              onClick={handleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <p className="px-4 py-1 font-semibold">{user.displayName}</p>
                <p className="px-4 py-1 text-sm text-gray-500">{user.email}</p>
                <button
                  onClick={() => { logOut(); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition"
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
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
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
    <div className="md:hidden flex flex-col space-y-1 mt-2 bg-white/95 shadow-md backdrop-blur-sm p-4 rounded-b-lg">
      {["Home", "Add Car", "My Listings", "My Bookings", "Browse Cars"].map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase().replace(/ /g, "-")}`}
          className="px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          onClick={() => setMenuOpen(false)}
        >
          {item}
        </Link>
      ))}

      {!user ? (
        <Link
          to="/login"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      ) : (
        <button
          onClick={() => { logOut(); setMenuOpen(false); }}
          className="mt-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition duration-200"
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
