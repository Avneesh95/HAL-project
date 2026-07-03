const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const supplierController = require("../controller/supplierController");

// Dashboard
router.get(
    "/dashboard",
    auth("supplier"),
    supplierController.dashboard
);

// Add Part
router.post(
    "/add-part",
    auth("supplier"),
    supplierController.addPart
);

// My Parts
router.get(
    "/my-parts",
    auth("supplier"),
    supplierController.myParts
);


// Edit Part
router.put(
    "/edit-part/:id",
    auth("supplier"),
    supplierController.editPart
);

// Delete Part
router.delete(
    "/delete-part/:id",
    auth("supplier"),
    supplierController.deletePart
);



module.exports = router;