const db = require("../config/db");

// ==========================
// GET APPROVED PARTS
// ==========================
exports.getApprovedParts = (req, res) => {

    const sql = `
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

        WHERE parts.status='Approved'

        ORDER BY parts.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};