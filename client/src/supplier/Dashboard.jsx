import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Dashboard.css";

import { FaBoxes, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Supplier Dashboard 📦
      </h1>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <FaBoxes className="stat-icon" />
          <h3>Total Parts</h3>
          <p>{stats.totalParts}</p>
        </div>

        <div className="stat-card orange">
          <FaClock className="stat-icon" />
          <h3>Pending Parts</h3>
          <p>{stats.pendingParts}</p>
        </div>

        <div className="stat-card green">
          <FaCheckCircle className="stat-icon" />
          <h3>Approved Parts</h3>
          <p>{stats.approvedParts}</p>
        </div>

        <div className="stat-card red">
          <FaTimesCircle className="stat-icon" />
          <h3>Rejected Parts</h3>
          <p>{stats.rejectedParts}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="section-title">Quick Actions</h2>

      <div className="actions-grid">
        <Link to="/supplier/add-part">
          <button className="action-btn">➕ Add Part</button>
        </Link>

        <Link to="/supplier/my-parts">
          <button className="action-btn">📦 My Parts</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;