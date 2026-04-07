import React, { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';

const SubjectTable = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Mathematics',
      status: 'In-progress',
      schedule: 'Every Monday',
      time: '5pm - 7pm',
      location: 'Google Meet',
      locationIcon: '📹',
      capacity: 10,
      color: 'blue'
    },
    {
      id: 2,
      name: 'English Language',
      status: 'In-progress',
      schedule: 'Every Tuesday',
      time: '2pm - 4pm',
      location: 'Zoom',
      locationIcon: '🎥',
      capacity: 10,
      color: 'green'
    },
    {
      id: 3,
      name: 'Biology',
      status: 'In-progress',
      schedule: 'Every Wednesday',
      time: '4pm - 6pm',
      location: 'Google Meet',
      locationIcon: '📹',
      capacity: 10,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Economics',
      status: 'In-progress',
      schedule: 'Every Thursday',
      time: '3pm - 5pm',
      location: 'Zoom',
      locationIcon: '🎥',
      capacity: 10,
      color: 'amber'
    },
    {
      id: 5,
      name: 'Civic Education',
      status: 'In-progress',
      schedule: 'Every Friday',
      time: '5pm - 7pm',
      location: 'Google Meet',
      locationIcon: '📹',
      capacity: 10,
      color: 'rose'
    }
  ]);

  const getStatusBadge = (status) => {
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        <div className="col-span-3 text-sm font-medium text-gray-500">Class</div>
        <div className="col-span-2 text-sm font-medium text-gray-500">Status</div>
        <div className="col-span-3 text-sm font-medium text-gray-500">Time</div>
        <div className="col-span-2 text-sm font-medium text-gray-500">Location</div>
        <div className="col-span-1 text-sm font-medium text-gray-500">Capacity</div>
        <div className="col-span-1 text-sm font-medium text-gray-500"></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {subjects.map((subject) => (
          <div key={subject.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
            {/* Class Name */}
            <div className="col-span-3 flex items-center">
              <span className="font-medium text-gray-900">{subject.name}</span>
            </div>

            {/* Status */}
            <div className="col-span-2 flex items-center">
              {getStatusBadge(subject.status)}
            </div>

            {/* Time */}
            <div className="col-span-3">
              <p className="text-sm text-gray-900">{subject.schedule}</p>
              <p className="text-xs text-gray-500">{subject.time}</p>
            </div>

            {/* Location */}
            <div className="col-span-2 flex items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg">{subject.locationIcon}</span>
                <span className="text-sm text-gray-600">{subject.location}</span>
              </div>
            </div>

            {/* Capacity */}
            <div className="col-span-1 flex items-center">
              <span className="text-sm font-medium text-gray-900">{subject.capacity}</span>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex items-center justify-end">
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Card Layout */}
      <div className="lg:hidden p-4 space-y-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
              {getStatusBadge(subject.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Schedule</p>
                <p className="text-gray-900">{subject.schedule}</p>
                <p className="text-xs text-gray-500">{subject.time}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{subject.locationIcon}</span>
                  <span className="text-gray-900">{subject.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-sm text-gray-500">Capacity: </span>
                <span className="font-medium text-gray-900">{subject.capacity}</span>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTable;