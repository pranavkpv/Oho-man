import HomePage from '@/pages/Home';
import Login from '@/pages/Login';
import MyBookings from '@/pages/Mybooking';
import Register from '@/pages/Register';
import UserList from '@/pages/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route path="/users/:serviceId"
          element={<UserList />}
        />

        <Route path="/bookings"
          element={<MyBookings />}
        />

      </Routes>
    </BrowserRouter>
  );
}