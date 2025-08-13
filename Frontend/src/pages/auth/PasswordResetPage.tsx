  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { Heart, ArrowLeft, Mail, Lock, Shield } from 'lucide-react';
  import axios from 'axios';

  const API_URL = 'http://localhost:4000/api/auth';

  const PasswordResetPage: React.FC = () => {
    const [step, setStep] = useState<'email' | 'verification' | 'newPassword'>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ---------------- Send Password Reset Code ----------------
    const handleSendCode = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
      setSuccess('');

      try {
      const res = await axios.post(`${API_URL}/requestPasswordResetOTP`, { email });
        setSuccess(res.data.message);
        setStep('verification');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to send code.');
      }

      setIsLoading(false);
    };

    // ---------------- Verify Code ----------------
    const handleVerifyCode = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
      setSuccess('');

      try {
       const res = await axios.post(`${API_URL}/verifyPasswordResetOTP`, { email, code });
        setSuccess(res.data.message);
        setStep('newPassword');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Invalid or expired code.');
      }

      setIsLoading(false);
    };

    // ---------------- Reset Password ----------------
    const handlePasswordReset = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
      setSuccess('');

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters.');
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/resetPasswordWithOTP`, { email, code, newPassword });
        setSuccess(res.data.message);
        setStep('email');
        setEmail('');
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to reset password.');
      }

      setIsLoading(false);
    };

    // ---------------- Render Steps ----------------
    const renderEmailStep = () => (
      <form onSubmit={handleSendCode} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-1 relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send Reset Code'}
        </button>
      </form>
    );

    const renderVerificationStep = () => (
      <form onSubmit={handleVerifyCode} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Verification Code</label>
          <div className="mt-1 relative">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 shadow-sm text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="000000"
            />
            <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex space-x-3 mt-3">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        </div>
      </form>
    );

    const renderNewPasswordStep = () => (
      <form onSubmit={handlePasswordReset} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <div className="mt-1 relative">
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="mt-1 relative">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setStep('verification')}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    );

    const getStepTitle = () => {
      switch (step) {
        case 'email': return 'Reset Your Password';
        case 'verification': return 'Enter Verification Code';
        case 'newPassword': return 'Set New Password';
        default: return 'Reset Your Password';
      }
    };

    const getStepDescription = () => {
      switch (step) {
        case 'email': return 'Enter your email to receive a reset code';
        case 'verification': return `We sent a code to ${email}`;
        case 'newPassword': return 'Create a new strong password';
        default: return '';
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">{getStepTitle()}</h2>
          <p className="mt-2 text-center text-gray-600">{getStepDescription()}</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

            {step === 'email' && renderEmailStep()}
            {step === 'verification' && renderVerificationStep()}
            {step === 'newPassword' && renderNewPasswordStep()}

            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PasswordResetPage;
