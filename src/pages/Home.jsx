import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading cars...</div>;
  if (!cars.length) return <div className="text-center mt-20">No cars available</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div key={car._id} className="border rounded-lg shadow-md p-4">
          <img
            src={car.image.startsWith("http") ? car.image : `${import.meta.env.VITE_API_URL}${car.image}`}
            alt={car.carName}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-xl font-bold mt-2">{car.carName}</h3>
          <p className="text-gray-700">Category: {car.category}</p>
          <p className="text-gray-700">Price: ৳{car.rentPrice} / day</p>

          <Link
            to={`/car/${car._id}`}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
