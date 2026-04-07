// src/pages/AdminReports.jsx
import React, { useState } from "react";
import { FileText, Download, Calendar, Search, Filter, Plus } from "lucide-react";

const AdminReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("all");

  const reports = [
    { id: 1, name: "Student Performance Report", type: "PDF", date: "2024-03-20", size: "2.4 MB", category: "student" },
    { id: 2, name: "Course Completion Report", type: "Excel", date: "2024-03-19", size: "1.8 MB", category: "course" },
    { id: 3, name: "Enrollment Analytics", type: "PDF", date: "2024-03-18", size: "3.1 MB", category: "analytics" },
    { id: 4, name: "Student Progress Summary", type: "PDF", date: "2024-03-17", size: "1.2 MB", category: "student" },
    { id: 5, name: "Course Engagement Report", type: "Excel", date: "2024-03-16", size: "2.1 MB", category: "course" },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === "all" || report.category === reportType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500 mt-1">View and download analytics reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            Generate Report
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="all">All Reports</option>
                <option value="student">Student Reports</option>
                <option value="course">Course Reports</option>
                <option value="analytics">Analytics Reports</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Report Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Size</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-gray-900">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(report.date)}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-600">{report.size}</td>
                    <td className="py-3 px-6">
                      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Export All as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;