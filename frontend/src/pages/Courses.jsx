// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api } from '../services/api';
import { 
  BookOpen, Search, Users, AlertCircle, RefreshCw, ChevronRight
} from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.courses.findAllCourses();
      
      let coursesData = [];
      if (response?.message && Array.isArray(response.message)) {
        coursesData = response.message;
      } else if (Array.isArray(response)) {
        coursesData = response;
      }
      
      setCourses(coursesData);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId) => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    }
  };

  const filteredCourses = courses.filter(course => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (course.courseTitle || '').toLowerCase().includes(searchLower) ||
           (course.courseCode || '').toLowerCase().includes(searchLower);
  });

  if (loading) {
    return (
      <Layout activeItem="courses">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="courses">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Available Courses
            </h1>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          )}

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => handleCourseClick(course._id)}
                  className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="p-2 sm:p-2.5 md:p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-[10px] sm:text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium">
                        {course.courseCode}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {course.courseTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                      {course.description || 'No description available'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{course.enrolledStudent?.length || 0} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{course.topics?.length || 0} topics</span>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-sm sm:text-base font-medium">
                      <span>View Course</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'No Matching Courses' : 'No Courses Available'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm 
                  ? `No courses found matching "${searchTerm}". Try a different search term.`
                  : "Check back later for new courses or contact your administrator."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;