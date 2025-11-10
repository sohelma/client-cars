// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ধরো, login করা user এর email এখানে hardcoded (পরবর্তীতে Firebase Auth ব্যবহার করতে পারবে)
  const userEmail = "user@example.com";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings`) // server endpoint
      .then((res) => res.json())
      .then((data) => {
        // শুধুমাত্র logged-in user এর booking filter করা
        const myBookings = data.filter((b) => b.userEmail === userEmail);
        setBookings(myBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p>You have no bookings yet.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>My Bookings</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {bookings.map((booking) => (
          <CarCard key={booking._id} car={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
