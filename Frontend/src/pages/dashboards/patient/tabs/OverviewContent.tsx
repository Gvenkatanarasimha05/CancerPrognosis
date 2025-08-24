import React, { useEffect, useState } from 'react';
import { Calendar, Brain, FileText, TrendingUp } from 'lucide-react';
import API from '../../../../api/api';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  role: 'patient' | 'doctor' | string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
  allergies?: string[];
}

const OverviewContent: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/patient/me');
        if (res.data && res.data.data) setProfile(res.data.data);
      } catch (err) {
        console.error('❌ Failed to load profile', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading overview...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.firstName} {profile?.lastName}!
        </h2>
        <p className="text-gray-600">Here's your health overview at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Health Score</p>
            <p className="text-3xl font-bold text-blue-900">8.5/10</p>
          </div>
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Last Checkup</p>
            <p className="text-lg font-semibold text-green-900">2 weeks ago</p>
          </div>
          <Calendar className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div className="bg-orange-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 text-sm font-medium">Predictions</p>
            <p className="text-lg font-semibold text-orange-900">3 Active</p>
          </div>
          <Brain className="h-8 w-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">Reports</p>
            <p className="text-lg font-semibold text-purple-900">12 Total</p>
          </div>
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">AI prediction completed for chest symptoms</span>
            <span className="text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Blood test results uploaded</span>
            <span className="text-xs text-gray-400">1 week ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Consultation with Dr. Smith</span>
            <span className="text-xs text-gray-400">2 weeks ago</span>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
            <p className="text-sm text-gray-600">Cardiology Consultation</p>
            <p className="text-xs text-gray-400">March 15, 2024 at 2:00 PM</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="font-medium text-gray-900">Dr. Michael Chen</p>
            <p className="text-sm text-gray-600">General Checkup</p>
            <p className="text-xs text-gray-400">March 22, 2024 at 10:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OverviewContent;
