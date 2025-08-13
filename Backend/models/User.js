const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiry: Date,
  passwordResetCode: String,      // Added for password reset
  passwordResetExpiry: Date,      // Added for password reset
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

module.exports = mongoose.model('User', userSchema);
