// src/pages/MyBookings.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
//  console.log("User in MyBookings:", user);
    if (!user?.email) return;
console.log("User object:", user);
  console.log("Fetching bookings for user:", user?.email);
  console.log("Fetching URL:", `http://localhost:3000/bookings?email=${user?.email}`);
    axios
      .get(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => {
          console.log("Bookings fetched:", res.data);
        setBookings(res.data);
      })
      .catch((err) => {
         console.error("Error fetching bookings:", err);
        toast.error("Failed to fetch your bookings");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <div className="text-center mt-20">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no bookings yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Car Name</th>
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left">Rent Price</th>
                <th className="border p-3 text-left">Provider</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Rent Period</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    booking.status === "confirmed"
                      ? "bg-green-50"
                      : booking.status === "pending"
                      ? "bg-yellow-50"
                      : "bg-red-50"
                  }`}
                >
                  <td className="border p-2">{booking.carName}</td>
                  <td className="border p-2">{booking.category || "-"}</td>
                  <td className="border p-2">৳{booking.rentPrice}</td>
                  <td className="border p-2">{booking.providerName}</td>
                  <td className="border p-2 font-semibold text-sm">
                    {booking.status}
                  </td>
                  <td className="border p-2">
                    {booking.rentDate} → {booking.returnDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
