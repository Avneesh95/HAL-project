import { useEffect, useState } from "react";
import API from "../api";
import "./Home.css";

function Home() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const res = await API.get("/public/approved-parts");
      console.log(res.data); // Check API response in browser console
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load approved parts.");
    }
  };

  // Format Date & Time
 
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
            {parts.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No approved parts found.
                </td>
              </tr>
            ) : (
              parts.map((part) => (
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