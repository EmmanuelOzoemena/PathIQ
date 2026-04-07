import React from 'react';
import { FileText, Megaphone, Download, Calendar, ChevronRight } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: FileText, label: 'Create Assignment', color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { icon: Megaphone, label: 'Send Announcement', color: 'text-amber-600', bg: 'bg-amber-100' },
    { icon: Download, label: 'Download Report', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 ${action.bg} rounded-lg`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Calendar className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">This Week</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">View Planner</h3>
        <p className="text-indigo-100 mb-6">Check your schedule and upcoming tasks</p>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
          Open Planner
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-16 text-indigo-200">9:00 AM</span>
            <span className="flex-1">Mathematics - JAMB Prep</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-16 text-indigo-200">11:00 AM</span>
            <span className="flex-1">Physics - Group Discussion</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-16 text-indigo-200">2:00 PM</span>
            <span className="flex-1">Chemistry - Lab Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;