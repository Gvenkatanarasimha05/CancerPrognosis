const express = require("express");
const router = express.Router();
const {
  getDoctorProfile,
  updateDoctorProfile,
  getPatients,
  getPatientById,
  assignPatientToDoctor,
  addPatientReport,
  getPatientAIPredictions,
  getAllDoctors,
} = require("../controllers/doctorController");
const { protect } = require("../middleware/auth");

// Doctor Profile
router.get('/me', protect, getDoctorProfile);      
router.put('/update', protect, updateDoctorProfile);

// Patients
router.get("/patients", protect, getPatients);
router.get("/doctor/patients/:id", protect, getPatientById);
router.post("/patients/:id/assign", protect, assignPatientToDoctor);
router.post("/doctor/patients/:id/report", protect, addPatientReport);
router.get("/doctor/patients/:id/predictions", protect, getPatientAIPredictions);

// Fetch all doctors (open endpoint, no login required)
router.get("/doctors", getAllDoctors);

module.exports = router;
