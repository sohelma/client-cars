import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./providers/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddCar from "./pages/AddCar";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./route/ProtectedRoute";
import Error404 from "./pages/Error404";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* 404 Page */}
      <Route path="*" element={<Error404 />} />

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Login />
            <Footer />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Navbar />
            <Signup />
            <Footer />
          </>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/add-car"
        element={
          <ProtectedRoute>
            <Navbar />
            <AddCar />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-listings"
        element={
          <ProtectedRoute>
            <Navbar />
            <MyListings userEmail={user?.email} />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <Navbar />
            <MyBookings />
            <Footer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
