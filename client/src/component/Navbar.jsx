import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#1f2937",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Inventory System
      </Link>

      {/* LEFT MENU */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <Link style={linkStyle} to="/">
          Home
        </Link>

        {/* SHOW LOGIN ONLY IF NOT LOGGED IN */}
        {!token && (
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        )}

        {/* ADMIN MENU */}
        {token && role === "admin" && (
          <>
            <Link style={linkStyle} to="/admin/dashboard">
              Dashboard
            </Link>
            <Link style={linkStyle} to="/admin/suppliers">
              Suppliers
            </Link>
            <Link style={linkStyle} to="/admin/pending-parts">
              Pending Parts
            </Link>
          </>
        )}

        {/* SUPPLIER MENU */}
        {token && role === "supplier" && (
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

      {/* RIGHT SIDE USER */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {token ? (
          <>
            <span>Welcome 👋</span>
            <button
              onClick={logout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : null}
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