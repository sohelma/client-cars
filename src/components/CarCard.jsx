import React from "react";
import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <div className="border rounded-xl shadow-lg hover:shadow-2xl overflow-hidden w-full hover:scale-105 transition-transform duration-300 relative">
      {/* Top Rated Badge */}
      {car.rating && car.rating >= 4.5 && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
          ★ {car.rating.toFixed(1)}
        </span>
      )}

      <img
        src={
          car.image.startsWith("http")
            ? car.image
            : `${import.meta.env.VITE_API_URL}${car.image}`
        }
        alt={car.carName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{car.carName}</h3>
        <p className="text-gray-700">Rent: ৳{car.rentPrice} / day</p>
        <p className="text-gray-500 text-sm">{car.category}</p>
        <p className="text-gray-500 text-sm">Provider: {car.providerName}</p>

        <Link
          to={`/car/${car._id}`}
          className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
