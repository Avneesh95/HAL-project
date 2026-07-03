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

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    const date = new Date(dateTime);

    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} | ${formattedTime}`;
  };

  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm("Delete this supplier?");

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/admin/supplier/${id}`);

      alert(res.data.message);
      loadSuppliers();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete supplier.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#f8fafc",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            color: "#1e293b",
            textAlign: "center",
            fontSize: "clamp(24px,4vw,34px)",
          }}
        >
          Manage Suppliers
        </h1>

        <div
          style={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "900px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#2563eb", color: "#fff" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Supplier ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Created At</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <td style={tdStyle}>{supplier.id}</td>
                    <td style={tdStyle}>{supplier.supplier_id}</td>
                    <td style={tdStyle}>{supplier.name}</td>
                    <td style={tdStyle}>{supplier.email}</td>
                    <td style={tdStyle}>{supplier.phone}</td>
                    <td style={tdStyle}>
                      {formatDateTime(supplier.created_at)}
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => deleteSupplier(supplier.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "8px 15px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
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
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  whiteSpace: "nowrap",
};

export default Suppliers;