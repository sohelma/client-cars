import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded shadow overflow-hidden md:flex">
  {/* Left: Image */}
  <div className="md:w-1/2 flex-shrink-0 mt-10">
    <img
      src={
        car.image
          ? car.image.startsWith("http")
            ? car.image
            : `${import.meta.env.VITE_API_URL}${car.image}`
          : "https://via.placeholder.com/600x400?text=No+Image"
      }
      alt={car.carName}
      className="w-full h-full object-contain md:object-cover rounded-l"
      style={{ maxHeight: "500px" }}
    />
  </div>

  {/* Right: Info */}
  <div className="md:w-1/2 p-6 flex flex-col justify-between">
    <div>
      <h2 className="text-3xl font-bold">{car.carName}</h2>
      <p className="text-gray-700 mt-2 text-lg">Rent: ৳{car.rentPrice} / day</p>
      <p className="text-gray-500 mt-1">Category / Model: {car.category}</p>
      <p className="text-gray-500 mt-1">Location: {car.location}</p>
      <p className="text-gray-500 mt-1">Status: {car.status}</p>
      <p className="text-yellow-500 mt-2">Rating: ⭐ {car.rating}</p>
    </div>

    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Provider Info</h3>
      <p>Name: {car.providerName || "N/A"}</p>
      <p>Email: {car.providerEmail || "N/A"}</p>
    </div>
  </div>
</div>

  );
};

export default CarDetails;
