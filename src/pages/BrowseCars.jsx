
// src/pages/BrowseCars.jsx
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading cars...</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center mt-8">No cars available right now.</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Browse Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
