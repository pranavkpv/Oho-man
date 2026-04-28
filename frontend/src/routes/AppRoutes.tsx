import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}