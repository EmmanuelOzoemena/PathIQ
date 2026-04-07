import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const QuizModal = ({ topic, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const questions = topic.quiz?.questions || [];
  const totalQuestions = questions.length;

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    const passed = finalScore >= 70; // passing threshold
    setScore(finalScore);
    setSubmitted(true);
    onComplete(passed, finalScore);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
          <h3 className="text-2xl font-bold text-center mb-4">Quiz Result</h3>
          <p className="text-5xl font-bold text-indigo-600 text-center mb-2">{score}%</p>
          <p className={score >= 70 ? 'text-green-600 text-center' : 'text-red-600 text-center'}>
            {score >= 70 ? '✅ Passed!' : '❌ Failed'}
          </p>
          <button onClick={onClose} className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  }

  if (totalQuestions === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
          <p className="text-center">No quiz questions available for this topic.</p>
          <button onClick={onClose} className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{topic.title} Quiz</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>

        {/* Question */}
        <div className="p-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            {currentQuestion.text}
          </p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
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
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="text-sm text-gray-500">
            {answers.filter(a => a !== undefined).length} answered
          </div>
          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answers.length < totalQuestions || answers.includes(undefined)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={goToNext}
              disabled={answers[currentIndex] === undefined}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;