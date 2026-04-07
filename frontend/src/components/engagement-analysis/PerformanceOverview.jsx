import React from 'react';
import { TrendingUp, Award, Star, Calendar } from 'lucide-react';

const PerformanceOverview = () => {
  const metrics = [
    {
      label: 'Current Streak',
      value: '7',
      unit: 'Days',
      icon: TrendingUp,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
    {
      label: 'Courses Completed',
      value: '5',
      unit: 'Courses',
      icon: Award,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Average Score',
      value: '85',
      unit: 'Points',
      icon: Star,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${metric.bg} rounded-lg`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-900">{metric.value}</span>
              <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;