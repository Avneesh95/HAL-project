import { useEffect, useState } from "react";
import API from "../api";
import "./PendingParts.css";

function PendingParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/pending-parts");
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load pending parts.");
    } finally {
      setLoading(false);
    }
  };

  // Format Date & Time
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

  const approvePart = async (id) => {
    if (!window.confirm("Approve this part?")) return;

    try {
      const res = await API.put(`/admin/approve/${id}`);
      alert(res.data.message);
      loadParts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to approve part.");
    }
  };

  const rejectPart = async (id) => {
    if (!window.confirm("Reject this part?")) return;

    try {
      const res = await API.put(`/admin/reject/${id}`);
      alert(res.data.message);
      loadParts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to reject part.");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="pending-container">
      <h1 className="page-title">Pending Parts</h1>

      <div className="table-container">
        <table className="pending-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Part Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>MFG Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parts.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No pending parts found.
                </td>
              </tr>
            ) : (
              parts.map((part) => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.supplier_name}</td>
                  <td>{part.part_name}</td>
                  <td>{part.part_description}</td>
                  <td>{part.quantity}</td>
                  <td>{formatDate(part.manufacturing_date)}</td>
                  <td>{formatDate(part.expiry_date)}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => approvePart(part.id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => rejectPart(part.id)}
                      >
                        Reject
                      </button>
                    </div>
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

export default PendingParts;