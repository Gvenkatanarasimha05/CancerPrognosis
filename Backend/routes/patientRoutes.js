const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const patientController = require('../controllers/patientController');

router.get('/me', protect, patientController.getProfile);
router.put('/update', protect, patientController.updateProfile);
router.get('/data', protect, patientController.getPatientData);
router.post('/assign-doctor', protect, patientController.assignDoctor);



module.exports = router;
