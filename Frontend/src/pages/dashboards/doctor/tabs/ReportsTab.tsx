import React from 'react';
import { FileText, MessageSquare} from 'lucide-react';

const ReportsTab: React.FC = () => {
  return (
     <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
    
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
          Create New Report
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">John Doe - Consultation Report</h4>
              <p className="text-sm text-gray-600">Follow-up for chest pain evaluation</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 28, 2024</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sarah Smith - Initial Assessment</h4>
              <p className="text-sm text-gray-600">New patient consultation and health evaluation</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 25, 2024</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Draft</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Michael Johnson - Treatment Plan</h4>
              <p className="text-sm text-gray-600">Hypertension management and medication adjustment</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 20, 2024</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Consultation Report</h4>
            <p className="text-sm text-gray-600">Standard patient consultation template</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Treatment Plan</h4>
            <p className="text-sm text-gray-600">Comprehensive treatment planning template</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Follow-up Report</h4>
            <p className="text-sm text-gray-600">Progress evaluation and follow-up template</p>
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Analytics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reports This Month</span>
            <span className="font-semibold text-gray-900">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-semibold text-green-600">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="font-semibold text-yellow-600">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Review</span>
            <span className="font-semibold text-blue-600">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ReportsTab;
