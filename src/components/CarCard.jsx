import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-full hover:scale-105 transition-transform duration-300">
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
        <p className="text-gray-500 text-sm">{car.location}</p>
      </div>
    </div>
  );
};

export default CarCard;




