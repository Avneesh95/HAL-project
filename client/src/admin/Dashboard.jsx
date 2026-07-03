import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalSuppliers: 0,
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
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <tbody>
          <tr>
            <td><b>Total Suppliers</b></td>
            <td>{stats.totalSuppliers}</td>
          </tr>

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

      <h2 style={{ marginTop: "30px" }}>Quick Actions</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <Link to="/admin/admins">
          <button>Manage Admins</button>
        </Link>

        <Link to="/admin/add-admin">
          <button>Add Admin</button>
        </Link>

        <Link to="/admin/suppliers">
          <button>Manage Suppliers</button>
        </Link>

        <Link to="/admin/add-supplier">
          <button>Add Supplier</button>
        </Link>

        <Link to="/admin/pending-parts">
          <button>Pending Parts</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;