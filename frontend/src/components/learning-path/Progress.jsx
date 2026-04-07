// src/components/learning-path/Progress.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { 
  TrendingUp, 
  Award, 
  CheckCircle, 
  Clock,
  BarChart3,
  BookOpen,
  Target,
  Zap,
  Calendar,
  Activity,
  PieChart
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Progress = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressData, setProgressData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    setLoading(true);
    try {
      console.log('📡 Fetching progress data...');
      
      // Fetch real progress data from API
      const [progress, enrolledCourses] = await Promise.all([
        api.student.getMyProgress().catch(err => {
          console.error('⚠️ Progress fetch failed:', err);
          return null;
        }),
        api.student.getMyCourses().catch(err => {
          console.error('⚠️ Courses fetch failed:', err);
          return [];
        })
      ]);

      console.log('📊 Progress data:', progress);
      console.log('📚 Enrolled courses:', enrolledCourses);

      setProgressData(progress);
      setCourses(enrolledCourses || []);

      // Generate weekly activity data (this would come from API in production)
      const mockWeeklyData = [
        { day: 'Mon', hours: 4, completed: 3 },
        { day: 'Tue', hours: 6, completed: 5 },
        { day: 'Wed', hours: 5, completed: 4 },
        { day: 'Thu', hours: 7, completed: 6 },
        { day: 'Fri', hours: 5, completed: 4 },
        { day: 'Sat', hours: 3, completed: 2 },
        { day: 'Sun', hours: 2, completed: 1 },
      ];
      setWeeklyData(mockWeeklyData);

    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  
  const averageProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length) 
    : 0;
  
  const streakDays = progressData?.streak_length || user?.streak?.count || 0;
  const totalHours = weeklyData.reduce((acc, day) => acc + day.hours, 0);
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  // Subject performance from courses
  const subjects = courses.slice(0, 4).map(course => ({
    name: course.courseTitle || 'Course',
    progress: course.progress || 0,
    color: getSubjectColor(course.courseTitle || ''),
    bg: getSubjectBg(course.courseTitle || '')
  }));

  // Fill with default subjects if not enough courses
  while (subjects.length < 4) {
    const defaultSubjects = [
      { name: 'Mathematics', progress: 0, color: 'text-blue-600', bg: 'bg-blue-600' },
      { name: 'Physics', progress: 0, color: 'text-purple-600', bg: 'bg-purple-600' },
      { name: 'Chemistry', progress: 0, color: 'text-green-600', bg: 'bg-green-600' },
      { name: 'Biology', progress: 0, color: 'text-amber-600', bg: 'bg-amber-600' }
    ];
    subjects.push(defaultSubjects[subjects.length]);
  }

  function getSubjectColor(title) {
    const colors = {
      'Mathematics': 'text-blue-600',
      'Physics': 'text-purple-600',
      'Chemistry': 'text-green-600',
      'Biology': 'text-amber-600',
      'English': 'text-red-600',
    };
    return colors[title] || 'text-indigo-600';
  }

  function getSubjectBg(title) {
    const bgs = {
      'Mathematics': 'bg-blue-600',
      'Physics': 'bg-purple-600',
      'Chemistry': 'bg-green-600',
      'Biology': 'bg-amber-600',
      'English': 'bg-red-600',
    };
    return bgs[title] || 'bg-indigo-600';
  }

  if (loading) {
    return (
      <Layout activeItem="learning-path" activeSubItem="progress">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="learning-path" activeSubItem="progress">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">My Progress</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Track your learning journey and performance across all courses
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Overall Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{averageProgress}%</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Overall Progress</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{completedCourses}/{totalCourses} Courses Completed</p>
            </div>

            {/* Average Score Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                  {inProgressCourses} active
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{averageProgress}%</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Average Score</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Across {totalCourses} courses</p>
            </div>

            {/* Assessment Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">8</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Assessments Taken</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Last score: 92%</p>
            </div>

            {/* Current Streak Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{streakDays} Days</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Current Streak</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Keep up the momentum!</p>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h3>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                  <span>Study Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Completed</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-1 sm:gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1 sm:gap-2">
                  <div className="relative w-full flex justify-center gap-0.5 sm:gap-1">
                    <div 
                      className="w-3 sm:w-4 bg-indigo-600 rounded-t-lg transition-all duration-300"
                      style={{ height: `${(day.hours / maxHours) * 80}px`, minHeight: '20px' }}
                    />
                    <div 
                      className="w-3 sm:w-4 bg-green-500 rounded-t-lg transition-all duration-300"
                      style={{ height: `${(day.completed / maxHours) * 60}px`, minHeight: '15px' }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Progress List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Progress</h3>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course._id || index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{course.courseTitle}</span>
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No courses enrolled yet. Browse courses to get started!
              </p>
            )}
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Performance Overview */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
              
              <div className="space-y-4">
                {/* Mastered */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Mastered</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {Math.min(100, averageProgress + 15)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 rounded-full" 
                      style={{ width: `${Math.min(100, averageProgress + 15)}%` }} 
                    />
                  </div>
                </div>

                {/* Improved */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Improved</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{averageProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${averageProgress}%` }} 
                    />
                  </div>
                </div>

                {/* Needs Improvement */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Needs improvement</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {Math.max(0, 100 - averageProgress - 15)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-600 rounded-full" 
                      style={{ width: `${Math.max(0, 100 - averageProgress - 15)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Subject Performance</h3>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Weekly</span>
              </div>

              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${subject.bg}`} />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{subject.name}</span>
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold ${subject.color}`}>{subject.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${subject.bg} rounded-full transition-all duration-300`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900 dark:text-white">Quick Learner</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Completed 5 lessons</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900 dark:text-white">On Fire</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{streakDays} day streak</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900 dark:text-white">Perfect Score</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100% on quiz</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900 dark:text-white">Course Master</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Completed {completedCourses} course</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;