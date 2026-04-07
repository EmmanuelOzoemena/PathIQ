import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';

const ReportSummary = ({ subjects }) => {
  // Calculate statistics
  const totalCourses = subjects.length;
  const totalScore = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = Math.round(totalScore / totalCourses);
  const passedCourses = subjects.filter(subject => subject.total >= 40).length;
  const failedCourses = subjects.filter(subject => subject.total < 40).length;

  // Calculate total study time (mock data)
  const totalStudyTime = '3h 30min';

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
      
      <div className="space-y-4">
        {/* Total Courses */}
        <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm text-gray-600">Total Courses</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{totalCourses}</span>
          </div>
        </div>

        {/* Average Score */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Average Score</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{averageScore}%</span>
          </div>
        </div>

        {/* Study Time */}
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Study Time</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{totalStudyTime}</span>
          </div>
        </div>

        {/* Pass/Fail Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{passedCourses}</p>
            <p className="text-xs text-gray-500">Passed</p>
          </div>
          <div className="text-center p-3 bg-rose-50 rounded-lg">
            <p className="text-2xl font-bold text-rose-600">{failedCourses}</p>
            <p className="text-xs text-gray-500">Failed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;