// src/pages/Assessment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, ChevronRight, Clock } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const coursesRes = await api.courses.findAllCourses();
      const courses = coursesRes.message || [];

      const allAssessments = [];
      for (const course of courses) {
        course.topics?.forEach((topic) => {
          const topicId = topic._id || topic.id || topic.topicId;
          
          if (!topicId) return;
          
          allAssessments.push({
            id: `quiz-${course._id}-${topicId}`,
            type: 'quiz',
            title: `${course.courseTitle} – ${topic.title} Quiz`,
            courseId: course._id,
            topicId: topicId,
            duration: topic.quiz?.questions?.length * 2 || 10,
            status: 'not-started',
          });
        });

        if (course.exam) {
          allAssessments.push({
            id: `exam-${course._id}`,
            type: 'exam',
            title: `${course.courseTitle} – Final Exam`,
            courseId: course._id,
            duration: course.exam.timeLimit || 60,
            status: 'locked',
          });
        }
      }

      setAssessments(allAssessments);
    } catch (error) {
      // Silent fail - assessments will be empty
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentClick = (assessment) => {
    if (assessment.type === 'quiz') {
      navigate(`/quiz/${assessment.courseId}/${assessment.topicId}`);
    } else if (assessment.type === 'exam') {
      navigate(`/exam/${assessment.courseId}`);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'not-started': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
      'in-progress': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      'completed': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      'locked': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${colors[status] || colors['not-started']}`}>
        {status?.replace('-', ' ') || 'not started'}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout activeItem="assessment">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="assessment">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
            My Assessments
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {assessments.length > 0 ? (
              assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  onClick={() => assessment.status !== 'locked' && handleAssessmentClick(assessment)}
                  className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    assessment.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'hover:border-indigo-200 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-2.5 md:p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg shrink-0">
                      {assessment.type === 'exam' ? (
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white break-words pr-2">
                        {assessment.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                        <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          {assessment.duration} min
                        </span>
                        {getStatusBadge(assessment.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end sm:justify-center">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  No assessments available yet.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs mx-auto">
                  Complete course topics to unlock quizzes and exams.
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