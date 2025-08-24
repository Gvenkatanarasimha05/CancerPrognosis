import React from 'react';
import { Search,Filter} from 'lucide-react';

const UserManage: React.FC = () => {
  return (
     <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">1</div>
          <div className="text-sm text-gray-600">Patients</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600">1</div>
          <div className="text-sm text-gray-600">Doctors</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">1</div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent User Registrations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">JS</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">John Smith</div>
                    <div className="text-sm text-gray-500">john.smith@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Patient
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Mar 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-medium">SW</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Dr. Sarah Williams</div>
                    <div className="text-sm text-gray-500">sarah.williams@hospital.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                  Doctor
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Mar 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                <button className="text-red-600 hover:text-red-900">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium">MD</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Mike Davis</div>
                    <div className="text-sm text-gray-500">mike.davis@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Patient
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Feb 28, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default UserManage;
