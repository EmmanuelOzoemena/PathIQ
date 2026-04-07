import React from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import StudentStatistics from './StudentStatistics';
import UpcomingActivities from './UpcomingActivities';
import AttendanceList from './AttendanceList';
import StaffRoom from './StaffRoom';
import Documents from './Documents';

const AlertsAndRecommendations = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Bell className="w-6 h-6 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Recommendations</h1>
      </div>

      {/* Main Grid - 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Student Statistics & Attendance */}
        <div className="space-y-6">
          <StudentStatistics />
          <AttendanceList />
        </div>

        {/* Middle Column - Upcoming Activities */}
        <div className="lg:col-span-1">
          <UpcomingActivities />
        </div>

        {/* Right Column - Staff Room & Documents */}
        <div className="space-y-6">
          <StaffRoom />
          <Documents />
        </div>
      </div>

      {/* Bottom Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600" />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">3 urgent actions</span> require your attention. Please check the upcoming activities and staff room messages.
        </p>
      </div>
    </div>
  );
};

export default AlertsAndRecommendations;