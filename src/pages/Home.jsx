//home.jsx
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-indigo-600">Available Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;