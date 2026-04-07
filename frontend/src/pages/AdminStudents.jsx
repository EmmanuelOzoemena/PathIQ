// src/pages/AdminStudents.jsx
import React, { useState, useEffect } from "react";
import { Search, Eye, Trash2, Users, Mail, Phone } from "lucide-react";
import { api } from "../services/api";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.admin.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to load students. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.admin.deleteAccount(studentId);
        setStudents(students.filter(s => s._id !== studentId));
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student");
      }
    }
  };

  const handleSendReminder = async () => {
    try {
      await api.admin.triggerReminders();
      alert("Reminders sent successfully!");
    } catch (error) {
      console.error("Error sending reminders:", error);
      alert("Failed to send reminders");
    }
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and monitor all enrolled students</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSendReminder}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Mail className="w-4 h-4" />
              Send Reminders
            </button>
            <div className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200">
              <Users className="w-4 h-4 inline mr-1 text-gray-500" />
              Total: {students.length} students
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Progress</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-900">{student.name || student.fullName}</td>
                    <td className="py-3 px-6 text-gray-600">{student.email}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${student.progress || 0}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.isVerified 
                          ? "bg-green-100 text-green-600" 
                          : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {student.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {/* View details */}}
                          className="p-1 text-indigo-600 hover:text-indigo-800" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(student._id)}
                          className="p-1 text-red-600 hover:text-red-800" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500">Try adjusting your search or wait for students to enroll</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;