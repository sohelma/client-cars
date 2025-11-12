import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams(); // URL থেকে car ID ধরছে
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`);
        setCar(res.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBooking = async () => {
    try {
      // এখানে বুকিং ডাটা যাবে server এ
      const bookingData = {
        carId: car._id,
        carName: car.carName,
        rentPrice: car.rentPrice,
        providerEmail: car.providerEmail,
        providerName: car.providerName,
        status: "Booked",
        date: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);
      toast.success("Car booked successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book the car.");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!car) return <div className="text-center mt-20">Car not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={
          car.image.startsWith("http")
            ? car.image
            : `${import.meta.env.VITE_API_URL}${car.image}`
        }
        alt={car.carName}
        className="w-full h-80 object-cover rounded-xl shadow-md mb-6"
      />

      <h2 className="text-3xl font-bold mb-3">{car.carName}</h2>
      <p className="text-gray-700 mb-2">Category: {car.category}</p>
      <p className="text-gray-700 mb-2">Location: {car.location}</p>
      <p className="text-gray-700 mb-2">Price: ${car.rentPrice} / day</p>
      <p className="text-gray-700 mb-2">Status: 
        <span className={`ml-2 px-2 py-1 rounded text-white ${car.status === 'Booked' ? 'bg-red-500' : 'bg-green-500'}`}>
          {car.status || "Available"}
        </span>
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Provider Information</h3>
        <p>Name: {car.providerName}</p>
        <p>Email: {car.providerEmail}</p>
      </div>

      <p className="mt-6 text-gray-600">{car.description}</p>

      <button
        onClick={handleBooking}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default CarDetails;
