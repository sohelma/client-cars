// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaCar, FaMoneyBillWave, FaMousePointer, FaHeadset } from "react-icons/fa";
import BackToTopButton from "../components/BackToTopButton";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [topRatedCars, setTopRatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const featuredRes = await axios.get(`${import.meta.env.VITE_API_URL}/cars/featured`);
        const topRes = await axios.get(`${import.meta.env.VITE_API_URL}/cars/top-rated`);
        setFeaturedCars(featuredRes.data);
        setTopRatedCars(topRes.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  if (loading) return <div className="text-center mt-20">Loading cars...</div>;

  const filteredCars = featuredCars.filter((car) =>
    car.carName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    { title: "Wide Selection", desc: "Choose from a wide range of cars", icon: <FaCar className="text-4xl mx-auto mb-3 text-blue-600" /> },
    { title: "Affordable Prices", desc: "Best price guaranteed", icon: <FaMoneyBillWave className="text-4xl mx-auto mb-3 text-green-600" /> },
    { title: "Easy Booking", desc: "Book cars in few clicks", icon: <FaMousePointer className="text-4xl mx-auto mb-3 text-yellow-500" /> },
    { title: "24/7 Support", desc: "Always here to help", icon: <FaHeadset className="text-4xl mx-auto mb-3 text-red-500" /> },
  ];

  return (
    <div className="bg-gray-100">

      {/* Hero Slider */}
      <section className="relative">
        <Slider {...heroSettings}>
          {[
            { title: "Drive Your Dream Car", subtitle: "Find the perfect ride for your next adventure" },
            { title: "Luxury, Comfort & Style", subtitle: "Experience premium cars at affordable prices" },
            { title: "Book Easily, Drive Freely", subtitle: "Fast booking, smooth rides, and trusted service" },
          ].map((slide, idx) => (
            <div key={idx} className="relative h-[500px] bg-black overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-red-700 px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
                  <Typewriter
                    words={[slide.title]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 animate-fadeIn delay-300">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

    
{/* Featured Cars Section */}
<section className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold mb-6 text-center text-black">
    Featured Cars
  </h2>

  {/* Search Input */}
  <div className="flex justify-center mb-6">
    <input
      type="text"
      placeholder="Search car by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {filteredCars.length > 0 ? (
      filteredCars.map((car) => (
        <div
          key={car._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-xl transition bg-white"
        >
        <img
  src={
    car.image
      ? car.image.startsWith("http")
        ? car.image
        : `${import.meta.env.VITE_API_URL}${car.image}` // MongoDB path অনুযায়ী
      : "https://via.placeholder.com/400x300?text=No+Image"
  }
  alt={car.carName || "Car"}
  className="w-full h-48 object-cover rounded"
/>


          <h3 className="text-xl font-semibold mt-2">{car.carName}</h3>
          <p className="text-gray-700"> ৳: {car.rentPrice} / day</p>
          <p className="text-gray-500"> {car.category}</p>
        

          <Link
            to={`/cars/${car._id}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">
        No cars found matching “{searchTerm}”
      </p>
    )}
  </div>
</section>



      {/* Top Rated Cars */}
      <section className="max-w-7xl mx-auto mb-12 ">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Rated Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topRatedCars.map((car) => (
            <motion.div
              key={car._id}
              className="relative rounded-lg shadow-md p-2 hover:shadow-   transition bg-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
                <img
                  src={
                    car.image
                      ? car.image.startsWith("http")
                        ? car.image
                        : `${import.meta.env.VITE_API_URL}${car.image}` // MongoDB path অনুযায়ী
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={car.carName || "Car"}
                  className="w-full h-48 object-cover rounded"
               />      

              <div className="absolute top-2 left-2 bg-amber-300 text-black font-bold px-2 py-1 rounded">
                ⭐ {car.rating}
              </div>
              <h3 className="text-xl font-bold mt-2">{car.carName}</h3>
              <p className="text-gray-700">{car.category}</p>
              <p className="text-gray-700">৳:{car.rentPrice}/day</p>
              <Link
                to={`/cars/${car._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="max-w-7xl mx-auto mb-12 p-6 rounded-lg bg-gradient-to-r from-yellow-100 via-pink-50 to-purple-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Rent With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-2xl transform hover:-translate-y-2 transition text-center"
            >
              {item.icon}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto mt-12 mb-12 ">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
          {[
            { name: "Sabahat Safina", text: "Great service!", img: "user1.webp" },
            { name: "S. A. Mamun", text: "Affordable cars.", img: "user2.avif" },
            { name: "Ali Khan", text: "Excellent experience.", img: "user3.jpg" },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow text-center  bg-gradient-to-b from-blue-100 via-green-50 to-blue-50">
             <img
                src={`${import.meta.env.VITE_API_URL}/images/${t.img}`}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />

              <p className="mb-2">"{t.text}"</p>
              <h4 className="font-bold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <BackToTopButton />
    </div>
  );
};

export default Home;
