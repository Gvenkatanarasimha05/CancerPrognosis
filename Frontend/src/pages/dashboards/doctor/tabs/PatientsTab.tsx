import React from 'react';
import { Search, Filter, FileText } from 'lucide-react';

const PatientsTab: React.FC = () => {
  return (
   <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
         <div className="flex items-center space-x-4">
           <div className="relative">
             <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="Search patients..."
               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
             />
           </div>
           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
             <Filter className="h-4 w-4" />
             <span>Filter</span>
           </button>
         </div>
       </div>
   
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
           <div className="bg-white border rounded-lg overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200">
               <h3 className="text-lg font-semibold text-gray-900">Active Patients</h3>
             </div>
             <div className="divide-y divide-gray-200">
               <div className="px-6 py-4 hover:bg-gray-50">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                       <span className="text-teal-600 font-medium">JD</span>
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">John Doe</h4>
                       <p className="text-sm text-gray-600">ID: P001 • Age: 34 • Male</p>
                       <p className="text-xs text-gray-500">Last visit: Feb 28, 2024</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Stable</span>
                     <button className="text-teal-600 hover:text-teal-800">
                       <FileText className="h-4 w-4" />
                     </button>
                   </div>
                 </div>
               </div>
               <div className="px-6 py-4 hover:bg-gray-50">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                       <span className="text-blue-600 font-medium">SS</span>
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Sarah Smith</h4>
                       <p className="text-sm text-gray-600">ID: P002 • Age: 28 • Female</p>
                       <p className="text-xs text-gray-500">Last visit: Feb 25, 2024</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Follow-up</span>
                     <button className="text-teal-600 hover:text-teal-800">
                       <FileText className="h-4 w-4" />
                     </button>
                   </div>
                 </div>
               </div>
               <div className="px-6 py-4 hover:bg-gray-50">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                       <span className="text-purple-600 font-medium">MJ</span>
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Michael Johnson</h4>
                       <p className="text-sm text-gray-600">ID: P003 • Age: 45 • Male</p>
                       <p className="text-xs text-gray-500">Last visit: Feb 20, 2024</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Critical</span>
                     <button className="text-teal-600 hover:text-teal-800">
                       <FileText className="h-4 w-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
   
         <div className="space-y-6">
           <div className="bg-white border rounded-lg p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Total Patients</span>
                 <span className="font-semibold text-gray-900">47</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">New This Month</span>
                 <span className="font-semibold text-green-600">+8</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Critical Cases</span>
                 <span className="font-semibold text-red-600">3</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600">Follow-ups Due</span>
                 <span className="font-semibold text-yellow-600">12</span>
               </div>
             </div>
           </div>
   
           <div className="bg-white border rounded-lg p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
             <div className="space-y-2">
               <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                 View All Lab Results
               </button>
               <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                 Schedule Follow-ups
               </button>
               <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                 Export Patient List
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
  );
};

export default PatientsTab;
