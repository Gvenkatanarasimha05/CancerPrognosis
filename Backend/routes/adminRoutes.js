const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const { getPendingDoctors, approveDoctor, rejectDoctor } = require("../controllers/adminController");

// Get all pending doctors
router.get("/pending-doctors", protect, adminOnly, getPendingDoctors);

// Approve doctor
router.put("/approve-doctor/:id", protect, adminOnly, approveDoctor);

// Reject doctor
router.put("/reject-doctor/:id", protect, adminOnly, rejectDoctor);

module.exports = router;
