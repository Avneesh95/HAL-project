import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./admin/Dashboard";
import SupplierDashboard from "./supplier/Dashboard";

// ADMIN PAGES
import Admins from "./admin/Admins";
import AddAdmin from "./admin/AddAdmin";
import Suppliers from "./admin/Supplier";
import AddSupplier from "./admin/AddSupplier";
import PendingParts from "./admin/pendingPart";
import ManageParts from "./admin/ManageParts";

// PROTECTED ROUTE
import ProtectedRoute from "./component/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
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
          path="/admin/add-admin"
          element={
            <ProtectedRoute role="admin">
              <AddAdmin />
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
          path="/admin/add-supplier"
          element={
            <ProtectedRoute role="admin">
              <AddSupplier />
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

        <Route
          path="/admin/manage-parts"
          element={
            <ProtectedRoute role="admin">
              <ManageParts />
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;