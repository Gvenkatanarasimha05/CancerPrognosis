import React from 'react';
import {CheckCircle,Shield,Activity,AlertTriangle,XCircle,Settings } from 'lucide-react';

const ActivityLogs: React.FC = () => {
  return (
     <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>All Activities</option>
          <option>User Registrations</option>
          <option>Login Activities</option>
          <option>System Events</option>
          <option>Security Events</option>
        </select>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
          Export Logs
        </button>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">System Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New user registration</p>
              <p className="text-sm text-gray-600">John Smith (Patient) created account successfully</p>
              <p className="text-xs text-gray-500">IP: 192.168.1.100 • 2 minutes ago</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User login</p>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson logged into the system</p>
              <p className="text-xs text-gray-500">IP: 10.0.1.45 • 5 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Doctor approval pending</p>
              <p className="text-sm text-gray-600">Dr. Michael Chen submitted credentials for review</p>
              <p className="text-xs text-gray-500">License: MD-67890-CA • 10 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Security alert</p>
              <p className="text-sm text-gray-600">Multiple failed login attempts detected</p>
              <p className="text-xs text-gray-500">User: suspicious@email.com • IP: 185.220.100.240 • 15 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System maintenance</p>
              <p className="text-sm text-gray-600">Database optimization completed successfully</p>
              <p className="text-xs text-gray-500">Duration: 15 minutes • 1 hour ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Doctor approval</p>
              <p className="text-sm text-gray-600">Dr. Amanda Johnson approved and activated</p>
              <p className="text-xs text-gray-500">Approved by: Admin User • 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ActivityLogs;
