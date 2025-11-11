// BrowseCars.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/cars") // তোমার backend URL
      .then(res => setCars(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!cars.length) return <p>No cars found.</p>;

  return (
    <div>
      {cars.map(car => (
        <div key={car._id}>{car.carName}</div>
      ))}
    </div>
  );
};

export default BrowseCars;
