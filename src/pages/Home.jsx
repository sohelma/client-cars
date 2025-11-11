// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [topRatedCars, setTopRatedCars] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="bg-gray-100">
      {/* 🔥 Hero Slider (Top Section) */}
     {/* Hero Slider */}
<section className="relative">
  <Slider
    dots={true}
    infinite={true}
    speed={1000}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={4000}
    fade={true}
    cssEase="linear"
  >
    {[
      {
        title: "Drive Your Dream Car",
        subtitle: "Find the perfect ride for your next adventure",
      },
      {
        title: "Luxury, Comfort & Style",
        subtitle: "Experience premium cars at affordable prices",
      },
      {
        title: "Book Easily, Drive Freely",
        subtitle: "Fast booking, smooth rides, and trusted service",
      },
    ].map((slide, idx) => (
      <div key={idx} className="relative h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            {slide.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 animate-fadeIn delay-300">
            {slide.subtitle}
          </p>
        </div>
      </div>
    ))}
  </Slider>
</section>



      {/* Featured Cars */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <div key={car._id} className="border rounded-lg shadow-md p-4 hover:shadow-xl transition relative bg-white">
              <img
                src={car.image.startsWith("http") ? car.image : `${import.meta.env.VITE_API_URL}${car.image}`}
                alt={car.carName}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{car.carName}</h3>
              <p className="text-gray-700">Category: {car.category}</p>
              <p className="text-gray-700">Price: ৳{car.rentPrice}/day</p>
              <p className="text-green-600 font-semibold">Rating: {car.rating}</p>
              <Link
                to={`/car/${car._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Cars */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Rated Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedCars.map((car) => (
            <div key={car._id} className="relative border rounded-lg shadow-md p-4 hover:shadow-xl transition bg-gray-50">
              <img
                src={car.image.startsWith("http") ? car.image : `${import.meta.env.VITE_API_URL}${car.image}`}
                alt={car.carName}
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded">
                ⭐ {car.rating}
              </div>
              <h3 className="text-xl font-bold mt-2">{car.carName}</h3>
              <p className="text-gray-700">Category: {car.category}</p>
              <p className="text-gray-700">Price: ৳{car.rentPrice}/day</p>
              <Link
                to={`/car/${car._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Rent With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Wide Selection", desc: "Choose from a wide range of cars", icon: "🚗" },
            { title: "Affordable Prices", desc: "Best price guaranteed", icon: "💰" },
            { title: "Easy Booking", desc: "Book cars in few clicks", icon: "🖱️" },
            { title: "24/7 Support", desc: "Always here to help", icon: "📞" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-2xl transform hover:-translate-y-2 transition text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-6xl mx-auto mt-12 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Sabahat Safina", text: "Great service!", img: "user1.webp" },
            { name: "S. A. Mamun", text: "Affordable cars.", img: "user2.avif" },
            { name: "Ali Khan", text: "Excellent experience.", img: "user3.jpg" },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
              <img
                src={`http://localhost:3000/images/${t.img}`}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="mb-2">"{t.text}"</p>
              <h4 className="font-bold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
