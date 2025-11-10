import React from "react";

const testimonials = [
  {
    name: "Sabahat",
    text: "Amazing experience! Booking was super easy.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarina",
    text: "Affordable and reliable cars. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahim",
    text: "Customer support is excellent. Smooth booking.",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Customer Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow hover:shadow-lg transition text-center"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">"{t.text}"</p>
            <h4 className="mt-4 font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
