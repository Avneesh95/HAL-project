const db = require("../config/db");
const bcrypt = require("bcrypt");

;





// ==========================
// GET ALL ADMINS
// ==========================
exports.getAdmins = (req, res) => {

  db.query(
    `SELECT
      id,
      name,
      username,
      email,
      created_at
     FROM admins
     ORDER BY id DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );

};



// =========================
// GET ALL SUPPLIERS
// =========================
exports.getSuppliers = (req, res) => {

    const sql = `
        SELECT
            id,
            supplier_id,
            name,
            email,
            phone,
            created_at
        FROM suppliers
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// =========================
// GET DASHBOARD STATS
// =========================
exports.dashboard = (req, res) => {

    const stats = {};

    db.query(
        "SELECT COUNT(*) totalSuppliers FROM suppliers",
        (err, result1) => {

            if (err) return res.status(500).json(err);

            stats.totalSuppliers = result1[0].totalSuppliers;

            db.query(
                "SELECT COUNT(*) totalParts FROM parts",
                (err, result2) => {

                    if (err) return res.status(500).json(err);

                    stats.totalParts = result2[0].totalParts;

                    db.query(
                        "SELECT COUNT(*) pendingParts FROM parts WHERE status='Pending'",
                        (err, result3) => {

                            if (err) return res.status(500).json(err);

                            stats.pendingParts = result3[0].pendingParts;

                            db.query(
                                "SELECT COUNT(*) approvedParts FROM parts WHERE status='Approved'",
                                (err, result4) => {

                                    if (err) return res.status(500).json(err);

                                    stats.approvedParts = result4[0].approvedParts;

                                    db.query(
                                        "SELECT COUNT(*) rejectedParts FROM parts WHERE status='Rejected'",
                                        (err, result5) => {

                                            if (err)
                                                return res.status(500).json(err);

                                            stats.rejectedParts =
                                                result5[0].rejectedParts;

                                            res.json(stats);

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};


// =========================
// ADD ADMIN
// =========================
exports.addAdmin = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
    } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    db.query(
      "SELECT * FROM admins WHERE username=?",
      [username],
      async (err, result) => {

        if (err)
          return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({
            message: "Username already exists",
          });
        }

        const hashedPassword =
          await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO admins
          (name,username,email,password,created_by)
          VALUES(?,?,?,?,?)`,
          [
            name,
            username,
            email,
            hashedPassword,
            req.user.id,
          ],
          (err) => {

            if (err)
              return res.status(500).json(err);

            res.json({
              message: "Admin added successfully",
            });

          }
        );

      }
    );

  } catch (err) {

    res.status(500).json(err);

  }
};

// ==========================
// DELETE SUPPLIER
// ==========================
exports.deleteSupplier = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM suppliers WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Supplier not found",
        });
      }

      res.json({
        message: "Supplier deleted successfully",
      });
    }
  );
};


// ==========================
// DELETE ADMIN
// ==========================
exports.deleteAdmin = (req, res) => {
  const { id } = req.params;

  // Prevent deleting yourself
  if (Number(id) === req.user.id) {
    return res.status(400).json({
      message: "You cannot delete your own account.",
    });
  }

  // Check total admins
  db.query(
    "SELECT COUNT(*) AS total FROM admins",
    (err, countResult) => {
      if (err) return res.status(500).json(err);

      if (countResult[0].total <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin.",
        });
      }

      db.query(
        "DELETE FROM admins WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return res.status(500).json(err);

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "Admin not found",
            });
          }

          res.json({
            message: "Admin deleted successfully",
          });
        }
      );
    }
  );
};


// ==========================
// DELETE ADMIN
// ==========================
exports.deleteAdmin = (req, res) => {
  const { id } = req.params;

  // Prevent deleting yourself
  if (Number(id) === req.user.id) {
    return res.status(400).json({
      message: "You cannot delete your own account.",
    });
  }

  // Check total admins
  db.query(
    "SELECT COUNT(*) AS total FROM admins",
    (err, countResult) => {
      if (err) return res.status(500).json(err);

      if (countResult[0].total <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin.",
        });
      }

      db.query(
        "DELETE FROM admins WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return res.status(500).json(err);

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "Admin not found",
            });
          }

          res.json({
            message: "Admin deleted successfully",
          });
        }
      );
    }
  );
};


// ==========================
// DELETE ADMIN
// ==========================
exports.deleteAdmin = (req, res) => {
  const { id } = req.params;

  // Prevent deleting yourself
  if (Number(id) === req.user.id) {
    return res.status(400).json({
      message: "You cannot delete your own account.",
    });
  }

  // Check total admins
  db.query(
    "SELECT COUNT(*) AS total FROM admins",
    (err, countResult) => {
      if (err) return res.status(500).json(err);

      if (countResult[0].total <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin.",
        });
      }

      db.query(
        "DELETE FROM admins WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return res.status(500).json(err);

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "Admin not found",
            });
          }

          res.json({
            message: "Admin deleted successfully",
          });
        }
      );
    }
  );
};


// ==========================
// ADD SUPPLIER
// ==========================
exports.addSupplier = (req, res) => {
  const {
    supplier_id,
    name,
    email,
    phone,
    password,
  } = req.body;

  if (!supplier_id || !name || !password) {
    return res.status(400).json({
      message: "Please fill all required fields",
    });
  }

  // Check if supplier already exists
  db.query(
    "SELECT * FROM suppliers WHERE supplier_id=?",
    [supplier_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({
          message: "Supplier already exists",
        });
      }

      db.query(
        `INSERT INTO suppliers
        (supplier_id,name,email,phone,password,created_by)
        VALUES(?,?,?,?,?,?)`,
        [
          supplier_id,
          name,
          email,
          phone,
          password,
          req.user.id,
        ],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({
            message: "Supplier added successfully",
          });
        }
      );
    }
  );
};



// ==========================
// GET PENDING PARTS
// ==========================
exports.getPendingParts = (req, res) => {

    const sql = `
    SELECT
        parts.id,
        suppliers.supplier_id,
        suppliers.name AS supplier_name,
        parts.part_name,
        parts.part_description,
        parts.quantity,
        parts.manufacturing_date,
        parts.expiry_date,
        parts.status,
        parts.created_at

    FROM parts

    INNER JOIN suppliers
    ON suppliers.id = parts.supplier_id

    WHERE parts.status='Pending'

    ORDER BY parts.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

// ==========================
// APPROVE PART
// ==========================
exports.approvePart = (req, res) => {

    const { id } = req.params;

    db.query(
        `UPDATE parts
        SET
            status='Approved',
            approved_by=?,
            approved_at=NOW()
        WHERE id=?`,
        [req.user.id, id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Part not found",
                });
            }

            res.json({
                message: "Part approved successfully",
            });

        }
    );

};



// ==========================
// REJECT PART
// ==========================
exports.rejectPart = (req, res) => {

    const { id } = req.params;

    db.query(
        `UPDATE parts
        SET
            status='Rejected',
            approved_by=?,
            approved_at=NOW()
        WHERE id=?`,
        [req.user.id, id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Part not found",
                });
            }

            res.json({
                message: "Part rejected successfully",
            });

        }
    );

};


//UPDATE QUANTITY



exports.updateQuantity = (req, res) => {
  const id = req.params.id;
  const { action } = req.body; // "increase" or "decrease"

  let sql = "";

  if (action === "increase") {
    sql = "UPDATE parts SET quantity = quantity + 1 WHERE id = ?";
  } else if (action === "decrease") {
    sql = "UPDATE parts SET quantity = GREATEST(quantity - 1, 0) WHERE id = ?";
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating quantity",
        error: err,
      });
    }

    return res.json({
      message: "Quantity updated successfully",
    });
  });
};



// GET ALL PARTS

exports.getAllParts = (req, res) => {
  const sql = `
    SELECT 
      parts.id,
      suppliers.name AS supplier_name,
      parts.part_name,
      parts.quantity,
      parts.manufacturing_date,
      parts.expiry_date,
      parts.status,
      parts.created_at
    FROM parts
    JOIN suppliers ON suppliers.id = parts.supplier_id
    ORDER BY parts.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error", err });
    }

    res.json(result);
  });
};