import { useState } from "react";
import API from "../api";
import "./AddAdmin.css";

function AddAdmin() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
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

    if (!form.name || !form.username || !form.password) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await API.post("/admin/add-admin", form);

      alert(res.data.message);

      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add admin.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Add New Admin</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;