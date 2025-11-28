const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
} = require("../controllers/adminController");
const User = require("../models/User");

router.get("/pending-doctors", protect, adminOnly, getPendingDoctors);

router.put("/approve-doctor/:id", protect, adminOnly, approveDoctor);

router.put("/reject-doctor/:id", protect, adminOnly, rejectDoctor);

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const total = await User.countDocuments();
    const patients = await User.countDocuments({ role: "patient" });
    const doctors = await User.countDocuments({ role: "doctor" });
    const admins = await User.countDocuments({ role: "admin" });

    res.json({ total, patients, doctors, admins });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", protect, adminOnly, async (req, res) => {
  const { search = "", role = "" } = req.query;

  try {
    const query = {};

    if (search) {
      query.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    if (role) {
      query.role = role;
    }

    const users = await User.find(query).select(
      "firstName lastName email role approvalStatus"
    );

    res.json(users);
  } catch (err) {
    console.error("Users Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
