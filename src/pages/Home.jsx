import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import HeroBanner from "../components/HeroBanner";
import WhyRentWithUs from "../components/WhyRentWithUs";
import TopRatedCars from "../components/TopRatedCars";
import Testimonials from "../components/Testimonials";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cars?limit=6`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <HeroBanner />

      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-indigo-600">
          Featured Cars
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>

      <WhyRentWithUs />

      <TopRatedCars />

      <Testimonials />
    </>
  );
};

export default Home;
    