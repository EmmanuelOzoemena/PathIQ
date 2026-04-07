import React from 'react';
import { Clock, CheckCircle, BookOpen } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      action: 'Completed "Circle Geometry"',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      action: 'Finished "Reproduction System"',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      action: 'Started "Concord"',
      time: '3 days ago',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className={`p-1.5 ${activity.bg} rounded-lg`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;