const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTodayAppointments,
  getCompletedAppointments,
  getPendingReports,
  getDoctorActivity,
} = require("../controllers/overviewController");

router.get("/appointments/today", protect, getTodayAppointments);
router.get("/appointments/completed", protect, getCompletedAppointments);
router.get("/reports/pending", protect, getPendingReports);
router.get("/activity", protect, getDoctorActivity);

module.exports = router;
