// src/components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="relative border rounded-lg shadow p-4 bg-white">
      {/* Status Badge */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-bold ${car.status === "available" ? "bg-green-500" : "bg-red-500"}`}>
        {car.status}
      </div>

      <img src={car.image} alt={car.carName} className="w-full h-40 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{car.carName}</h3>
      <p className="text-gray-600">{car.category}</p>
      <p className="text-gray-800 font-semibold mt-1">৳ {car.rentPrice}</p>

      <Link to={`/cars/${car._id}`} className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Details
      </Link>
    </div>
  );
};

export default CarCard;
