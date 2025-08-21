// PredictionContent.tsx
import React from 'react';
import { Brain, Upload } from 'lucide-react';

const PredictionContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">AI Health Predictions</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Upload className="h-4 w-4" />
        <span>New Prediction</span>
      </button>
    </div>

    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <Brain className="h-6 w-6 text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-blue-900">How AI Predictions Work</h3>
          <p className="text-blue-700 text-sm">
            Upload your symptoms and medical reports to get AI-powered health predictions, 
            risk assessments, and personalized recommendations.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload New Data</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your files here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Choose Files
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Predictions</h3>
        <div className="space-y-3">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Respiratory Health Analysis</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Based on chest symptoms and X-ray</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Confidence: 94%</span>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Cardiovascular Risk Assessment</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Moderate Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Based on blood work and symptoms</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Confidence: 87%</span>
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PredictionContent;
