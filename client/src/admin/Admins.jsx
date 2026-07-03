import { useEffect, useState } from "react";
import API from "../api";
import "./Admins.css";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/admins");
      setAdmins(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load admins.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    const date = new Date(dateTime);

    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} | ${formattedTime}`;
  };

  const deleteAdmin = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!ok) return;

    try {
      const res = await API.delete(`/admin/admin/${id}`);

      alert(res.data.message);
      loadAdmins();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete admin."
      );
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="admins-container">
      <h1 className="admins-title">Manage Admins</h1>

      <div className="table-container">
        <table className="admins-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No admins found.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{formatDateTime(admin.created_at)}</td>

                  <td>
                    {admin.username === "admin" ? (
                      <button
                        className="delete-btn"
                        disabled
                        style={{
                          background: "#9ca3af",
                          color: "#fff",
                          cursor: "not-allowed",
                          opacity: 0.7,
                        }}
                      >
                        Protected
                      </button>
                    ) : (
                      <button
                        className="delete-btn"
                        onClick={() => deleteAdmin(admin.id)}
                      >
                        Delete
                      </button>
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

export default Admins;