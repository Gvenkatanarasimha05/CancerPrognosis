const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const appt = require('../controllers/appointmentController');

router.get('/', protect, appt.getAllAppointments);

router.post('/', protect, appt.createAppointment);

router.post('/:id/complete', protect, appt.markComplete);

module.exports = router;
