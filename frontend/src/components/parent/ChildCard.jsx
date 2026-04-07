import React from 'react';
import { ChevronRight, GraduationCap, TrendingUp } from 'lucide-react';

const ChildCard = ({ child }) => {
  const getProgressColor = (progress) => {
    if (progress >= 70) return 'text-emerald-600';
    if (progress >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getProgressBg = (progress) => {
    if (progress >= 70) return 'bg-emerald-600';
    if (progress >= 50) return 'bg-amber-600';
    return 'bg-rose-600';
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={child.avatar}
          alt={child.name}
          className="w-14 h-14 rounded-full ring-2 ring-indigo-100"
        />

        {/* Child Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{child.name}</h3>
            <span className="text-sm text-gray-500">{child.grade}</span>
          </div>

          {/* Learning Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Learning Progress</span>
              <span className={`font-medium ${getProgressColor(child.progress)}`}>
                {child.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressBg(child.progress)} rounded-full transition-all duration-300`}
                style={{ width: `${child.progress}%` }}
              />
            </div>
          </div>

          {/* View Details Button */}
          <button className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors group">
            <span className="text-sm font-medium">View Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Assignments</p>
          <p className="text-sm font-semibold text-gray-900">12</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Completed</p>
          <p className="text-sm font-semibold text-gray-900">
            {Math.round(child.progress * 12 / 100)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Avg Score</p>
          <p className="text-sm font-semibold text-gray-900">
            {Math.round(child.progress / 10)}.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;