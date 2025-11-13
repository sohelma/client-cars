// src/pages/CarDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book this car.");
      return;
    }

    if (car.status !== "available") {
      alert("This car is already booked.");
      return;
    }

    try {
      setBookingLoading(true);
      const bookingData = {
        carId: car._id,
        userEmail: user.email,
        bookingDate: new Date()
      };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);
      if (res.data.insertedId) {
        alert("Booking successful!");
        // Update status locally
        setCar({ ...car, status: "booked" });
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p>Loading car details...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-20">
      <img
        src={car.image.startsWith("http") ? car.image : `${import.meta.env.VITE_API_URL}${car.image}`}
        alt={car.carName}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{car.carName}</h2>
      <p className="text-gray-700 mb-2">{car.description}</p>
      <p className="text-gray-700 mb-1">Category: {car.category}</p>
      <p className="text-gray-700 mb-1">Price: $ {car.rentPrice}/day</p>
      <p className={`font-semibold mb-4 ${car.status === "available" ? "text-green-600" : "text-red-600"}`}>
        Status: {car.status}
      </p>

      <button
        onClick={handleBooking}
        disabled={car.status !== "available" || bookingLoading}
        className={`px-4 py-2 rounded text-white ${
          car.status === "available"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {bookingLoading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default CarDetails;
