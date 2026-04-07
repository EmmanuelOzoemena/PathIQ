import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import DepartmentTabs from '../components/student-performance/DepartmentTabs';
import LevelTabs from '../components/student-performance/LevelTabs';
import StudentList from '../components/student-performance/StudentList';
import { Plus, UserPlus, X } from 'lucide-react';

const StudentPerformancePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Science');
  const [selectedLevel, setSelectedLevel] = useState('SS-1');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'NOAH IBRAHIM', initial: 'N', performance: 85, status: 'excellent' },
    { id: 2, name: 'MARY UCHE', initial: 'M', performance: 72, status: 'good' },
    { id: 3, name: 'USMAN ALIU', initial: 'U', performance: 68, status: 'average' },
    { id: 4, name: 'OLASHOLA ADEDEJI', initial: 'O', performance: 91, status: 'excellent' },
    { id: 5, name: 'EMEKA ISREAL', initial: 'E', performance: 45, status: 'needs-help' },
    { id: 6, name: 'DONALD TRIUMP', initial: 'D', performance: 78, status: 'good' },
    { id: 7, name: 'ADEMOLA FRANCIS', initial: 'A', performance: 82, status: 'excellent' },
    { id: 8, name: 'IRFAN DAMILOLA', initial: 'I', performance: 63, status: 'average' },
    { id: 9, name: 'AKPAN BLESSING', initial: 'A', performance: 88, status: 'excellent' },
    { id: 10, name: 'BODE GEORGE', initial: 'B', performance: 71, status: 'good' },
  ]);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowAddModal(false);
  };

  return (
    <Layout activeItem="student-performance">
      {/* Header with Add Button - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">STUDENT PERFORMANCE</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
        >
          <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Add New Student</span>
        </button>
      </div>
      
      {/* Filters Section - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Department Tabs */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Departments
            </label>
            <div className="overflow-x-auto pb-2 -mx-2 px-2">
              <div className="min-w-max sm:min-w-0">
                <DepartmentTabs 
                  selected={selectedDepartment} 
                  onSelect={setSelectedDepartment} 
                />
              </div>
            </div>
          </div>

          {/* Level Tabs */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Level
            </label>
            <div className="overflow-x-auto pb-2 -mx-2 px-2">
              <div className="min-w-max sm:min-w-0">
                <LevelTabs 
                  selected={selectedLevel} 
                  onSelect={setSelectedLevel} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <StudentList 
            students={students}
            department={selectedDepartment}
            level={selectedLevel}
            onSelectStudent={setSelectedStudent}
          />
        </div>
      </div>

      {/* Add Student Modal - Responsive */}
      {showAddModal && (
        <AddStudentModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStudent}
        />
      )}
    </Layout>
  );
};

// Add Student Modal Component - Responsive
const AddStudentModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: 'Science',
    level: 'SS-1',
    email: '',
    phone: '',
    guardian: '',
    guardianPhone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newStudent = {
      id: Date.now(),
      name: formData.name.toUpperCase(),
      initial: formData.name.charAt(0).toUpperCase(),
      performance: 0,
      status: 'average',
      department: formData.department,
      level: formData.level,
      email: formData.email,
      phone: formData.phone,
      guardian: formData.guardian,
      guardianPhone: formData.guardianPhone
    };
    
    onAdd(newStudent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Sticky */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Student</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 pb-2 border-b border-gray-100">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="student@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 pb-2 border-b border-gray-100">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option>Science</option>
                  <option>Commercial</option>
                  <option>Art</option>
                  <option>JAMB CLASS</option>
                  <option>GCE</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Level <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option>SS-1</option>
                  <option>SS-2</option>
                  <option>SS-3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 pb-2 border-b border-gray-100">
              Guardian Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.guardian}
                  onChange={(e) => setFormData({...formData, guardian: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Parent/Guardian name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Guardian Phone
                </label>
                <input
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({...formData, guardianPhone: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base order-2 sm:order-1"
            >
              <Plus className="w-4 h-4" />
              Add Student
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

export default StudentPerformancePage;