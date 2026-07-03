import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <nav
      style={{
        background: "#1f2937",
        color: "#fff",
        padding: "15px 20px",
      }}
    >
      {/* Top */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          Inventory Management System
        </Link>

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* Menu */}
      {(!isMobile || menuOpen) && (
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "15px",
            marginTop: "15px",
            alignItems: isMobile ? "flex-start" : "center",
            flexWrap: "wrap",
          }}
        >
          <Link style={linkStyle} to="/">
            Home
          </Link>

          {!token && (
            <Link style={linkStyle} to="/login">
              Login
            </Link>
          )}

          {role === "admin" && (
            <>
              <Link style={linkStyle} to="/admin/dashboard">
                Dashboard
              </Link>

              <Link style={linkStyle} to="/admin/admins">
                Admins
              </Link>

              <Link style={linkStyle} to="/admin/add-admin">
                Add Admin
              </Link>

              <Link style={linkStyle} to="/admin/suppliers">
                Suppliers
              </Link>

              <Link style={linkStyle} to="/admin/add-supplier">
                Add Supplier
              </Link>

              <Link style={linkStyle} to="/admin/pending-parts">
                Pending Parts
              </Link>
            </>
          )}

          {role === "supplier" && (
            <>
              <Link style={linkStyle} to="/supplier/dashboard">
                Dashboard
              </Link>

              <Link style={linkStyle} to="/supplier/add-part">
                Add Part
              </Link>

              <Link style={linkStyle} to="/supplier/my-parts">
                My Parts
              </Link>
            </>
          )}

          {token && (
            <>
              <span style={{ color: "#d1d5db" }}>
                Welcome, <b>{user.name || user.username || "User"}</b>
              </span>

              <button
                onClick={logout}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#b91c1c";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#dc2626";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  padding: "8px 12px",
  borderRadius: "6px",
  transition: "0.3s",
};

export default Navbar;