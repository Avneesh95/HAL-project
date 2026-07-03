import { useState } from "react";
import API from "../api";

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

    if (
      !form.name ||
      !form.username ||
      !form.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await API.post(
        "/admin/add-admin",
        form
      );

      alert(res.data.message);

      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to add admin."
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
      <h2>Add New Admin</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
            }}
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
            style={{
              width: "100%",
              padding: "8px",
            }}
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
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
          }}
        >
          Add Admin
        </button>

      </form>
    </div>
  );
}

export default AddAdmin;