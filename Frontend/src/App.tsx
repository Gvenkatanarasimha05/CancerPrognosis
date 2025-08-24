import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

// Mock demo users for easy testing
const initializeDemoUsers = () => {
  const demoUsers = [
    {
      id: 'patient-demo',
      email: 'patient@demo.com',
      role: 'patient',
      firstName: 'John',
      lastName: 'Doe',
      isVerified: true,
      createdAt: new Date(),
      dateOfBirth: '1990-05-15',
      gender: 'male',
      phone: '+1 (555) 123-4567',
      emergencyContact: '+1 (555) 987-6543'
    },
    {
      id: 'doctor-demo',
      email: 'doctor@demo.com',
      role: 'doctor',
      firstName: 'Sarah',
      lastName: 'Johnson',
      isVerified: true,
      createdAt: new Date(),
      licenseNumber: 'MD-12345-NY',
      specialization: 'Cardiology',
      experience: 8,
      qualification: 'MBBS, MD',
      hospital: 'New York Presbyterian',
      isApproved: true
    },
    {
      id: 'admin-demo',
      email: 'admin@demo.com',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      isVerified: true,
      createdAt: new Date()
    }
  ];

  const existingUsers = localStorage.getItem('registeredUsers');
  if (!existingUsers) {
    localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
  }
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Hide Footer for admin dashboard
  const hideFooter = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            user ? <Navigate to={getDashboardPath(user.role)} /> : <LandingPage />
          } />
          <Route path="/login" element={
            user ? <Navigate to={getDashboardPath(user.role)} /> : <LoginPage />
          } />
          <Route path="/register" element={
            user ? <Navigate to={getDashboardPath(user.role)} /> : <RegisterPage />
          } />
          <Route path="/password-reset" element={
            user ? <Navigate to={getDashboardPath(user.role)} /> : <PasswordResetPage />
          } />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          
          <Route path="/patient-dashboard" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/doctor-dashboard" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

const getDashboardPath = (role: string) => {
  switch (role) {
    case 'patient': return '/patient-dashboard';
    case 'doctor': return '/doctor-dashboard';
    case 'admin': return '/admin-dashboard';
    default: return '/';
  }
};

const App: React.FC = () => {
  useEffect(() => {
    initializeDemoUsers();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
