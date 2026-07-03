import { useEffect, useState } from "react";
import API from "../api";

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
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Admins</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
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
              <td colSpan="6" align="center">
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
                <td>{admin.created_at}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteAdmin(admin.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admins;