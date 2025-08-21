// HistoryContent.tsx
import React from 'react';
import { FileText } from 'lucide-react';

const HistoryContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
    
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Past Medical Records</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Annual Physical Examination</h4>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson - Cardiology</p>
              <p className="text-xs text-gray-400">February 28, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Normal</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Blood Test Results</h4>
              <p className="text-sm text-gray-600">Lab Corp - Complete Metabolic Panel</p>
              <p className="text-xs text-gray-400">January 15, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Review Needed</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Chest X-Ray</h4>
              <p className="text-sm text-gray-600">City Medical Center - Radiology</p>
              <p className="text-xs text-gray-400">December 10, 2023</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Clear</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HistoryContent;
