const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PatientData = require("../models/PatientData");
const sendEmail = require("../utils/sendEmail");

// Helper to generate OTP
function generateOTP() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return { code, expiry };
}

// ---------------- Register ----------------
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      dateOfBirth,
      gender,
      phone,
      emergencyContact,
      licenseNumber,
      specialization,
      experience,
      qualification,
      hospital,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    if (role === "admin") {
      return res
        .status(403)
        .json({ message: "You cannot register as admin" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const { code, expiry } = generateOTP();

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
      licenseNumber,
      specialization,
      experience,
      qualification,
      hospital,
      verificationCode: code,
      verificationCodeExpiry: expiry,
      approvalStatus: role === "doctor" ? "pending" : "approved", // 👈 doctors = pending
    });

    await user.save();

    // Create PatientData if role is patient
    if (role === "patient") {
      const patientData = new PatientData({
        user: user._id,
        dateOfBirth,
        gender,
        phone,
        emergencyContact,
      });
      await patientData.save();
    }

    await sendEmail({
      to: email,
      subject: "Verify your account",
      html: `<p>Your verification code is <b>${code}</b></p><p>This code will expire in 10 minutes.</p>`,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. Verification code sent.",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,  
        isVerified: user.isVerified,
        approvalStatus: user.approvalStatus,
      },
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Login ----------------
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== role) {
      return res.status(403).json({ message: `This account is not registered as ${role}` });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // email check
    if (user.role !== "admin" && !user.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in" });
    }

   
    if (user.role === "doctor" && user.approvalStatus == "pending") {
      return res.status(403).json({ message: "Doctor account apporval is pending by Admin" });
    }

    if (user.role === "doctor" && user.approvalStatus == "rejected") {
      return res.status(403).json({ message: "Doctor account has rejcted by Admin" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        approvalStatus: user.approvalStatus,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get Profile ----------------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -verificationCode -verificationCodeExpiry -passwordResetCode -passwordResetExpiry -__v"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    let patientData = {};
    if (user.role === "patient") {
      const pd = await PatientData.findOne({ user: user._id }).lean();
      if (pd) patientData = { ...pd };
    }

    const profile = { ...user.toObject(), ...patientData };

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Verify Email ----------------
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email is already verified" });
    if (user.verificationCode !== code) return res.status(400).json({ message: "Invalid verification code" });
    if (Date.now() > user.verificationCodeExpiry) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify Email Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Resend Verification Code ----------------
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    const { code, expiry } = generateOTP();
    user.verificationCode = code;
    user.verificationCodeExpiry = expiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Resend Verification Code",
      html: `<p>Your verification code is <b>${code}</b></p><p>This code will expire in 10 minutes.</p>`,
    });

    res.json({ success: true, message: "Verification code resent successfully" });
  } catch (err) {
    console.error("Resend verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Password Reset ----------------
exports.requestPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(400).json({ message: "User not found" });

    const { code, expiry } = generateOTP();
    user.passwordResetCode = code;
    user.passwordResetExpiry = expiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP is: <b>${code}</b>. Expires in 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Request password reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyPasswordResetOTP = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.passwordResetCode !== code) return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > user.passwordResetExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified. You can reset your password now." });
  } catch (err) {
    console.error("Verify password reset OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.passwordResetCode !== code) return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > user.passwordResetExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.password = newPassword.trim(); // pre-save hook will hash it
    user.passwordResetCode = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
