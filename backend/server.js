require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

/* ============================
   DATABASE CONNECTION
============================ */
connectDB();

/* ============================
   MIDDLEWARES
============================ */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

/* ============================
   STATIC FILES
============================ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ============================
   API ROUTES
============================ */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

/* ============================
   HEALTH CHECK
============================ */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Digital Library API running",
    product: "Smart Digital Library",
    version: "1.0.0",
  });
});

/* ============================
   404 HANDLER
============================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* ============================
   GLOBAL ERROR HANDLER
============================ */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* ============================
   START SERVER
============================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});