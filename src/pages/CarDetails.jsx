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
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <img
        src={
          car.image && car.image.startsWith("http")
            ? car.image
            : car.image
            ? `${import.meta.env.VITE_API_URL}${car.image}`
            : "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={car.carName}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{car.carName}</h2>
      <p className="text-gray-700">Rent: ৳{car.rentPrice} / day</p>
      <p className="text-gray-500">Category / Model: {car.category}</p>

      {/* Provider Info */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold">Provider Info</h3>
        <p>Name: {car.providerName || "N/A"}</p>
        <p>Email: {car.providerEmail || "N/A"}</p>
      </div>
    </div>
  );
};

export default CarDetails;
