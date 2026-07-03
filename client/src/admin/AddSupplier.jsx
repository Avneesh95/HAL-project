import { useState } from "react";
import API from "../api";

function AddSupplier() {
  const [form, setForm] = useState({
    supplier_id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.supplier_id || !form.name || !form.password) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await API.post("/admin/add-supplier", form);

      alert(res.data.message);

      setForm({
        supplier_id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add supplier.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1e293b",
            fontSize: "clamp(24px, 5vw, 32px)",
          }}
        >
          Add Supplier
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600" }}>Supplier ID</label>
            <input
              type="text"
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600" }}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600" }}>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "600" }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default AddSupplier;