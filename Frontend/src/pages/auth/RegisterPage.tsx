import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../types/auth';
import { User, Stethoscope, Eye, EyeOff, CheckCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'patient',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: any = e.target.value;

    // Convert experience to number
    if (e.target.name === 'experience') {
      value = Number(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Validate required fields based on step and role
  const validate = (): boolean => {
    if (step === 1) return true; // role selection step

    // Basic required fields for step 2
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return false;
    }

    // Role-specific validation for step 3
    if (step === 3) {
      if (formData.role === 'patient') {
        if (!formData.dateOfBirth || !formData.gender || !formData.phone || !formData.emergencyContact) {
          setError('Please fill in all patient details.');
          return false;
        }
      } else if (formData.role === 'doctor') {
        if (!formData.licenseNumber || !formData.specialization) {
          setError('Please fill in all doctor details.');
          return false;
        }
      }
    }

    setError('');
    return true;
  };

  const nextStep = () => {
    if (!validate()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);
  try {
    const success = await register(formData);
    if (success) {
      navigate('/verify-email', { state: { email: formData.email } });
    } else {
      setError('Registration failed. Please try again.');
    }
  } catch (error: any) {
    setError(error.message || 'An error occurred during registration.');
  }
  setIsLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-gray-600">Join MedPortal and start your health journey</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Choose Role</span>
              <span>Basic Info</span>
              <span>Details</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    I am registering as a:
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'patient' })}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        formData.role === 'patient'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-6 w-6 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900">Patient</div>
                          <div className="text-sm text-gray-600">
                            Seeking medical care and health predictions
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'doctor' })}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        formData.role === 'doctor'
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Stethoscope className="h-6 w-6 text-teal-600" />
                        <div>
                          <div className="font-semibold text-gray-900">Doctor</div>
                          <div className="text-sm text-gray-600">
                            Providing medical care and consultations
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Role-specific Information */}
            {step === 3 && (
              <div className="space-y-6">
                {formData.role === 'patient' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date of Birth
                        </label>
                        <input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emergencyContact"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact
                      </label>
                      <input
                        id="emergencyContact"
                        name="emergencyContact"
                        type="tel"
                        value={formData.emergencyContact || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Medical License Number *
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        value={formData.licenseNumber || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="specialization"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Specialization *
                      </label>
                      <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        required
                        value={formData.specialization || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Cardiology, Neurology"
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Years of Experience
                        </label>
                        <input
                          id="experience"
                          name="experience"
                          type="number"
                          value={formData.experience || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qualification"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Qualification
                        </label>
                        <input
                          id="qualification"
                          name="qualification"
                          type="text"
                          value={formData.qualification || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., MBBS, MD"
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="hospital"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hospital/Clinic Affiliation
                      </label>
                      <input
                        id="hospital"
                        name="hospital"
                        type="text"
                        value={formData.hospital || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </>
                )}

                {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
