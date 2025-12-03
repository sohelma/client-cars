// src/components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-xl transition bg-white">
      <img
        src={
          car.image
            ? car.image.startsWith("http")
              ? car.image
              : `${import.meta.env.VITE_API_URL}${car.image}`
            : "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={car.carName || "Car"}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{car.carName}</h3>
      <p className="text-gray-700">Rent: ৳{car.rentPrice} / day</p>
      <p className="text-gray-500">Category: {car.category}</p>
      <p className="text-gray-500">Provider: {car.providerName}</p>

      <Link
        to={`/cars/${car._id}`}
        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default CarCard;
