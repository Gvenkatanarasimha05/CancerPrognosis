const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ['emailVerification', 'passwordReset'], required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);
