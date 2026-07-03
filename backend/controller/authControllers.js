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
return res.json({
  message: "Login successful",
  token: token,
  role: "admin",
  user: {
    id: admin.id,
    name: admin.name,
    username: admin.username,
    email: admin.email,
  },
});
  // ==========================
  // SUPPLIER LOGIN
  // ==========================
  return res.json({
  message: "Login successful",
  token: token,
  role: "supplier",
  user: {
    id: supplier.id,
    name: supplier.name,
    supplier_id: supplier.supplier_id,
    email: supplier.email,
  },
});

  // ==========================
  // INVALID ROLE
  // ==========================
   {
    return res.status(400).json({
      message: "Invalid role",
    });
  }
};
