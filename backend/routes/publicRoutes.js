const express = require("express");
const router = express.Router();

const publicController = require("../controller/publicController");

router.get(
    "/approved-parts",
    publicController.getApprovedParts
);

module.exports = router;