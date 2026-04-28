import RegisterPage from '@/pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}