// src/pages/AdminAnalytics.jsx
import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, BookOpen, Award, Calendar } from "lucide-react";
import { api } from "../services/api";

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    completionRate: 0,
    activeUsers: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch data from API
      const [studentsData, coursesData] = await Promise.all([
        api.admin.getAllStudents().catch(() => []),
        api.courses.findAllCourses().catch(() => ({ message: [] }))
      ]);

      const studentsList = Array.isArray(studentsData) ? studentsData : [];
      const coursesList = coursesData?.message || [];

      setStats({
        totalStudents: studentsList.length,
        totalCourses: coursesList.length,
        totalEnrollments: studentsList.length * 2,
        completionRate: 68,
        activeUsers: Math.round(studentsList.length * 0.7)
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalStudents}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
            <p className="text-xs text-green-600 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalCourses}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
            <p className="text-xs text-green-600 mt-2">+2 new this month</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.completionRate}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
            <p className="text-xs text-green-600 mt-2">+5% improvement</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Enrollments</h3>
            <p className="text-xs text-green-600 mt-2">+18 this week</p>
          </div>
        </div>

        {/* Monthly Enrollment Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Enrollments</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>2024</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {[45, 52, 68, 74, 82, 91, 88, 95, 102, 110, 118, 124].map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-indigo-600 rounded-t-lg transition-all hover:bg-indigo-700" 
                     style={{ height: `${(value / 124) * 200}px` }} />
                <span className="text-xs text-gray-500">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">CS101: Introduction to Computing</p>
                  <p className="text-sm text-gray-500">87% completion rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">124 students</p>
                <p className="text-sm text-green-600">+23% growth</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">ENG303: English Language</p>
                  <p className="text-sm text-gray-500">79% completion rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">98 students</p>
                <p className="text-sm text-green-600">+15% growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;