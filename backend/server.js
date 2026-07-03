require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const partRoutes = require("./routes/pathRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// Middleware FIRST
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Inventory Management API Running");
});

// Routes AFTER middleware
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/parts", partRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});