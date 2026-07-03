import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditPart() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    part_name: "",
    part_description: "",
    quantity: "",
    manufacturing_date: "",
    expiry_date: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPart();
  }, []);

  const formatInputDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const loadPart = async () => {
    try {
      const res = await API.get(`/supplier/part/${id}`);

      setForm({
        ...res.data,
        manufacturing_date: formatInputDate(res.data.manufacturing_date),
        expiry_date: formatInputDate(res.data.expiry_date),
      });
    } catch (err) {
      alert("Unable to load part.");
      navigate("/supplier/my-parts");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/supplier/update-part/${id}`, form);

      alert(res.data.message);
      navigate("/supplier/my-parts");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "90%",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        Edit Part
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label>Part Name</label>
          <input
            type="text"
            name="part_name"
            value={form.part_name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label>Description</label>
          <textarea
            name="part_description"
            value={form.part_description}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label>Manufacturing Date</label>
          <input
            type="date"
            name="manufacturing_date"
            value={form.manufacturing_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label>Expiry Date</label>
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
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#1d4ed8";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#2563eb";
          }}
        >
          Update Part
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  boxSizing: "border-box",
};

export default EditPart;