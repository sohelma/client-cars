import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- Link ইমপোর্ট
import axios from "axios";

const TopRatedCars = () => {
  const [topCars, setTopCars] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars/top-rated`)
      .then((res) => setTopCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-yellow-50 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
        Top Rated Cars
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">
        {topCars.map((car) => (
          <Link
            to={`/cars/${car._id}`} // <-- এখানে লিঙ্ক
            key={car._id}
            className="w-72 border rounded-lg bg-white p-4 hover:shadow-lg transition"
          >
            <img
              src={
                car.image.startsWith("http")
                  ? car.image
                  : `${import.meta.env.VITE_API_URL}${car.image}`
              }
              alt={car.carName}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-2 text-center">
              <h3 className="text-lg font-semibold">{car.carName}</h3>
              <p className="text-gray-700">Rent: ৳{car.rentPrice} / day</p>
              <p className="text-gray-500 text-sm">Provider: {car.providerName}</p>
              <span className="inline-block mt-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full">
                Top Rated
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRatedCars;
