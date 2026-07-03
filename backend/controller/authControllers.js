const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ==========================
// LOGIN CONTROLLER
// ==========================
exports.login = (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not defined in environment variables",
      });
    }

    // ==========================
    // ADMIN LOGIN
    // ==========================
    if (role === "admin") {
      db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        (err, result) => {
          if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({
              message: "Database error",
            });
          }

          if (!result || result.length === 0) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }

          const admin = result[0];

          if (password !== admin.password) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }

          const token = jwt.sign(
            { id: admin.id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          return res.json({
            message: "Login successful",
            token,
            role: "admin",
            user: {
              id: admin.id,
              name: admin.name,
              username: admin.username,
              email: admin.email,
            },
          });
        }
      );
    }

    // ==========================
    // SUPPLIER LOGIN
    // ==========================
    else if (role === "supplier") {
      db.query(
        "SELECT * FROM suppliers WHERE supplier_id = ?",
        [username],
        (err, result) => {
          if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({
              message: "Database error",
            });
          }

          if (!result || result.length === 0) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }

          const supplier = result[0];

          if (password !== supplier.password) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }

          const token = jwt.sign(
            { id: supplier.id, role: "supplier" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          return res.json({
            message: "Login successful",
            token,
            role: "supplier",
            user: {
              id: supplier.id,
              name: supplier.name,
              supplier_id: supplier.supplier_id,
              email: supplier.email,
            },
          });
        }
      );
    }

    // ==========================
    // INVALID ROLE
    // ==========================
    else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

  } catch (error) {
    console.log("LOGIN CRASH:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};