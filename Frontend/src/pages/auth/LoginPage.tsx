import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Heart } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      if (success) {
        // Redirect based on role
        if (role === 'patient') navigate('/patient-dashboard');
        else if (role === 'doctor') navigate('/doctor-dashboard');
        else if (role === 'admin') navigate('/admin-dashboard');
      } else {
        setError('Invalid credentials or email not verified.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/log.jpg')" }}
      ></div>

      {/* Right side login form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-md">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to <span className="text-blue-600">CancerPrognosis</span>
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Access your personalized healthcare dashboard
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Login as
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'patient' | 'doctor' | 'admin')}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/password-reset" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
