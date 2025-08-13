import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, CheckCircle } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode } = useAuth();

  const email = location.state?.email || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const success = await verifyEmail(email, verificationCode);
      if (success) {
        setIsVerified(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification.');
    }
    setIsLoading(false);
  };

  const resendCode = async () => {
    setResendLoading(true);
    setResendError('');
    setResendMessage('');
    try {
      const response = await resendVerificationCode(email);
      setResendMessage(response.message || 'Verification code resent successfully.');
    } catch (err: any) {
      setResendError(err.message || 'Failed to resend verification code.');
    }
    setResendLoading(false);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been verified. You will be redirected to the login page shortly.
            </p>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-gray-600">
          We've sent a verification code to{' '}
          <span className="font-medium text-blue-600">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              <p className="mt-2 text-sm text-gray-500">
                For demo purposes, enter any 6-digit code (e.g., 123456)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={resendCode}
                disabled={resendLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:text-blue-400"
              >
                {resendLoading ? 'Resending...' : 'Resend code'}
              </button>
            </p>
            {resendError && (
              <p className="text-red-600 text-sm mt-2">{resendError}</p>
            )}
            {resendMessage && (
              <p className="text-green-600 text-sm mt-2">{resendMessage}</p>
            )}
            <Link
              to="/register"
              className="block mt-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Back to registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
