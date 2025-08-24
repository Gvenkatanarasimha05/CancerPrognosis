import React,{ useEffect, useState } from 'react';
import { Users, Calendar, CheckCircle, FileText, Clock } from 'lucide-react';
import API from '../../../../api/api';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber?:  string;
  specialization?: string;
  experience?:  number ;
  qualification?: string;
  hospital?: string;
}

const OverviewTab: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/doctor/me');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Dr.{profile?.firstName} {profile?.lastName}!</h2>
          <p className="text-gray-600">Here's your practice overview for today.</p>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-teal-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Active Patients</p>
                <p className="text-3xl font-bold text-teal-900">47</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Today's Appointments</p>
                <p className="text-3xl font-bold text-blue-900">8</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Completed Today</p>
                <p className="text-3xl font-bold text-green-900">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Pending Reviews</p>
                <p className="text-3xl font-bold text-orange-900">5</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">John Doe - Follow-up</p>
                  <p className="text-sm text-gray-600">9:00 AM - 9:30 AM</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ml-auto">Next</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Sarah Smith - Consultation</p>
                  <p className="text-sm text-gray-600">10:00 AM - 10:45 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Michael Johnson - Check-up</p>
                  <p className="text-sm text-gray-600">11:00 AM - 11:30 AM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patient Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New patient registration - Emily Davis</span>
                <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Lab results uploaded - John Doe</span>
                <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Appointment rescheduled - Sarah Smith</span>
                <span className="text-xs text-gray-400 ml-auto">3 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Consultation completed - Michael Brown</span>
                <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
    
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-teal-900">Patient Feedback Summary</h3>
              <p className="text-teal-700">Average rating: 4.8/5 stars based on recent consultations</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-teal-900">4.8★</p>
              <p className="text-sm text-teal-600">23 reviews this month</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OverviewTab;
