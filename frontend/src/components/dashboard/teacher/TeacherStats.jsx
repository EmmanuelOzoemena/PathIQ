import React from 'react';
import { TrendingUp, AlertTriangle, Target, Users } from 'lucide-react';

const TeacherStats = ({ stats = {} }) => {
  const statItems = [
    {
      title: 'Class Readiness Score',
      value: `${stats.classReadiness || 72}%`,
      trend: '+5%',
      trendLabel: 'from last week',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Average Performance',
      value: `${stats.averageScore || 61}%`,
      trend: stats.averageScore < 70 ? 'Below Target' : 'On Track',
      trendLabel: '',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      title: 'Engagement Rate',
      value: `${stats.attendanceRate || 89}%`,
      trend: 'This week',
      trendLabel: '',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'At-Risk Students',
      value: `${stats.atRiskStudents || 14}%`,
      trend: 'Need Intervention',
      trendLabel: '',
      icon: AlertTriangle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-lg sm:rounded-xl`}>
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
            </div>
            <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
              index === 0 ? 'bg-emerald-100 text-emerald-700' :
              index === 1 ? (stats.averageScore < 70 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700') :
              index === 2 ? 'bg-blue-100 text-blue-700' :
              'bg-rose-100 text-rose-700'
            }`}>
              {stat.trend}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{stat.title}</p>
          <p className="text-xs text-gray-400">{stat.trendLabel}</p>
        </div>
      ))}
    </div>
  );
};

export default TeacherStats;