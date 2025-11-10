import React from "react";
import Slider from "react-slick";

const HeroBanner = () => {
  const slides = [
    {
      title: "Easy Car Rentals Near You",
      desc: "Book cars from trusted local providers in minutes.",
      img: "https://source.unsplash.com/1600x600/?car,road",
    },
    {
      title: "Affordable Rates for Every Ride",
      desc: "Choose cars that fit your budget with flexible options.",
      img: "https://source.unsplash.com/1600x600/?car,rental",
    },
    {
      title: "24/7 Customer Support",
      desc: "We're here to assist you anytime for a smooth ride.",
      img: "https://source.unsplash.com/1600x600/?car,service",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-64 md:h-96">
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
            <p className="mt-2 md:mt-4">{slide.desc}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroBanner;
