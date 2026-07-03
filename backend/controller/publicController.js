const db = require("../config/db");

// ==========================
// GET APPROVED PARTS + SEARCH
// ==========================
exports.getApprovedParts = (req, res) => {
  const search = req.query.search || "";

  let sql = `
    SELECT
        parts.id,
        suppliers.supplier_id,
        suppliers.name AS supplier_name,
        parts.part_name,
        parts.quantity,
        parts.manufacturing_date,
        parts.expiry_date,
        parts.created_at
    FROM parts
    JOIN suppliers
        ON suppliers.id = parts.supplier_id
    WHERE parts.status = 'Approved'
  `;

  const params = [];

  if (search) {
    sql += ` AND parts.part_name LIKE ?`;
    params.push(`%${search}%`);
  }

  sql += ` ORDER BY parts.created_at DESC`;

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server error",
        err,
      });
    }

    res.json(result);
  });
};