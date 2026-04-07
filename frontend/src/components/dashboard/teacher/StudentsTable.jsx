import React from 'react';
import { MoreVertical, Mail, MessageSquare, FileText } from 'lucide-react';

const StudentsTable = () => {
  const students = [
    { name: 'Tasha Noah', avgScore: '88%', lastActivity: 'Today', riskLevel: 'Low', riskColor: 'emerald' },
    { name: 'Michael Emeka', avgScore: '90%', lastActivity: '1d ago', riskLevel: 'Low', riskColor: 'emerald' },
    { name: 'Jane Smith', avgScore: '28%', lastActivity: 'Yesterday', riskLevel: 'High', riskColor: 'rose' },
    { name: 'Amina Hassan', avgScore: '50%', lastActivity: '2d ago', riskLevel: 'Medium', riskColor: 'amber' },
    { name: 'Bright Luke', avgScore: '41%', lastActivity: '4d ago', riskLevel: 'High', riskColor: 'rose' },
    { name: 'Jonathan Doe', avgScore: '90%', lastActivity: 'Today', riskLevel: 'Low', riskColor: 'emerald' },
  ];

  const getRiskBadge = (level, color) => {
    const colors = {
      emerald: 'bg-emerald-100 text-emerald-700',
      amber: 'bg-amber-100 text-amber-700',
      rose: 'bg-rose-100 text-rose-700'
    };
    return `${colors[color]} px-3 py-1 rounded-full text-xs font-medium`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Students</h3>
        <div className="flex items-center gap-3">
          <button className="text-sm text-gray-500 hover:text-gray-700">Filter</button>
          <button className="text-sm text-gray-500 hover:text-gray-700">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Avg Score</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Activity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Risk Level</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">{student.name}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${
                    student.riskLevel === 'Low' ? 'text-emerald-600' :
                    student.riskLevel === 'Medium' ? 'text-amber-600' :
                    'text-rose-600'
                  }`}>
                    {student.avgScore}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{student.lastActivity}</td>
                <td className="py-3 px-4">
                  <span className={getRiskBadge(student.riskLevel, student.riskColor)}>
                    {student.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Showing 1-6 of 42 students</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;