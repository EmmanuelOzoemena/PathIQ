import React from 'react';
import { ChevronRight } from 'lucide-react';

const SubjectProgressCard = ({ subject }) => {
  const getProgressColor = (progress) => {
    if (progress >= 70) return 'text-green-600';
    if (progress >= 40) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getProgressBg = (progress) => {
    if (progress >= 70) return 'bg-green-600';
    if (progress >= 40) return 'bg-amber-600';
    return 'bg-rose-600';
  };

  const getIconBg = (color) => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
      amber: 'bg-amber-100',
      rose: 'bg-rose-100'
    };
    return colors[color] || 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 ${getIconBg(subject.color)} rounded-lg flex items-center justify-center text-xl`}>
          {subject.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">Progress:</span>
            <span className={`font-bold ${getProgressColor(subject.progress)}`}>
              {subject.progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${getProgressBg(subject.progress)} rounded-full transition-all duration-300`}
          style={{ width: `${subject.progress}%` }}
        />
      </div>

      {/* Continue Button */}
      <button className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors group">
        <span className="text-sm font-medium">Continue</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default SubjectProgressCard;