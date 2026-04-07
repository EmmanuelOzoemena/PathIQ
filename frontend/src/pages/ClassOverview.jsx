import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import DepartmentTabs from '../components/class-overview/DepartmentTabs';
import SubjectTable from '../components/class-overview/SubjectTable';
import { Plus, X } from 'lucide-react';

const ClassOverview = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Layout activeItem="class-overview">
      {/* Header with Add Button - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">CLASS OVERVIEW</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Add Subject</span>
        </button>
      </div>
      
      {/* Department Tabs */}
      <div className="mb-6">
        <DepartmentTabs />
      </div>
      
      {/* Subject Analysis Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <SubjectTable />
        </div>
      </div>

      {/* Add Subject Modal - Responsive */}
      {showAddModal && (
        <AddSubjectModal onClose={() => setShowAddModal(false)} />
      )}
    </Layout>
  );
};

// Add Subject Modal Component - Responsive
const AddSubjectModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: 'Science',
    status: 'In-progress',
    schedule: 'Every Monday',
    time: '5pm - 7pm',
    location: 'Google Meet',
    capacity: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New subject:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Subject</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Subject Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Mathematics"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Science</option>
              <option>Commercial</option>
              <option>Art</option>
              <option>JAMB CLASS</option>
              <option>GCE</option>
            </select>
          </div>

          {/* Schedule and Time - Stack on mobile, grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Schedule
              </label>
              <select
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Every Monday</option>
                <option>Every Tuesday</option>
                <option>Every Wednesday</option>
                <option>Every Thursday</option>
                <option>Every Friday</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>5pm - 7pm</option>
                <option>2pm - 4pm</option>
                <option>4pm - 6pm</option>
                <option>3pm - 5pm</option>
                <option>9am - 11am</option>
              </select>
            </div>
          </div>

          {/* Location and Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Microsoft Teams</option>
                <option>Physical Class</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="1"
                max="100"
                required
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base order-2 sm:order-1"
            >
              Add Subject
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-1 sm:order-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassOverview;