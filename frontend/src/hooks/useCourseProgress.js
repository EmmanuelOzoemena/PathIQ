import { useState, useEffect } from 'react';

export const useCourseProgress = (courseId) => {
  const storageKey = `progress_${courseId}`;

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {
      completedTopics: [],      // array of topic ids
      quizScores: {},           // topicId -> score
      examAttempts: [],
      examPassed: false
    };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  const completeTopic = (topicId, score) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: [...prev.completedTopics, topicId],
      quizScores: { ...prev.quizScores, [topicId]: score }
    }));
  };

  const recordExamAttempt = (score, passed) => {
    setProgress(prev => ({
      ...prev,
      examAttempts: [...prev.examAttempts, { score, passed, date: new Date().toISOString() }],
      examPassed: passed || prev.examPassed
    }));
  };

  const canTakeExam = progress.completedTopics.length === 4; // adjust based on your course's topic count

  return { progress, completeTopic, recordExamAttempt, canTakeExam };
};