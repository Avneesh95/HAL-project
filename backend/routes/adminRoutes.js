const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminController = require("../controller/adminController");

// Dashboard
router.get(
    "/dashboard",
    auth("admin"),
    adminController.dashboard
);

// Get all admins
router.get(
  "/admins",
  auth("admin"),
  adminController.getAdmins
);

// Delete supplier
router.delete(
  "/supplier/:id",
  auth("admin"),
  adminController.deleteSupplier
);


router.get(
    "/pending-parts",
    auth("admin"),
    adminController.getPendingParts
);


router.put(
    "/approve/:id",
    auth("admin"),
    adminController.approvePart
);

router.put(
    "/reject/:id",
    auth("admin"),
    adminController.rejectPart
);

// Delete admin
router.delete(
  "/admin/:id",
  auth("admin"),
  adminController.deleteAdmin
);

// Add Supplier
router.post(
    "/add-supplier",
    auth("admin"),
    adminController.addSupplier
);

// Get Suppliers
router.get(
    "/suppliers",
    auth("admin"),
    adminController.getSuppliers
);


router.post(
  "/add-admin",
  auth("admin"),
  adminController.addAdmin
);



router.get(
  "/parts",
  auth("admin"),
  adminController.getAllParts
);

module.exports = router;