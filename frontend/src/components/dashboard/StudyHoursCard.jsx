import React from 'react';
import { Clock, CheckCircle, TrendingUp } from 'lucide-react';

const StudyHoursCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Study Hours</h3>
        <span className="text-sm text-gray-500">Today</span>
      </div>
      
      <div className="space-y-4">
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#6366F1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * 0.33}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">67%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-indigo-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">67%</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Done</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">8/12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyHoursCard;