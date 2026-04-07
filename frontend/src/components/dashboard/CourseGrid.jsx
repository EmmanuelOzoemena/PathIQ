// src/components/dashboard/CourseGrid.jsx
import React from 'react';
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react';
import StudyHoursCard from './StudyHoursCard';

const CourseGrid = ({ 
  courses = [], 
  onJoinCourse,
  onContinueLearning,
  joinedCourses = [],
  showStudyHours = true 
}) => {
  
  const isCourseJoined = (courseId) => {
    return joinedCourses.some(c => c._id === courseId);
  };

  const getCourseProgress = (courseId) => {
    const course = joinedCourses.find(c => c._id === courseId);
    return course?.progress || 0;
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Courses Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          There are no courses to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {showStudyHours && (
        <div className="lg:col-span-1">
          <StudyHoursCard />
        </div>
      )}
      
      {courses.map((course) => {
        const joined = isCourseJoined(course._id);
        const progress = getCourseProgress(course._id);
        
        return (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-6xl">{course.icon || '📚'}</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                  {course.courseTitle}
                </h3>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full ml-2">
                  {course.courseCode}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {course.description}
              </p>
              
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-4">
                {course.instructor}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration || '4 weeks'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledStudent?.length || 0} students</span>
                </div>
              </div>
              
              {joined ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    onClick={() => onContinueLearning?.(course._id)}
                    className="w-full mt-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    Continue Learning
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onJoinCourse?.(course)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Join Course
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseGrid;