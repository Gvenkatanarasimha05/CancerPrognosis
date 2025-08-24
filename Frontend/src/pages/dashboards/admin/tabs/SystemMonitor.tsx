import React from 'react';
import {AlertTriangle} from 'lucide-react';

const SystemMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Web Server</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database Server</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Gateway</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">File Storage</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-600">Warning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Memory Usage</span>
              <span className="text-sm font-medium text-gray-900">67%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{width: '67%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Disk Usage</span>
              <span className="text-sm font-medium text-gray-900">23%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '23%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Network I/O</span>
              <span className="text-sm font-medium text-gray-900">12 MB/s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '30%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Connections</span>
            <span className="font-medium text-gray-900">47</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Queries/sec</span>
            <span className="font-medium text-gray-900">234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cache Hit Rate</span>
            <span className="font-medium text-green-600">98.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg Response Time</span>
            <span className="font-medium text-gray-900">12ms</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Firewall Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">SSL Certificate</span>
            <span className="font-medium text-green-600">Valid</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Failed Login Attempts</span>
            <span className="font-medium text-red-600">12 (24h)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Security Scan</span>
            <span className="font-medium text-gray-900">2 hours ago</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Restart Web Server
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Clear Cache
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Run Security Scan
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-6 w-6 text-red-600" />
        <div>
          <h3 className="font-semibold text-red-900">System Alert</h3>
          <p className="text-red-700 text-sm">
            File storage server showing high disk usage (85%). Consider adding more storage capacity.
          </p>
          <button className="mt-2 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SystemMonitor;
