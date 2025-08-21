import React from 'react';

const ConsultationsTab: React.FC = () => {
  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Consultation Management</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Consultations</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">John Doe</h4>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">In Progress</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Chest pain evaluation - Follow-up consultation</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Started: 9:00 AM</span>
              <button className="text-blue-600 hover:text-blue-800">Continue</button>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Sarah Smith</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Routine checkup - New patient consultation</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Scheduled: 10:00 AM</span>
              <button className="text-blue-600 hover:text-blue-800">Start</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Michael Johnson</p>
              <p className="text-sm text-gray-600">Hypertension management</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Feb 20</p>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Emily Davis</p>
              <p className="text-sm text-gray-600">Diabetes consultation</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Feb 18</p>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Communication</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Messages</h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-700">"Doctor, I'm still experiencing some chest discomfort..."</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Sarah Smith</span>
                <span className="text-xs text-gray-500">5 hours ago</span>
              </div>
              <p className="text-sm text-gray-700">"Thank you for the prescription. When should I schedule follow-up?"</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Response</h4>
          <textarea 
            placeholder="Type your message here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex justify-between items-center mt-3">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Select Patient</option>
              <option>John Doe</option>
              <option>Sarah Smith</option>
            </select>
            <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ConsultationsTab;
