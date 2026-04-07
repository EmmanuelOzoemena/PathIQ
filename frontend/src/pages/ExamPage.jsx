// src/pages/ExamPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api } from '../services/api';
import { ChevronLeft, ChevronRight, AlertCircle, Check, X as XIcon, Clock } from 'lucide-react';

const ExamPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    fetchExam();
  }, [courseId]);

  useEffect(() => {
    if (examStarted && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerId(timer);
      
      return () => clearInterval(timer);
    }
  }, [examStarted]);

  const fetchExam = async () => {
    setLoading(true);
    setError('');
    try {
      // First try to get from backend
      const backendExam = await api.exam.getExamQuestions?.(courseId);
      
      if (backendExam && backendExam.questions) {
        setExam(backendExam);
        setQuestions(backendExam.questions);
        setAnswers(new Array(backendExam.questions.length).fill(null));
        setTimeRemaining(backendExam.timeLimit || 60);
      } else {
        // Fallback to local course data
        const courseRes = await api.courses.findOneCourse(courseId);
        const courseData = courseRes?.data || courseRes?.message || courseRes;
        setCourse(courseData);
        if (courseData && courseData.exam && courseData.exam.questions) {
          setExam(courseData.exam);
          setQuestions(courseData.exam.questions);
          setAnswers(new Array(courseData.exam.questions.length).fill(null));
          setTimeRemaining(courseData.exam.timeLimit || 60);
        } else {
          setError('No exam questions found for this course.');
        }
      }
    } catch (err) {
      setError('Failed to load exam. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (timerId) {
      clearInterval(timerId);
    }
    
    setSubmitting(true);
    setError('');
    
    // Calculate score
    const correctCount = questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correct ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;
    
    // Prepare answers for backend
    const formattedAnswers = questions.map((question, index) => ({
      questionId: question.id || `q${index}`,
      selectedAnswer: answers[index],
      correctAnswer: question.correct,
      isCorrect: answers[index] === question.correct
    }));
    
    try {
      // Submit exam to backend
      await api.exam.submitExam(courseId, formattedAnswers);
      
      // Also add exam score
      const studentId = localStorage.getItem('user_data') ? 
        JSON.parse(localStorage.getItem('user_data'))._id : null;
      
      if (studentId) {
        await api.exam.addExamScore(studentId, {
          courseId,
          score,
          passed,
          answers: formattedAnswers
        });
      }
      
      // Get final grade
      const gradeResponse = await api.grades.getFinalGrade(courseId, studentId);
      
      setResult({ 
        score, 
        passed, 
        correctCount, 
        total: questions.length,
        grade: gradeResponse?.grade,
        autoSubmitted
      });
      setSubmitted(true);
    } catch (err) {
      // Fallback to local result
      setResult({ score, passed, correctCount, total: questions.length, autoSubmitted });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      setExamStarted(false);
    }
  };

  const Timer = ({ time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return (
      <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${
        time < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'
      }`}>
        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="font-mono font-bold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
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

  if (error && !questions.length) {
    return (
      <Layout activeItem="assessment">
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Error Loading Exam</h2>
              <p className="text-sm sm:text-base text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => navigate('/assessment')}
                className="px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!examStarted && !submitted) {
    return (
      <Layout activeItem="assessment">
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => navigate('/assessment')} 
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-indigo-600 mb-4 sm:mb-6 text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Assessments
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Final Examination
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 sm:mb-6">
                This is the final exam for {course?.courseTitle || 'this course'}. Please read the instructions carefully.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Exam Details:</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <li>• {questions.length} questions total</li>
                  <li>• {exam?.timeLimit || 60} minutes time limit</li>
                  <li>• Passing score: 70%</li>
                  <li>• Do not refresh the page or close the tab during the exam</li>
                  <li>• Switching tabs will be detected and may result in auto-submission</li>
                </ul>
              </div>
              
              <button
                onClick={handleStartExam}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (submitted && result) {
    return (
      <Layout activeItem="assessment">
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
                result.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {result.passed ? (
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
                ) : (
                  <XIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 dark:text-red-400" />
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {result.passed ? 'Exam Passed! 🎉' : 'Exam Failed'}
              </h2>
              <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">{result.score}%</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                You got {result.correctCount} out of {result.total} questions correct
              </p>
              {result.grade && (
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Final Grade: {result.grade}
                </p>
              )}
              {result.autoSubmitted && (
                <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 mb-4">
                  ⚠️ Auto-submitted due to time expiration or tab switching.
                </p>
              )}
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
              >
                Back to Course
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Layout activeItem="assessment">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
            <button 
              onClick={() => navigate('/assessment')} 
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-indigo-600 text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back
            </button>
            <Timer time={timeRemaining} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6">
            <div className="mb-5 sm:mb-6">
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-indigo-600 h-1.5 sm:h-2 rounded-full transition-all"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-5 sm:mb-6 break-words">
              {currentQuestion.text}
            </p>

            <div className="space-y-2 sm:space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-start p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentIndex] === idx
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={idx}
                    checked={answers[currentIndex] === idx}
                    onChange={() => handleAnswer(idx)}
                    className="w-4 h-4 mt-0.5 text-indigo-600 shrink-0"
                  />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">
                    {option}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 sm:mt-8">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 text-gray-600 disabled:opacity-50 text-sm sm:text-base order-2 sm:order-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="text-xs sm:text-sm text-gray-500 order-1 sm:order-2">
                {answers.filter(a => a !== null).length} of {questions.length} answered
              </div>
              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={answers.includes(null) || submitting}
                  className="w-full sm:w-auto flex items-center justify-center px-5 sm:px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 text-sm sm:text-base order-3"
                >
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </button>
              ) : (
                <button
                  onClick={goToNext}
                  disabled={answers[currentIndex] === null}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 text-sm sm:text-base order-3"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamPage;