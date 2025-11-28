const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  getDoctorProfile,
  updateDoctorProfile,
  getAssignedPatients,
  assignPatientToDoctor,
  getPatientById,
  addPatientReport,
  getPatientAIPredictions,
  getAllDoctors,
  getConsultation,
  updateConsultation,
  getDoctorAppointments,
  getTodayAppointments,
  getCompletedCount,
  getCompletedAppointments,
  createDoctorAppointment
} = require("../controllers/doctorController");

router.get("/profile", protect, getDoctorProfile);
router.put("/profile", protect, updateDoctorProfile);

router.get("/assigned", protect, getAssignedPatients);
router.post("/assign/:id", protect, assignPatientToDoctor);

router.get("/patient/:id", protect, getPatientById);
router.post("/patient/:id/report", protect, addPatientReport);
router.get("/patient/:id/predictions", protect, getPatientAIPredictions);

router.get("/appointments", protect, getDoctorAppointments);
router.get("/appointments/today", protect, getTodayAppointments);
router.get("/appointments/completed", protect, getCompletedAppointments);
router.post("/appointments/create", protect, createDoctorAppointment);

router.get("/consultation", protect, getConsultation);
router.post("/consultation/update", protect, updateConsultation);

router.get("/doctors", protect, getAllDoctors);

module.exports = router;
