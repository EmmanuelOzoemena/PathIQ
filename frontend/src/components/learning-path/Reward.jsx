// src/components/learning-path/Reward.jsx
import React from 'react';
import Layout from '../layout/Layout';
import { Award, Star, Trophy, Gift } from 'lucide-react';

const Reward = () => {
  const achievements = [
    { title: 'Quick Learner', description: 'Complete 5 assessments', progress: 3, total: 5, icon: Star, color: 'text-yellow-500' },
    { title: 'Consistency King', description: '7-day learning streak', progress: 7, total: 7, icon: Trophy, color: 'text-purple-500', completed: true },
    { title: 'Course Master', description: 'Complete 3 courses', progress: 2, total: 3, icon: Award, color: 'text-blue-500' },
  ];

  const rewards = [
    { name: 'Premium Content Access', points: 1000, icon: Gift },
    { name: '1-on-1 Mentorship', points: 2500, icon: Star },
    { name: 'Course Discount', points: 500, icon: Award },
  ];

  return (
    <Layout activeItem="learning-path" activeSubItem="reward">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Rewards & Achievements</h1>

          {/* Points Overview */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
            <p className="text-indigo-100 text-xs sm:text-sm mb-1 sm:mb-2">Your Points Balance</p>
            <p className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">2,450</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="bg-white/20 rounded-lg px-3 sm:px-4 py-2">
                <p className="text-xs text-indigo-100">This Month</p>
                <p className="text-sm sm:text-base font-semibold">+450 points</p>
              </div>
              <div className="bg-white/20 rounded-lg px-3 sm:px-4 py-2">
                <p className="text-xs text-indigo-100">Rank</p>
                <p className="text-sm sm:text-base font-semibold">#12 of 234</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Current Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${achievement.color.split('-')[1]}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <achievement.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${achievement.color}`} />
                    </div>
                    <div className="sm:hidden">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="hidden sm:block">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                  </div>
                  
                  {achievement.completed && (
                    <span className="sm:ml-4 px-2 sm:px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full whitespace-nowrap">
                      Completed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Redeem Points</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <reward.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2">{reward.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{reward.points} points</p>
                  <button className="w-full px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs sm:text-sm">
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reward;