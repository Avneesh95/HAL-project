import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function MyParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const res = await API.get("/supplier/my-parts");
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load parts.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateTime) => {
    if (!dateTime) return "-";

    const d = new Date(dateTime);

    const date = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const time = d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${date} | ${time}`;
  };

  const deletePart = async (id) => {
    const ok = window.confirm("Delete this part?");

    if (!ok) return;

    try {
      const res = await API.delete(`/supplier/delete-part/${id}`);

      alert(res.data.message);

      loadParts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete part.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px",
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
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        My Parts
      </h1>

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "1000px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#2563eb", color: "#fff" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Part Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Manufacturing</th>
              <th style={thStyle}>Expiry</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No parts found.
                </td>
              </tr>
            ) : (
              parts.map((part) => (
                <tr key={part.id}>
                  <td style={tdStyle}>{part.id}</td>
                  <td style={tdStyle}>{part.part_name}</td>
                  <td style={tdStyle}>{part.part_description}</td>
                  <td style={tdStyle}>{part.quantity}</td>
                  <td style={tdStyle}>{formatDate(part.manufacturing_date)}</td>
                  <td style={tdStyle}>{formatDate(part.expiry_date)}</td>
                  <td style={tdStyle}>{part.status}</td>

                  <td style={tdStyle}>
                    {part.status === "Pending" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* {/* <Link to={`/supplier/edit-part/${part.id}`}>
                          <button
                            style={editBtn}
                            onMouseEnter={(e) => {
                              e.target.style.background = "#1d4ed8";
                              e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = "#2563eb";
                              e.target.style.transform = "translateY(0)";
                            }}
                          >
                            Edit
                          </button> 
                        </Link> */}

                        <button
                          style={deleteBtn}
                          onClick={() => deletePart(part.id)}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#b91c1c";
                            e.target.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "#dc2626";
                            e.target.style.transform = "translateY(0)";
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
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

const thStyle = {
  padding: "14px",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
};

export default MyParts;