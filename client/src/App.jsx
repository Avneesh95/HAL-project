


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";

// Admin
import Dashboard from "./admin/Dashboard";
import AddAdmin from "./admin/AddAdmin";
import Admins from "./admin/Admins";
import AddSupplier from "./admin/AddSupplier";
import Suppliers from "./admin/Supplier";
import PendingParts from "./admin/pendingPart";

// Supplier
import SupplierDashboard from "./supplier/Dashboard";
import AddPart from "./supplier/AddPart";
import MyParts from "./supplier/MyParts";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        {/* ADMIN */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-admin"
          element={
            <ProtectedRoute role="admin">
              <AddAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute role="admin">
              <Admins />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-supplier"
          element={
            <ProtectedRoute role="admin">
              <AddSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/suppliers"
          element={
            <ProtectedRoute role="admin">
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pending-parts"
          element={
            <ProtectedRoute role="admin">
              <PendingParts />
            </ProtectedRoute>
          }
        />

        {/* SUPPLIER */}

        <Route
          path="/supplier/dashboard"
          element={
            <ProtectedRoute role="supplier">
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier/add-part"
          element={
            <ProtectedRoute role="supplier">
              <AddPart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier/my-parts"
          element={
            <ProtectedRoute role="supplier">
              <MyParts />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;