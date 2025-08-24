const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },

  // Patient-specific fields
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  phone: { type: String },
  emergencyContact: { type: String },

  // Doctor-specific fields
  licenseNumber: { type: String },
  specialization: { type: String },
  experience: { type: Number },
  qualification: { type: String },
  hospital: { type: String },

  // 👇 Admin approval for doctors
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

  // Verification & Security
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiry: Date,
  passwordResetCode: String,
  passwordResetExpiry: Date,
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
