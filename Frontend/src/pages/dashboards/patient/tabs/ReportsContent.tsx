// ReportsContent.tsx
import React from 'react';
import { Heart, FileText } from 'lucide-react';

const ReportsContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Doctor Reports & Feedback</h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Consultation Report</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">Cardiology Specialist</p>
            <p className="text-sm text-gray-700">
              "Your recent test results show significant improvement. Continue with current 
              medication and maintain regular exercise routine. Next follow-up in 3 months."
            </p>
            <p className="text-xs text-gray-400 mt-2">February 28, 2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Medication Adherence</p>
              <p className="text-xs text-gray-600">Continue current prescription as directed</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Lifestyle Changes</p>
              <p className="text-xs text-gray-600">Increase physical activity to 150 min/week</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Follow-up</p>
              <p className="text-xs text-gray-600">Schedule appointment in 3 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">All Reports</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Consultation Report</h4>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson - Cardiology Follow-up</p>
              <p className="text-xs text-gray-400">February 28, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Treatment Plan Update</h4>
              <p className="text-sm text-gray-600">Dr. Michael Chen - General Practice</p>
              <p className="text-xs text-gray-400">January 20, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReportsContent;
