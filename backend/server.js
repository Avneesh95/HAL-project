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

// ================= CORS =================

const allowedOrigins = [
  "http://localhost:5173",
  "https://vartikaproject.netlify.app",
  "https://varshikahalproject.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


// ================= Middlewares =================

app.use(express.json());
app.use(cookieParser());

// ================= Routes =================

app.get("/", (req, res) => {
  res.send("Inventory Management API Running");
});

app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/parts", partRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});