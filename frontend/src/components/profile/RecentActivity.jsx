import React from 'react';
import { Clock, CheckCircle, BookOpen } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      action: 'Completed "Circle Geometry"',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      id: 2,
      action: 'Finished "Reproduction System"',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      id: 3,
      action: 'Started "Chemical Bonding"',
      time: '2 days ago',
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      id: 4,
      action: 'Scored 85% in Mathematics Quiz',
      time: '3 days ago',
      icon: CheckCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 ${activity.bg} rounded-lg`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        View all activity →
      </button>
    </div>
  );
};

export default RecentActivity;