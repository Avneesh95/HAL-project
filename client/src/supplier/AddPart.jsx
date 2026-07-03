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
        width: "500px",
        margin: "30px auto",
      }}
    >
      <h2>Add New Part</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Part Name</label>
          <br />
          <input
            type="text"
            name="part_name"
            value={form.part_name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <br />
          <textarea
            name="part_description"
            value={form.part_description}
            onChange={handleChange}
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Manufacturing Date</label>
          <br />
          <input
            type="date"
            name="manufacturing_date"
            value={form.manufacturing_date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Expiry Date</label>
          <br />
          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
          }}
        >
          Add Part
        </button>
      </form>
    </div>
  );
}

export default AddPart;