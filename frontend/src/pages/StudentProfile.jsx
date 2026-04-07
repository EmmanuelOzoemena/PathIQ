// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProfileHeader from '../components/profile/ProfileHeader';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { AlertCircle, User, Mail, Calendar, Award, BookOpen } from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedTopics: 0,
    totalTopics: 0,
    averageProgress: 0
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError('');

    try {
      const profile = await api.student.getProfile().catch(() => null);
      setProfileData(profile);

      const savedJoined = localStorage.getItem('joined_courses');
      if (savedJoined) {
        const joined = JSON.parse(savedJoined);
        const totalProgress = joined.reduce((acc, c) => acc + (c.progress || 0), 0);
        const avgProgress = joined.length > 0 ? Math.round(totalProgress / joined.length) : 0;
        const completed = joined.reduce((acc, c) => acc + (c.completedTopics || 0), 0);
        const total = joined.reduce((acc, c) => acc + (c.totalTopics || 0), 0);

        setStats({
          totalCourses: joined.length,
          completedTopics: completed,
          totalTopics: total,
          averageProgress: avgProgress
        });
      }

    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout activeItem="profile">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="profile">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 shrink-0" />
              <p className="text-sm sm:text-base text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <ProfileHeader user={user} profileData={profileData} />

          {/* Profile Information */}
          <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                Profile Information
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white break-words">
                      {user?.email || profileData?.email || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                      {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white capitalize">{user?.role || 'student'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Statistics */}
          <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                Learning Statistics
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 mb-1">Courses Enrolled</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCourses}</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mb-1">Average Progress</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stats.averageProgress}%</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 mb-1">Topics Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.completedTopics}/{stats.totalTopics}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;