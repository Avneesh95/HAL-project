import { useEffect, useState } from "react";
import API from "../api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/suppliers");

      setSuppliers(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load suppliers.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/admin/supplier/${id}`);

      alert(res.data.message);

      loadSuppliers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete supplier."
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Suppliers</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan="7" align="center">
                No suppliers found.
              </td>
            </tr>
          ) : (
            suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.supplier_id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.created_at}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteSupplier(supplier.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;