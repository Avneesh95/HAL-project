import { useEffect, useState } from "react";
import API from "../api";

function ManageParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/parts");
      setParts(res.data);
    } catch (err) {
      alert("Failed to load parts");
    } finally {
      setLoading(false);
    }
  };

  const deletePart = async (id) => {
    const ok = window.confirm("Delete this part?");
    if (!ok) return;

    try {
      await API.delete(`/admin/part/${id}`);
      loadParts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Rejected") return "red";
    return "orange";
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Manage Parts</h1>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
          }}
        >
          <thead>
            <tr style={{ background: "#2563eb", color: "#fff" }}>
              <th style={th}>ID</th>
              <th style={th}>Supplier</th>
              <th style={th}>Part Name</th>
              <th style={th}>Qty</th>
              <th style={th}>MFG Date</th>
              <th style={th}>Expiry</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {parts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                  No parts found
                </td>
              </tr>
            ) : (
              parts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.supplier_name}</td>
                  <td style={td}>{p.part_name}</td>
                  <td style={td}>{p.quantity}</td>
                  <td style={td}>{formatDate(p.manufacturing_date)}</td>
                  <td style={td}>{formatDate(p.expiry_date)}</td>

                  <td style={td}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        color: "white",
                        background: getStatusColor(p.status),
                      }}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td style={td}>
                    <button
                      onClick={() => deletePart(p.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
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
  );
}

const th = { padding: "12px", textAlign: "left" };
const td = { padding: "10px" };

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN");
};

export default ManageParts;