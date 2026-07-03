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
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load approved parts.");
    }
  };

  const filteredParts = parts.filter((part) =>
    part.part_name.toLowerCase().includes(search.toLowerCase())
  );

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
<div className="search-wrapper">
  <div className="search-box">
    <span className="search-icon">🔍</span>

    <input
      type="text"
      placeholder="Search by part name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

      {/* 💻 DESKTOP TABLE */}
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

      {/* 📱 MOBILE CARDS (OUTSIDE TABLE) */}
      <div className="mobile-list">

        {filteredParts.map((part) => (
          <div className="card" key={part.id}>

            <h3>{part.part_name}</h3>

            <div className="row">
              <span className="label">ID</span>
              <span>{part.id}</span>
            </div>

            <div className="row">
              <span className="label">Supplier</span>
              <span>{part.supplier_name}</span>
            </div>

            <div className="row">
              <span className="label">Qty</span>
              <span>{part.quantity}</span>
            </div>

            <div className="row">
              <span className="label">MFG</span>
              <span>{formatDate(part.manufacturing_date)}</span>
            </div>

            <div className="row">
              <span className="label">Expiry</span>
              <span>{formatDate(part.expiry_date)}</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;