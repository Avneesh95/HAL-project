import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Dashboard.css";

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
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Suppliers</h3>
          <p>{stats.totalSuppliers}</p>
        </div>

        <div className="stat-card">
          <h3>Total Parts</h3>
          <p>{stats.totalParts}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Parts</h3>
          <p>{stats.pendingParts}</p>
        </div>

        <div className="stat-card">
          <h3>Approved Parts</h3>
          <p>{stats.approvedParts}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected Parts</h3>
          <p>{stats.rejectedParts}</p>
        </div>
      </div>

      <h2 className="section-title">Quick Actions</h2>

      <div className="actions-grid">
        <Link to="/admin/admins">
          <button className="action-btn">Manage Admins</button>
        </Link>

        <Link to="/admin/add-admin">
          <button className="action-btn">Add Admin</button>
        </Link>

        <Link to="/admin/suppliers">
          <button className="action-btn">Manage Suppliers</button>
        </Link>

        <Link to="/admin/add-supplier">
          <button className="action-btn">Add Supplier</button>
        </Link>

        <Link to="/admin/pending-parts">
          <button className="action-btn">Pending Parts</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;