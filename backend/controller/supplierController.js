const db = require("../config/db");

// ==========================
// SUPPLIER DASHBOARD
// ==========================
exports.dashboard = (req, res) => {

    const supplierId = req.user.id;

    const data = {};

    db.query(
        "SELECT COUNT(*) totalParts FROM parts WHERE supplier_id=?",
        [supplierId],
        (err, result1) => {

            if (err) return res.status(500).json(err);

            data.totalParts = result1[0].totalParts;

            db.query(
                "SELECT COUNT(*) pendingParts FROM parts WHERE supplier_id=? AND status='Pending'",
                [supplierId],
                (err, result2) => {

                    if (err) return res.status(500).json(err);

                    data.pendingParts = result2[0].pendingParts;

                    db.query(
                        "SELECT COUNT(*) approvedParts FROM parts WHERE supplier_id=? AND status='Approved'",
                        [supplierId],
                        (err, result3) => {

                            if (err) return res.status(500).json(err);

                            data.approvedParts = result3[0].approvedParts;

                            db.query(
                                "SELECT COUNT(*) rejectedParts FROM parts WHERE supplier_id=? AND status='Rejected'",
                                [supplierId],
                                (err, result4) => {

                                    if (err) return res.status(500).json(err);

                                    data.rejectedParts =
                                        result4[0].rejectedParts;

                                    res.json(data);

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};

// ==========================
// ADD PART
// ==========================
exports.addPart = (req, res) => {

    const {
        part_name,
        part_description,
        quantity,
        manufacturing_date,
        expiry_date,
    } = req.body;

    db.query(
        `INSERT INTO parts
        (
            supplier_id,
            part_name,
            part_description,
            quantity,
            manufacturing_date,
            expiry_date
        )
        VALUES(?,?,?,?,?,?)`,
        [
            req.user.id,
            part_name,
            part_description,
            quantity,
            manufacturing_date,
            expiry_date,
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Part added successfully",
            });

        }
    );

};

// ==========================
// MY PARTS
// ==========================
exports.myParts = (req, res) => {

    db.query(
        `SELECT *
        FROM parts
        WHERE supplier_id=?
        ORDER BY created_at DESC`,
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};


// ==========================
// EDIT PART
// ==========================
exports.editPart = (req, res) => {

    const { id } = req.params;

    const {
        part_name,
        part_description,
        quantity,
        manufacturing_date,
        expiry_date,
    } = req.body;

    db.query(
        `UPDATE parts
        SET
            part_name=?,
            part_description=?,
            quantity=?,
            manufacturing_date=?,
            expiry_date=?
        WHERE
            id=?
        AND supplier_id=?
        AND status='Pending'`,
        [
            part_name,
            part_description,
            quantity,
            manufacturing_date,
            expiry_date,
            id,
            req.user.id,
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {

                return res.status(400).json({
                    message:
                        "Part not found or cannot be edited",
                });

            }

            res.json({
                message: "Part updated successfully",
            });

        }
    );

};





// ==========================
// DELETE PART
// ==========================
exports.deletePart = (req, res) => {

    const { id } = req.params;

    db.query(
        `DELETE FROM parts
        WHERE
            id=?
        AND supplier_id=?
        AND status='Pending'`,
        [
            id,
            req.user.id,
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {

                return res.status(400).json({
                    message:
                        "Part not found or cannot be deleted",
                });

            }

            res.json({
                message: "Part deleted successfully",
            });

        }
    );

};



