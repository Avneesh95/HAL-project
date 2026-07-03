import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/supplier/dashboard");
      }

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(135deg, #4f46e5, #3b82f6, #06b6d4)",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Center Content */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            padding: "30px",
            borderRadius: "18px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "#1e293b",
              fontSize: "clamp(28px, 5vw, 36px)",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "30px",
              fontSize: "clamp(14px, 2vw, 16px)",
            }}
          >
            Login to Inventory Management System
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontWeight: "600",
                  color: "#334155",
                }}
              >
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "13px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                <option value="admin">Admin</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontWeight: "600",
                  color: "#334155",
                }}
              >
                {form.role === "admin" ? "Username" : "Supplier ID"}
              </label>

              <input
                type="text"
                name="username"
                placeholder={
                  form.role === "admin" ? "Enter Username" : "Enter Supplier ID"
                }
                value={form.username}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "13px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  fontWeight: "600",
                  color: "#334155",
                }}
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "13px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          padding: "20px 10px 10px",
          boxSizing: "border-box",
        }}
      >
        © 2026 | Created by <strong>Vartika Singh</strong>
      </div>
    </div>
  );
}

export default Login;
