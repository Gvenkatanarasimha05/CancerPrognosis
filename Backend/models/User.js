const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },

  phone: String,
  emergencyContact: String,

  licenseNumber: String,
  specialization: String,
  experience: Number,
  qualification: String,
  hospital: String,

  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiry: Date,

  passwordResetCode: String,
  passwordResetExpiry: Date,
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
