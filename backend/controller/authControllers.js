const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ==========================
// LOGIN
// ==========================
exports.login = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
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
          return res.status(500).json(err);
        }

        if (result.length === 0) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }

        const admin = result[0];

        // Plain text password check
        if (password !== admin.password) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }

        const token = jwt.sign(
          {
            id: admin.id,
            role: "admin",
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // Change to true after deploying with HTTPS
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.json({
          message: "Login successful",
          role: "admin",
          user: {
            id: admin.id,
            name: admin.name,
            username: admin.username,
            email: admin.email,
          },
        });
      },
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
          return res.status(500).json(err);
        }

        if (result.length === 0) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }

        const supplier = result[0];

        // Plain text password check
        if (password !== supplier.password) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }

        const token = jwt.sign(
          {
            id: supplier.id,
            role: "supplier",
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({
          message: "Login successful",
          role: "supplier",
          user: {
            id: supplier.id,
            name: supplier.name,
            supplier_id: supplier.supplier_id,
            email: supplier.email,
          },
        });
      },
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
};
