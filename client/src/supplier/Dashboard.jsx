import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalParts: 0,
    pendingParts: 0,
    approvedParts: 0,
    rejectedParts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/supplier/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supplier Dashboard</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <tbody>
          <tr>
            <td><b>Total Parts</b></td>
            <td>{stats.totalParts}</td>
          </tr>

          <tr>
            <td><b>Pending Parts</b></td>
            <td>{stats.pendingParts}</td>
          </tr>

          <tr>
            <td><b>Approved Parts</b></td>
            <td>{stats.approvedParts}</td>
          </tr>

          <tr>
            <td><b>Rejected Parts</b></td>
            <td>{stats.rejectedParts}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>
        Quick Actions
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <Link to="/supplier/add-part">
          <button>Add Part</button>
        </Link>

        <Link to="/supplier/my-parts">
          <button>My Parts</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;