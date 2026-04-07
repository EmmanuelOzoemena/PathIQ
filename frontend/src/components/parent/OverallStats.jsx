import React from 'react';
import { TrendingUp, Star, Target } from 'lucide-react';

const OverallStats = () => {
  const stats = [
    {
      title: 'Total Learning Progress',
      value: '75%',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      trend: '+5% this week'
    },
    {
      title: 'Average Score',
      value: '4.7',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      trend: 'Out of 5.0'
    },
    {
      title: 'Progress Score',
      value: '50%',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'Overall completion'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 ${stat.bgColor} rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
          <p className="text-xs text-gray-400">{stat.trend}</p>
        </div>
      ))}
    </div>
  );
};

export default OverallStats;