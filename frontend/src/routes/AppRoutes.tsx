import HomePage from "@/pages/Home";
import Login from "@/pages/Login";
import MyBookings from "@/pages/Mybooking";
import Register from "@/pages/Register";
import UserList from "@/pages/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 PROTECTED ROUTES */}

          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/users/:serviceId" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}