import { useState } from "react";
import API from "../api";

function AddPart() {
  const [form, setForm] = useState({
    part_name: "",
    part_description: "",
    quantity: "",
    manufacturing_date: "",
    expiry_date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.part_name ||
      !form.quantity ||
      !form.manufacturing_date ||
      !form.expiry_date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await API.post("/supplier/add-part", form);

      alert(res.data.message);

      setForm({
        part_name: "",
        part_description: "",
        quantity: "",
        manufacturing_date: "",
        expiry_date: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to add part."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "90%",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        Add New Part
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Part Name</label>

          <input
            type="text"
            name="part_name"
            value={form.part_name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Description</label>

          <textarea
            name="part_description"
            value={form.part_description}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Manufacturing Date</label>

          <input
            type="date"
            name="manufacturing_date"
            value={form.manufacturing_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Expiry Date</label>

          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#1d4ed8";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#2563eb";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Add Part
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default AddPart;