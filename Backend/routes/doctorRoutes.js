const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET /doctor/me – fetch doctor profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = req.user; // fetched by protect middleware

    if (user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Not a doctor' });
    }

    res.json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        licenseNumber: user.licenseNumber || '',
        specialization: user.specialization || '',
        experience: user.experience || 0,
        qualification: user.qualification || '',
        hospital: user.hospital || '',
      },
    });
  } catch (err) {
    console.error('❌ /doctor/me error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /doctor/update – update doctor profile
router.put('/update', protect, async (req, res) => {
  try {
    const { licenseNumber, specialization, experience, qualification, hospital } = req.body;

    const user = req.user;

    if (licenseNumber !== undefined) user.licenseNumber = licenseNumber;
    if (specialization !== undefined) user.specialization = specialization;
    if (experience !== undefined) user.experience = experience;
    if (qualification !== undefined) user.qualification = qualification;
    if (hospital !== undefined) user.hospital = hospital;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        licenseNumber: user.licenseNumber || '',
        specialization: user.specialization || '',
        experience: user.experience || 0,
        qualification: user.qualification || '',
        hospital: user.hospital || '',
      },
    });
  } catch (err) {
    console.error('❌ /doctor/update error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
