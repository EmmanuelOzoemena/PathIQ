import React from 'react';
import { BookOpen, TrendingUp, Award, Calendar, Clock, User } from 'lucide-react';
import SubjectProgressCard from './SubjectProgressCard';
import PerformanceOverview from './PerformanceOverview';
import RecentActivity from './RecentActivity';
import LoginFrequency from './LoginFrequency';

const EngagementAnalysis = () => {
  const subjects = [
    { name: 'MATHEMATICS', progress: 40, icon: '📐', color: 'blue' },
    { name: 'English Language', progress: 20, icon: '📚', color: 'green' },
    { name: 'Biology', progress: 70, icon: '🧬', color: 'purple' },
    { name: 'Economics', progress: 40, icon: '📊', color: 'amber' },
    { name: 'Civic Education', progress: 20, icon: '🏛️', color: 'rose' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">ENGAGEMENT ANALYSIS</h1>

      {/* Main Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Subject Progress Cards (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Engagement Score Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Student Engagement Score</h2>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <SubjectProgressCard key={index} subject={subject} />
            ))}
          </div>

          {/* Total Course Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 mb-1">Total Course</p>
                <p className="text-4xl font-bold mb-2">5</p>
                <p className="text-indigo-100">Course</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-2">67%</div>
                <p className="text-indigo-100">Overall Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Overview Cards (1/3 width) */}
        <div className="space-y-6">
          {/* Performance Overview */}
          <PerformanceOverview />

          {/* Recent Activity */}
          <RecentActivity />

          {/* Login Frequency */}
          <LoginFrequency />

          {/* Survey/Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Grace+Mike&background=6366f1&color=fff&size=48"
                alt="Grace Mike"
                className="w-12 h-12 rounded-full ring-2 ring-indigo-100"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Grace Mike</p>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  View profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementAnalysis;