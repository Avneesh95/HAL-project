require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const partRoutes = require("./routes/pathRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// CORS CONFIG

const allowedOrigins = [
  "http://localhost:5173",
  "https://varshikahalproject.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman/mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.options("*", cors());



app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Inventory Management API Running");
});

// Routes
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/parts", partRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});