// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">RentWheels</Link>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {user ? (
          <>
            <span className="mr-4">{user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
