import React from 'react';
import {AlertTriangle,Clock } from 'lucide-react';

const AppointmentsTab: React.FC = () => {
  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
        Schedule Appointment
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-600">Follow-up consultation</p>
                <p className="text-xs text-gray-500">9:00 AM - 9:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Start
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  Reschedule
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
              <Clock className="h-5 w-5 text-gray-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Sarah Smith</h4>
                <p className="text-sm text-gray-600">Initial consultation</p>
                <p className="text-xs text-gray-500">10:00 AM - 10:45 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
              <Clock className="h-5 w-5 text-gray-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Michael Johnson</h4>
                <p className="text-sm text-gray-600">Routine check-up</p>
                <p className="text-xs text-gray-500">11:00 AM - 11:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Today</span>
              <span className="font-semibold text-blue-600">8 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tomorrow</span>
              <span className="font-semibold text-gray-900">6 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="font-semibold text-gray-900">32 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Confirmations</span>
              <span className="font-semibold text-yellow-600">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Block Time Slot
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              View Weekly Schedule
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Export Calendar
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Appointment History
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-6 w-6 text-teal-600" />
        <div>
          <h3 className="font-semibold text-teal-900">Appointment Reminders</h3>
          <p className="text-teal-700 text-sm">
            Automatic reminders will be sent to patients 24 hours and 1 hour before their appointments.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AppointmentsTab;
