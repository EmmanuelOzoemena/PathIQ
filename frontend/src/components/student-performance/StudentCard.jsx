import React from 'react';
import { ChevronRight } from 'lucide-react';

const StudentCard = ({ student, onClick }) => {
  const getPerformanceColor = (status) => {
    switch(status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'average':
        return 'text-amber-600 bg-amber-100';
      case 'needs-help':
        return 'text-rose-600 bg-rose-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceText = (status) => {
    switch(status) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'average':
        return 'Average';
      case 'needs-help':
        return 'Needs Help';
      default:
        return 'Pending';
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
    >
      <div className="flex items-center gap-3">
        {/* Avatar with initial */}
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">{student.initial}</span>
        </div>
        
        {/* Student Info */}
        <div className="text-left">
          <p className="font-medium text-gray-900">{student.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPerformanceColor(student.status)}`}>
              {getPerformanceText(student.status)}
            </span>
            <span className="text-xs text-gray-500">
              Performance: {student.performance}%
            </span>
          </div>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
    </button>
  );
};

export default StudentCard;