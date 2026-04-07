import React from 'react';
import { Calendar, Users, BookOpen, Clock } from 'lucide-react';

const TeacherWelcome = ({ teacherName = "Admin", stats = {} }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Good Morning, {teacherName} 👋
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
          <span className="text-sm sm:text-base font-medium">
            Managing: PathIQ Platform Overview
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div className="bg-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2 text-indigo-600 mb-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Students</span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalStudents || 0}</p>
        </div>

        <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2 text-green-600 mb-1">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Guardians</span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalGuardians || 0}</p>
        </div>

        <div className="bg-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2 text-orange-600 mb-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Days to Exam</span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.daysToExam || 0}</p>
        </div>

        <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2 text-purple-600 mb-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Active Now</span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.activeNow || 12}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherWelcome;