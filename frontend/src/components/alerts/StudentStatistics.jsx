import React from 'react';
import { Users, UserCheck, UserPlus, UserX } from 'lucide-react';

const StudentStatistics = () => {
  const classes = [
    { name: 'Class A', registered: 20, color: 'blue' },
    { name: 'Class B', registered: 40, color: 'green' },
    { name: 'Class C', registered: 35, color: 'purple' },
    { name: 'Class D', registered: 50, color: 'amber' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      amber: 'bg-amber-100 text-amber-600',
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Statistics</h3>
      
      <div className="space-y-3">
        {classes.map((cls, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getColorClasses(cls.color)}`}>
                <Users className="w-4 h-4" />
              </div>
              <span className="font-medium text-gray-700">{cls.name}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-900">{cls.registered}</span>
              <span className="text-xs text-gray-500 ml-1">Registered</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Students</span>
          <span className="text-xl font-bold text-gray-900">145</span>
        </div>
      </div>
    </div>
  );
};

export default StudentStatistics;