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

    if (
      !form.supplier_id ||
      !form.name ||
      !form.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await API.post(
        "/admin/add-supplier",
        form
      );

      alert(res.data.message);

      setForm({
        supplier_id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to add supplier."
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
      <h2>Add Supplier</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <label>Supplier ID</label>
          <br />
          <input
            type="text"
            name="supplier_id"
            value={form.supplier_id}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
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
          Add Supplier
        </button>

      </form>
    </div>
  );
}

export default AddSupplier;