// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api } from '../services/api';
import { ChevronLeft, ChevronRight, AlertCircle, Check, X as XIcon } from 'lucide-react';

const QuizPage = () => {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [usingBackend, setUsingBackend] = useState(false);

  // Helper function to convert letter (A, B, C, D) to index (0, 1, 2, 3)
  const letterToIndex = (letter) => {
    if (!letter) return null;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters.indexOf(letter.toUpperCase());
  };

  // Helper function to clean option text (remove 'A) ' prefix)
  const cleanOptionText = (option) => {
    if (!option) return '';
    return option.replace(/^[A-Z][\)\.\-\s]+/, '').trim();
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError('');
      setStartTime(Date.now());
      
      try {
        const response = await api.quiz.getQuizQuestions(courseId, topicId);
        
        let quizQuestions = null;
        
        if (response?.message?.questions && Array.isArray(response.message.questions)) {
          quizQuestions = response.message.questions;
        } else if (response?.data?.questions && Array.isArray(response.data.questions)) {
          quizQuestions = response.data.questions;
        } else if (response?.questions && Array.isArray(response.questions)) {
          quizQuestions = response.questions;
        }
        
        if (quizQuestions && quizQuestions.length > 0) {
          const formattedQuestions = quizQuestions.map((q) => ({
            id: q._id || q.id,
            text: q.questionText || q.text || q.question || 'Question text missing',
            options: q.options ? q.options.map(opt => cleanOptionText(opt)) : [],
            correct: letterToIndex(q.correctOption),
            explanation: q.explanation || ''
          }));
          
          const validQuestions = formattedQuestions.filter(q => q.options && q.options.length > 0);
          if (validQuestions.length === 0) {
            setError('Quiz questions are malformed. No options available.');
          } else {
            setQuestions(validQuestions);
            setAnswers(new Array(validQuestions.length).fill(null));
            setUsingBackend(true);
          }
        } else {
          await loadLocalQuiz();
        }
      } catch (err) {
        await loadLocalQuiz();
      } finally {
        setLoading(false);
      }
    };
    
    const loadLocalQuiz = async () => {
      try {
        const courseRes = await api.courses.findOneCourse(courseId);
        const courseData = courseRes?.data || courseRes?.message || courseRes;
        setCourse(courseData);
        
        const topicData = courseData.topics?.find(t => 
          t.id === parseInt(topicId) || 
          t.id === topicId || 
          t._id === topicId ||
          String(t.id) === String(topicId)
        );
        
        if (topicData && topicData.quiz && topicData.quiz.questions) {
          setTopic(topicData);
          setQuestions(topicData.quiz.questions);
          setAnswers(new Array(topicData.quiz.questions.length).fill(null));
          setUsingBackend(false);
        } else {
          setError('No quiz questions found for this topic.');
        }
      } catch (fallbackErr) {
        setError('Failed to load quiz. Please try again.');
      }
    };
    
    fetchQuiz();
  }, [courseId, topicId]);

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

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    // Calculate score locally
    let correctCount = 0;
    const userAnswers = [];
    
    questions.forEach((question, idx) => {
      const selectedAnswer = answers[idx];
      const isCorrect = selectedAnswer === question.correct;
      if (isCorrect) correctCount++;
      
      userAnswers.push({
        questionId: question.id,
        questionText: question.text,
        selectedOption: selectedAnswer,
        selectedOptionText: selectedAnswer !== null ? question.options[selectedAnswer] : null,
        isCorrect: isCorrect,
        correctAnswer: question.correct,
        correctAnswerText: question.options[question.correct]
      });
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;
    
    // Prepare answers in the format backend expects: { questionId: "A", questionId2: "B" }
    const answersForBackend = {};
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    questions.forEach((question, idx) => {
      const selectedIndex = answers[idx];
      if (selectedIndex !== null) {
        const questionId = question.id;
        const selectedLetter = letters[selectedIndex];
        answersForBackend[questionId] = selectedLetter;
      }
    });
    
    try {
      if (usingBackend) {
        await api.quiz.submitQuiz(courseId, topicId, answersForBackend, score);
      }
      
      setResult({ 
        score, 
        passed, 
        correctCount, 
        total: questions.length,
        answers: userAnswers,
        usingBackend: usingBackend
      });
      setSubmitted(true);
      
      // Save to localStorage for progress tracking
      const progressData = {
        completed: true,
        score: score,
        passed: passed,
        completedAt: new Date().toISOString(),
        answers: answers
      };
      localStorage.setItem(`quiz_progress_${courseId}_${topicId}`, JSON.stringify(progressData));
      
      // Also update course progress in localStorage
      if (passed) {
        const completedTopics = localStorage.getItem(`completed_topics_${courseId}`);
        const topicIndex = parseInt(topicId) - 1;
        if (completedTopics) {
          const topics = JSON.parse(completedTopics);
          if (!topics.includes(topicIndex)) {
            topics.push(topicIndex);
            localStorage.setItem(`completed_topics_${courseId}`, JSON.stringify(topics));
          }
        } else {
          localStorage.setItem(`completed_topics_${courseId}`, JSON.stringify([topicIndex]));
        }
      }
      
    } catch (err) {
      // Still show the result locally even if backend fails
      setResult({ 
        score, 
        passed, 
        correctCount, 
        total: questions.length,
        answers: userAnswers,
        usingBackend: false,
        backendError: true
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
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
              <h2 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Error Loading Quiz</h2>
              <p className="text-sm sm:text-base text-red-600 dark:text-red-400 mb-4">{error}</p>
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
                {result.passed ? 'Quiz Passed! 🎉' : 'Quiz Failed'}
              </h2>
              <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">{result.score}%</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                You got {result.correctCount} out of {result.total} questions correct
              </p>
              
              {result.usingBackend && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  ✓ Score validated by server
                </p>
              )}
              {result.backendError && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                  ⚠️ Server unavailable - using local scoring
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
                >
                  Back to Course
                </button>
                {!result.passed && (
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentIndex(0);
                      setAnswers(new Array(questions.length).fill(null));
                      setResult(null);
                      setStartTime(Date.now());
                    }}
                    className="px-5 sm:px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!questions.length) {
    return (
      <Layout activeItem="assessment">
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">No Questions Available</h2>
              <p className="text-sm sm:text-base text-yellow-600 dark:text-yellow-400 mb-4">No quiz questions found for this topic.</p>
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
          <button 
            onClick={() => navigate(`/courses/${courseId}`)} 
            className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-indigo-600 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Course
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {topic?.title || 'Quiz'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Answer all questions to complete the quiz
                </p>
              </div>
              {usingBackend ? (
                <span className="text-[10px] sm:text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full w-fit">
                  🌐 Live Server
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-fit">
                  📚 Local Data
                </span>
              )}
            </div>

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
              {currentQuestion.options && currentQuestion.options.map((option, idx) => (
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
                    {String.fromCharCode(65 + idx)}) {option}
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
                  onClick={handleSubmit}
                  disabled={answers.includes(null) || submitting}
                  className="w-full sm:w-auto flex items-center justify-center px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 text-sm sm:text-base order-3"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
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

export default QuizPage;