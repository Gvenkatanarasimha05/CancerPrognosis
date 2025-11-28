import React from "react";

const SystemMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>

      {/* -------------------- SERVER STATUS -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Server Status
          </h3>

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

        {/* -------------------- PERFORMANCE METRICS -------------------- */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: "67%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Disk Usage</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "23%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Network I/O</span>
                <span className="text-sm font-medium">12 MB/s</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
