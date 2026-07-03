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

  const loadPart = async () => {
    try {
      const res = await API.get(`/supplier/part/${id}`);
      setForm(res.data);
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
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ width: "500px", margin: "30px auto" }}>
      <h2>Edit Part</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Part Name</label>
          <input
            type="text"
            name="part_name"
            value={form.part_name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="part_description"
            value={form.part_description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Manufacturing Date</label>
          <input
            type="date"
            name="manufacturing_date"
            value={form.manufacturing_date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Update Part
        </button>
      </form>
    </div>
  );
}

export default EditPart;