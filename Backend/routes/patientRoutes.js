const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const PatientData = require('../models/PatientData');

// GET /patient/me – get profile
router.get('/me', protect, async (req, res) => {
  try {
    let patientData = await PatientData.findOne({ user: req.user._id });

    if (!patientData) {
      patientData = new PatientData({ user: req.user._id });
      await patientData.save();
    }

    res.json({
      success: true,
      data: {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        dateOfBirth: patientData.dateOfBirth || '',
        gender: patientData.gender || '',
        phone: patientData.phone || '',
        emergencyContact: patientData.emergencyContact || '',
        medicalHistory: patientData.medicalHistory || [],
        allergies: patientData.allergies || [],
      },
    });
  } catch (err) {
    console.error('❌ /patient/me error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /patient/update – update profile
router.put('/update', protect, async (req, res) => {
  try {
    const { dateOfBirth, gender, phone, emergencyContact, medicalHistory, allergies } = req.body;

    let patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) patientData = new PatientData({ user: req.user._id });

    if (dateOfBirth) patientData.dateOfBirth = new Date(dateOfBirth);
    if (gender) patientData.gender = gender;
    if (phone) patientData.phone = phone;
    if (emergencyContact) patientData.emergencyContact = emergencyContact;
    if (medicalHistory) patientData.medicalHistory = medicalHistory;
    if (allergies) patientData.allergies = allergies;

    await patientData.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: patientData,
    });
  } catch (err) {
    console.error('❌ /patient/update error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
