import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddCar from "./pages/AddCar";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import BrowseCars from "./pages/BrowseCars";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import CarDetails from "./pages/CarDetails"; // ✅ new import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse-cars" element={<BrowseCars />} />

        {/* ✅ new route */}
        <Route path="/car/:id" element={<CarDetails />} />

        <Route
          path="/add-car"
          element={
            <PrivateRoute>
              <AddCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-listings"
          element={
            <PrivateRoute>
              <MyListings />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
