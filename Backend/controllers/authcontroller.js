const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ---------------- Helper: Generate OTP ----------------
function generateOTP() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return { code, expiry };
}

// ---------------- Register ----------------
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const { code, expiry } = generateOTP();

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      password: password.trim(), // pre-save hook will hash it
      role,
      verificationCode: code,
      verificationCodeExpiry: expiry,
      isVerified: false,
    });

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Email Verification - Cancer Prognosis App",
      html: `<p>Your OTP code is: <b>${code}</b></p><p>This code will expire in 10 minutes.</p>`,
    });

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Login ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("❌ Login error:", err);
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
    if (Date.now() > user.verificationCodeExpiry) return res.status(400).json({ message: "Verification code expired" });

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

    console.log("🔹 Password Reset OTP sent", { email, code, expiry, now: Date.now() });
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
    if (Date.now() > user.passwordResetExpiry) return res.status(400).json({ message: "OTP expired" });

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
    if (Date.now() > user.passwordResetExpiry) return res.status(400).json({ message: "OTP expired" });

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
