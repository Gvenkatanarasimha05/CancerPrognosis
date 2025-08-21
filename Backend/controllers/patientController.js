const PatientData = require("../models/PatientData");

// Get patient data by logged-in user
exports.getPatientData = async (req, res) => {
  try {
    const data = await PatientData.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName email role profilePicture createdAt'); 
      // ✅ pulls user info into response

    if (!data) {
      return res.status(404).json({ message: 'Patient data not found' });
    }

    res.json({
      success: true,
      data: {
        id: data.user._id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
        profilePicture: data.user.profilePicture,
        createdAt: data.user.createdAt,
        // patient-specific
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        emergencyContact: data.emergencyContact,
        history: data.history,
        reports: data.reports,
        aiPredictions: data.aiPredictions,
      }
    });
  } catch (err) {
    console.error("❌ Error fetching patient data:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
