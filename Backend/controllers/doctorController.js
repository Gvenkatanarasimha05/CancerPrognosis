// controllers/doctorController.js
const Doctor = require("../models/doctor");

// ------------- Get Doctor Profile -------------
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id; // Assuming auth middleware sets req.user
    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------- Update Doctor Profile -------------
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const updates = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
