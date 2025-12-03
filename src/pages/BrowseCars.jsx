import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import { toast } from "react-hot-toast";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then(res => setCars(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch cars");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20">Loading cars...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse Cars</h2>
      {cars.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No cars available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseCars;
