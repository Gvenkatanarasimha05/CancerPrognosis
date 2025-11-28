const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const patientController = require("../controllers/patientController");
const { predictRisk } = require("../controllers/predictionController");

router.get('/me', protect, patientController.getProfile);
router.put('/update', protect, patientController.updateProfile);
router.get('/data', protect, patientController.getPatientData);

router.post('/assign-doctor', protect, patientController.assignDoctor);
router.get('/assigned-doctor', protect, patientController.getAssignedDoctor);

router.get('/consultation', protect, patientController.getConsultationForPatient);
router.get('/reports', protect, patientController.getMyReports);

router.post('/predict', protect, predictRisk);

module.exports = router;
