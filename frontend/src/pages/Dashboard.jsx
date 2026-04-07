// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import CourseGrid from '../components/dashboard/CourseGrid';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Search, AlertCircle, BookOpen, X } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const coursesResponse = await api.courses.findAllCourses();

      let coursesData = [];
      if (coursesResponse) {
        if (coursesResponse.message && Array.isArray(coursesResponse.message)) {
          coursesData = coursesResponse.message;
        } else if (Array.isArray(coursesResponse)) {
          coursesData = coursesResponse;
        }
      }
      
      setAllCourses(coursesData);

      const savedJoined = localStorage.getItem('joined_courses');
      if (savedJoined) {
        const parsed = JSON.parse(savedJoined);
        setJoinedCourses(parsed);
      }

    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCourse = (course) => {
    const alreadyJoined = joinedCourses.some(c => c._id === course._id);
    if (alreadyJoined) {
      navigate(`/courses/${course._id}`);
      return;
    }

    const newJoinedCourse = {
      _id: course._id,
      courseTitle: course.courseTitle,
      courseCode: course.courseCode,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      icon: course.icon,
      progress: 0,
      completedTopics: 0,
      totalTopics: course.topics?.length || 4,
      enrolledDate: new Date().toISOString().split('T')[0]
    };

    const updatedJoined = [...joinedCourses, newJoinedCourse];
    setJoinedCourses(updatedJoined);
    localStorage.setItem('joined_courses', JSON.stringify(updatedJoined));
    
    navigate(`/courses/${course._id}`);
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleJoinClick = () => {
    setShowAvailableCourses(prev => !prev);
  };

  const handleCloseAvailableCourses = () => {
    setShowAvailableCourses(false);
    setSearchTerm('');
  };

  const filteredCourses = allCourses.filter(course => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (course.courseTitle || '').toLowerCase().includes(term) ||
      (course.courseCode || '').toLowerCase().includes(term)
    );
  });

  const calculateOverallProgress = () => {
    if (joinedCourses.length === 0) return 0;
    const total = joinedCourses.reduce((acc, c) => acc + (c.progress || 0), 0);
    return Math.round(total / joinedCourses.length);
  };

  if (loading) {
    return (
      <Layout activeItem="dashboard">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="dashboard">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 shrink-0" />
              <p className="text-sm sm:text-base text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Welcome Card with Join Button */}
          <WelcomeCard onJoinClick={handleJoinClick} />

          {/* My Courses Section */}
          {joinedCourses.length > 0 && (
            <div className="mt-6 sm:mt-8 md:mt-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                My Courses
              </h2>
              <CourseGrid 
                courses={joinedCourses}
                onContinueLearning={handleContinueLearning}
                joinedCourses={joinedCourses}
                showStudyHours={true}
              />
            </div>
          )}

          {/* Available Courses Section */}
          {showAvailableCourses && (
            <div className="mt-6 sm:mt-8 md:mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  Available Courses
                </h2>
                <button
                  onClick={handleCloseAvailableCourses}
                  className="inline-flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 transition-colors"
                />
              </div>

              {filteredCourses.length > 0 ? (
                <CourseGrid 
                  courses={filteredCourses}
                  onJoinCourse={handleJoinCourse}
                  onContinueLearning={handleContinueLearning}
                  joinedCourses={joinedCourses}
                  showStudyHours={false}
                />
              ) : (
                <div className="text-center py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">
                    No Courses Found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    {searchTerm ? `No courses matching "${searchTerm}"` : 'No courses available at the moment.'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;