import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => toast.error("Failed to load car details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      toast.error("You must be logged in to book a car!");
      return;
    }

    const bookingData = {
      carId: car._id,
      carName: car.carName,
      rentPrice: car.rentPrice,
      providerName: car.providerName,
      providerEmail: car.providerEmail,
      userName: user.displayName || user.email,
      userEmail: user.email,
      rentDate: new Date().toISOString().split("T")[0], // Example
      returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 2 days later
      status: "pending",
    };

    axios
      .post("http://localhost:3000/bookings", bookingData)
      .then(() => toast.success("Booking confirmed!"))
      .catch(err => toast.error("Failed to book car"));
  };

  if (loading) return <p className="text-center mt-20">Loading car details...</p>;
  if (!car) return <p className="text-center mt-20">Car not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
  <img src={car.image} alt={car.carName} className="w-full h-64 object-cover rounded" />
  <h2 className="text-2xl font-bold mt-4">{car.carName}</h2>
  <p>{car.description}</p>
  <p className="mt-2 font-semibold">Category: {car.category}</p>
  <p className="mt-1 font-semibold">Rent Price: ৳{car.rentPrice}</p>
  <p className="mt-1 font-semibold">Provider: {car.providerName} ({car.providerEmail})</p>
  <p className="mt-1 font-semibold">
    Status:{" "}
    <span className={car.status === "available" ? "text-green-600" : "text-red-600"}>
      {car.status}
    </span>
  </p>

  {/* Booking button */}
  {car.status === "available" && (
    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
      Book Now
    </button>
  )}
</div>

  );
};

export default CarDetails;
