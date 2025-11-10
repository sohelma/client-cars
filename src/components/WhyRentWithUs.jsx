import React from "react";

const WhyRentWithUs = () => {
  const benefits = [
    { title: "Easy Booking", desc: "Book your car in a few simple steps." },
    { title: "Affordable Rates", desc: "Choose cars that fit your budget." },
    { title: "Trusted Providers", desc: "All cars from verified providers." },
    { title: "24/7 Support", desc: "We are here to assist you anytime." },
  ];

  return (
    <div className="max-w-6xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-10">Why Rent With Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {benefits.map((b, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyRentWithUs;
