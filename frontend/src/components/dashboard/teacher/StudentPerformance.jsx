import React from 'react';
import { TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

const StudentPerformance = () => {
  const topStudents = [
    { name: 'Jonathan Doe', score: '90%', trend: 'up' },
    { name: 'Michael Emeka', score: '88%', trend: 'up' },
    { name: 'Tasha Noah', score: '85%', trend: 'up' },
  ];

  const atRiskStudents = [
    { name: 'Jane Smith', score: '35%', trend: 'down' },
    { name: 'Michael Joe', score: '41%', trend: 'down' },
    { name: 'Bright Luke', score: '25%', trend: 'down' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Top Performing Students</h3>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {topStudents.map((student, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{student.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-600">{student.score}</span>
                <span className="text-emerald-600">↑</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Students Needing Support</h3>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {atRiskStudents.map((student, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{student.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rose-600">{student.score}</span>
                <span className="text-rose-600">↓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;