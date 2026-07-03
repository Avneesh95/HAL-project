import { useEffect, useState } from "react";
import API from "../api";
import "./Home.css";

function Home() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const res = await API.get("/public/approved-parts");
      console.log(res.data);
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load approved parts.");
    }
  };

  // 🔍 SEARCH FILTER
  const filteredParts = parts.filter((part) =>
    part.part_name.toLowerCase().includes(search.toLowerCase())
  );

  // Format Date
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="home-container">

      <h2 className="title">Approved Inventory Parts</h2>

      {/* 🔍 SEARCH BAR */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by part name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "60%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>

      <div className="table-container">
        <table className="parts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Manufacturing Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredParts.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No matching parts found.
                </td>
              </tr>
            ) : (
              filteredParts.map((part) => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.supplier_id}</td>
                  <td>{part.supplier_name}</td>
                  <td>{part.part_name}</td>
                  <td>{part.quantity}</td>
                  <td>{formatDate(part.manufacturing_date)}</td>
                  <td>{formatDate(part.expiry_date)}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Home;