import React from 'react';
import { Calendar, Clock, Video, FileText, ChevronRight, AlertCircle } from 'lucide-react';

const UpcomingActivities = () => {
  const activities = [
    {
      class: 'Class A',
      title: 'Meeting with the VC',
      type: 'meeting',
      link: 'https://www.zoom.com',
      linkText: 'zoom.com',
      status: 'due-soon',
      statusText: 'Due soon'
    },
    {
      class: 'Class B',
      title: 'Meeting with the J...',
      type: 'meeting',
      link: 'https://www.zoom.com',
      linkText: 'zoom.com',
      status: 'upcoming',
      statusText: 'Upcoming'
    },
    {
      class: 'Class C',
      title: 'Class B middle session',
      type: 'lab',
      location: 'Physics science Lab',
      status: 'upcoming',
      statusText: 'Upcoming'
    },
    {
      class: 'Class D',
      title: 'Send Mr Ayo class...',
      type: 'document',
      action: 'Send Document via email',
      status: 'upcoming',
      statusText: 'Upcoming'
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'due-soon') {
      return (
        <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Due soon
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
        Upcoming
      </span>
    );
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'meeting':
        return <Video className="w-4 h-4" />;
      case 'lab':
        return <Clock className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Activities</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {activity.class}
              </span>
              {getStatusBadge(activity.status)}
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{activity.title}</h4>

            {activity.link && (
              <a 
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-2"
              >
                {getTypeIcon(activity.type)}
                <span>{activity.linkText}</span>
              </a>
            )}

            {activity.location && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                {getTypeIcon(activity.type)}
                <span>{activity.location}</span>
              </div>
            )}

            {activity.action && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{activity.action}</span>
              </div>
            )}

            <div className="mt-3 flex justify-end">
              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                View details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;