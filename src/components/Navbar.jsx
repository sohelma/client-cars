// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ধরুন user info localStorage থেকে
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">RentWheels</Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/">Home</Link></li>
          {user && <li><Link to="/add-car">Add Car</Link></li>}
          {user && <li><Link to="/my-listings">My Listings</Link></li>}
          {user && <li><Link to="/my-bookings">My Bookings</Link></li>}
          <li><Link to="/browse-cars">Browse Cars</Link></li>
          {!user && <li><Link to="/login">Login</Link></li>}
          {user && (
            <li>
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-2">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          {user && <li><Link to="/add-car" onClick={() => setMenuOpen(false)}>Add Car</Link></li>}
          {user && <li><Link to="/my-listings" onClick={() => setMenuOpen(false)}>My Listings</Link></li>}
          {user && <li><Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link></li>}
          <li><Link to="/browse-cars" onClick={() => setMenuOpen(false)}>Browse Cars</Link></li>
          {!user && <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
