const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);

// Password reset
router.post('/requestPasswordResetOTP', authController.requestPasswordResetOTP);
router.post('/verifyPasswordResetOTP', authController.verifyPasswordResetOTP);
router.post('/resetPasswordWithOTP', authController.resetPasswordWithOTP);
router.post('/resend-verification-code', authController.resendVerificationCode); 

module.exports = router;
