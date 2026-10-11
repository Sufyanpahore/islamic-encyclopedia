const express = require("express");

const router = express.Router();

// Liveness + dataset inventory. Real resources (surahs, hadith books) get
// their own routers as the controllers/models land.
router.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "islamic-encyclopedia-api",
    datasets: ["quran (SQLite)", "hadith (JSON)"],
  });
});

module.exports = router;
