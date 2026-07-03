import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;