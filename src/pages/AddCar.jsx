// src/pages/AddCar.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const AddCar = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    image: "",
    providerName: user?.displayName || "",
    providerEmail: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.carName || !formData.description || !formData.rentPrice || !formData.location || !formData.image) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/cars`, formData);
      if (res.data.insertedId) {
        toast.success("Car added successfully!");
        setFormData({
          carName: "",
          description: "",
          category: "Sedan",
          rentPrice: "",
          location: "",
          image: "",
          providerName: user?.displayName || "",
          providerEmail: user?.email || "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add a New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Car Name</label>
          <input
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Rent Price (per day)</label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://source.unsplash.com/..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Provider Name</label>
          <input
            type="text"
            name="providerName"
            value={formData.providerName}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Provider Email</label>
          <input
            type="email"
            name="providerEmail"
            value={formData.providerEmail}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
