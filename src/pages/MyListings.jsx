import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyListings = ({ userEmail }) => {
  const [myCars, setMyCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null); // for modal

  // local images (public/images folder)
  const fallbackImages = [
    "bmw.jpg",
    "nissan.jpg",
    "honda.jpg",
    "tesla.jpg",
    "suzuki.png",
    "toyota1.jpg",
  ];

  console.log("User email from MyListings:", userEmail);

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`https://server-cars-green.vercel.app/my-cars/${userEmail}`)
      .then((res) => {
        console.log("Fetched cars:", res.data);
        setMyCars(res.data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, [userEmail]);

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://server-cars-green.vercel.app/cars/${id}`)
          .then(() => {
            setMyCars((prev) => prev.filter((car) => car._id !== id));
            Swal.fire("Deleted!", "Car has been removed.", "success");
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error!", "Could not delete car.", "error");
          });
      }
    });
  };

  // Update Handler (open modal)
  const handleEdit = (car) => {
    setEditingCar(car);
  };

  //  Save Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      carName: form.carName.value,
      category: form.category.value,
      rentPrice: form.rentPrice.value,
      status: form.status.value,
      description: form.description.value,
    };

    axios
      .put(`https://server-cars-green.vercel.app/cars/${editingCar._id}`, updatedCar)
      .then(() => {
        Swal.fire("Updated!", "Car info updated successfully!", "success");
        setMyCars((prev) =>
          prev.map((car) =>
            car._id === editingCar._id ? { ...car, ...updatedCar } : car
          )
        );
        setEditingCar(null);
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire("Error!", "Could not update car.", "error");
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Listings</h2>

      {myCars.length === 0 ? (
        <p className="text-center text-gray-600">No cars added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Car Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Rent Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCars.map((car, index) => (
              <tr key={car._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={
                      car.image && car.image.startsWith("/images/")
                        ? car.image
                        : `/images/${
                            fallbackImages[index % fallbackImages.length]
                          }`
                    }
                    alt={car.carName}
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                </td>
                <td className="border p-2">{car.carName}</td>
                <td className="border p-2">{car.category}</td>
                <td className="border p-2">৳{car.rentPrice}</td>
                <td className="border p-2">{car.status || "Available"}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(car)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Update Car</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label>Car Name</label>
                <input
                  type="text"
                  name="carName"
                  defaultValue={editingCar.carName}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingCar.category}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label>Rent Price</label>
                <input
                  type="number"
                  name="rentPrice"
                  defaultValue={editingCar.rentPrice}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label>Status</label>
                <select
                  name="status"
                  defaultValue={editingCar.status}
                  className="w-full border p-2 rounded"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                </select>
              </div>
              <div className="mb-2">
                <label>Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCar.description}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
