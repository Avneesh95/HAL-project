import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#1f2937",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Inventory Management System
        </Link>
      </div>

      {/* Menu */}

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link style={linkStyle} to="/">
          Home
        </Link>

        {!token && (
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        )}

        {/* Admin Menu */}

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

        {/* Supplier Menu */}

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
      </div>

      {/* User */}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {token && (
          <>
            <span>
              Welcome, <b>{user.name || user.username || "User"}</b>
            </span>

            <button
              onClick={logout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;