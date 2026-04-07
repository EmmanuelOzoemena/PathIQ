import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Planner = () => {
  const upcomingTasks = [
    { day: 'Today', tasks: [
      { time: '10:00 AM', title: 'React Hooks Assessment', type: 'assessment', duration: '45 min' },
      { time: '2:00 PM', title: 'UI/UX Design Workshop', type: 'workshop', duration: '2 hours' },
    ]},
    { day: 'Tomorrow', tasks: [
      { time: '11:00 AM', title: 'JavaScript Fundamentals', type: 'study', duration: '1 hour' },
      { time: '3:00 PM', title: 'Team Meeting', type: 'meeting', duration: '30 min' },
    ]},
    { day: 'Wednesday', tasks: [
      { time: '9:00 AM', title: 'Node.js Project Review', type: 'review', duration: '1.5 hours' },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Learning Planner</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Calendar className="w-4 h-4" />
          Add to Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View - Simplified */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">March 2024</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-gray-500 py-1">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`py-2 text-sm rounded-full cursor-pointer hover:bg-indigo-50 ${
                  i + 1 === 15 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {upcomingTasks.map((section, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{section.day}</h3>
              <div className="space-y-4">
                {section.tasks.map((task, taskIdx) => (
                  <div key={taskIdx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-medium text-gray-900">{task.time}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <span className="text-xs text-gray-500">{task.duration}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;