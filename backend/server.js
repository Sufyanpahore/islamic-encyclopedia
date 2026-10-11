const express = require("express");
const cors = require("cors");
require("dotenv").config();

let connectDB;
try {
  connectDB = require("./config/db").connectDB;
} catch (err) {
  console.error("Could not load dependencies. Run  inside backend/ and start the server from there:", err.message);
  process.exit(1);
}
if (typeof connectDB !== "function") {
  console.error("config/db.js failed to initialize (missing mongoose?). Run  inside backend/.");
  process.exit(1);
}
const apiRoutes = require("./routes/index");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", apiRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// ── Central error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection failed; starting API without DB:", err.message);
    app.listen(PORT, () => console.log(`API (degraded, no DB) on http://localhost:${PORT}`));
  });
