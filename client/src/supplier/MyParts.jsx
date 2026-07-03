import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function MyParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const res = await API.get("/supplier/my-parts");
      setParts(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load parts.");
    } finally {
      setLoading(false);
    }
  };

  const deletePart = async (id) => {
    const ok = window.confirm("Delete this part?");

    if (!ok) return;

    try {
      const res = await API.delete(`/supplier/delete-part/${id}`);

      alert(res.data.message);

      loadParts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete part.");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Parts</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Part Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Manufacturing</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {parts.length === 0 ? (

            <tr>
              <td colSpan="8" align="center">
                No parts found.
              </td>
            </tr>

          ) : (

            parts.map((part) => (

              <tr key={part.id}>

                <td>{part.id}</td>

                <td>{part.part_name}</td>

                <td>{part.part_description}</td>

                <td>{part.quantity}</td>

                <td>{part.manufacturing_date}</td>

                <td>{part.expiry_date}</td>

                <td>{part.status}</td>

                <td>

                  {part.status === "Pending" && (
                    <>
                      <Link
                        to={`/supplier/edit-part/${part.id}`}
                      >
                        <button>Edit</button>
                      </Link>

                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => deletePart(part.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>
      </table>
    </div>
  );
}

export default MyParts;