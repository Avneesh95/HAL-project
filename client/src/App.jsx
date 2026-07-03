import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar"; // 👈 ADD THIS

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./admin/Dashboard";
import SupplierDashboard from "./supplier/Dashboard";

import ProtectedRoute from "./component/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 ADD NAVBAR HERE */}
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* SUPPLIER ROUTES */}
        <Route
          path="/supplier/dashboard"
          element={
            <ProtectedRoute role="supplier">
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;