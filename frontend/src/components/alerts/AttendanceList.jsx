import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendanceList = () => {
  const weeks = [
    { week: 'Week 5', present: 42, absent: 8, total: 50 },
    { week: 'Week 4', present: 38, absent: 12, total: 50 },
    { week: 'Week 3', present: 45, absent: 5, total: 50 },
    { week: 'Week 2', present: 40, absent: 10, total: 50 },
    { week: 'Week 1', present: 35, absent: 15, total: 50 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {weeks.map((week, index) => {
          const attendanceRate = Math.round((week.present / week.total) * 100);
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="font-medium text-gray-700">{week.week}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-gray-600">{week.present}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  <span className="text-xs text-gray-600">{week.absent}</span>
                </div>
                <div className="w-12 text-right">
                  <span className={`text-xs font-medium ${
                    attendanceRate >= 80 ? 'text-green-600' :
                    attendanceRate >= 60 ? 'text-amber-600' :
                    'text-rose-600'
                  }`}>
                    {attendanceRate}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Average Attendance</span>
          <span className="font-bold text-gray-900">82%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;