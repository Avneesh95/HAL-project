const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Part Routes Working"
  });
});

module.exports = router;