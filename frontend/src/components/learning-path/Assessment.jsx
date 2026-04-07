// src/components/learning-path/Assessment.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Clock, CheckCircle, Award, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Assessment = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    averageScore: 0
  });

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      console.log('📡 Fetching assessments...');
      
      // Fetch courses to generate assessments
      const courses = await api.student.getMyCourses().catch(() => []);
      console.log('📚 Courses for assessments:', courses);
      
      // In a real app, you'd have a dedicated assessments endpoint
      // For now, generate mock assessments from courses
      const mockAssessments = (courses || []).map((course, index) => ({
        id: course._id || `assess-${index}`,
        title: `${course.courseTitle || 'Course'} Assessment`,
        dueDate: index === 0 ? 'Due in 2 days' : index === 1 ? 'Due in 5 days' : 'Completed',
        questions: 15 + (index * 5),
        timeLimit: '45 mins',
        status: index === 0 ? 'pending' : index === 1 ? 'not-started' : 'completed',
        score: index === 2 ? '85%' : null,
        courseId: course._id
      }));

      // Calculate stats
      const completed = mockAssessments.filter(a => a.status === 'completed').length;
      const pending = mockAssessments.filter(a => a.status === 'pending' || a.status === 'not-started').length;
      const scores = mockAssessments
        .filter(a => a.score)
        .map(a => parseInt(a.score));
      const averageScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
        : 0;

      setAssessments(mockAssessments);
      setStats({ completed, pending, averageScore });

    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'pending':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  if (loading) {
    return (
      <Layout activeItem="learning-path" activeSubItem="assessment">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="learning-path" activeSubItem="assessment">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Assessments</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Test your knowledge and track your progress
              </p>
            </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base">
              Start New Assessment
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
            </div>
          </div>

          {/* Assessments List */}
          <div className="space-y-4">
            {assessments.length > 0 ? (
              assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {assessment.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(assessment.status)}`}>
                          <Clock className="w-3 h-3" />
                          {assessment.dueDate}
                        </span>
                        
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3" />
                          {assessment.questions} questions
                        </span>
                        
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {assessment.timeLimit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end sm:justify-start">
                      {assessment.status === 'completed' ? (
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Score</span>
                          <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                            {assessment.score}
                          </p>
                        </div>
                      ) : (
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-sm">
                          Start Assessment
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {assessment.status === 'completed' && (
                    <div className="mt-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Certificate available
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Assessments Yet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete some courses to unlock assessments
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;