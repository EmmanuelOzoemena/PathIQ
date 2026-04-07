// src/pages/CourseDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api } from '../services/api';
import { 
  BookOpen, Clock, Users, ChevronLeft, Award, 
  PlayCircle, CheckCircle, Lock, AlertCircle,
  FileText, ChevronRight, Brain, Shield, Cpu,
  BarChart, Lock as LockIcon,
  X, Check, X as XIcon,
  Trophy, AlertTriangle, Maximize2, Minimize2
} from 'lucide-react';

// Local courses for fallback
const localCourses = [
  {
    _id: '1',
    courseTitle: 'CS101: Introduction to Computing',
    courseCode: 'CS101',
    description: 'A foundational module covering the transition from physical hardware to digital logic and safety.',
    topics: [
      {
        id: 1,
        title: 'Foundations of Computing',
        description: 'Hardware components, software categories, and the role of the CPU, memory, and I/O devices.',
        duration: '20 min',
        fullContent: `TOPIC 1: FOUNDATIONS OF COMPUTING (HARDWARE & SOFTWARE)

Hardware Components: The Physical Machine
Hardware refers to the tangible, physical parts of the computer system.

A. Central Processing Unit (CPU)
Often called the "Brain," the CPU executes instructions. It consists of:
1. ALU (Arithmetic Logic Unit): Performs all calculations.
2. CU (Control Unit): The "Traffic Cop." It decodes instructions.
3. Registers: Internal high-speed storage.

B. Input and Output (I/O) Devices
1. Input: Keyboard, Mouse, Scanner, Microphone.
2. Output: Monitors, Printers, Speakers.

C. Storage Hierarchy
1. Primary Storage (Memory): RAM - Volatile, fast.
2. Secondary Storage: SSD, HDD - Non-volatile, slower.

Software Categories:
A. System Software - Operating Systems, Utility Programs, Device Drivers
B. Application Software - Word Processors, Spreadsheets, Web Browsers`,
        quiz: {
          questions: [
            { id: 'q1_1', text: 'Which component is known as the "Brain" of the computer?', options: ['Monitor', 'Keyboard', 'CPU', 'Printer'], correct: 2 },
            { id: 'q1_2', text: 'Which of these is an example of an Output device?', options: ['Scanner', 'Mouse', 'Speaker', 'Joystick'], correct: 2 },
            { id: 'q1_3', text: 'What does RAM stand for?', options: ['Read Access Memory', 'Random Access Memory', 'Real Analysis Media', 'Remote Access Mode'], correct: 1 },
            { id: 'q1_4', text: 'Which software is responsible for managing computer hardware?', options: ['Microsoft Word', 'Operating System', 'Google Chrome', 'Adobe Photoshop'], correct: 1 },
            { id: 'q1_5', text: 'Which of the following is an example of System Software?', options: ['Windows 11', 'Instagram', 'WhatsApp', 'VLC Player'], correct: 0 }
          ]
        }
      },
      {
        id: 2,
        title: 'Binary Logic & Data Representation',
        description: 'Understanding the binary system, bits, bytes, and converting binary to decimal.',
        duration: '25 min',
        fullContent: `TOPIC 2: BINARY LOGIC & DATA REPRESENTATION

2.1 The Binary System (Base 2)
Computers use Binary because they are made of transistors that are either ON (1) or OFF (0).

2.2 Units of Data:
1. Bit: The smallest unit (a single 1 or 0)
2. Byte: 8 bits
3. Kilobyte (KB): 1,024 Bytes
4. Megabyte (MB): 1,024 KB
5. Gigabyte (GB): 1,024 MB
6. Terabyte (TB): 1,024 GB

2.3 Simple Binary to Decimal Conversion
Binary 1011 = 1×8 + 0×4 + 1×2 + 1×1 = 11`,
        quiz: {
          questions: [
            { id: 'q2_1', text: 'What is the smallest unit of data in a computer?', options: ['Byte', 'Bit', 'Nibble', 'Kilobyte'], correct: 1 },
            { id: 'q2_2', text: 'How many bits are in one byte?', options: ['4', '8', '16', '32'], correct: 1 },
            { id: 'q2_3', text: 'What is the binary representation of the decimal number 5?', options: ['100', '111', '101', '011'], correct: 2 },
            { id: 'q2_4', text: 'Convert binary 1011 to decimal.', options: ['9', '11', '13', '15'], correct: 1 },
            { id: 'q2_5', text: 'Which storage unit is the largest?', options: ['KB', 'MB', 'GB', 'Byte'], correct: 2 }
          ]
        }
      },
      {
        id: 3,
        title: 'Basics of Algorithms & Flowcharts',
        description: 'Defining algorithms, using flowchart symbols, and understanding control structures.',
        duration: '25 min',
        fullContent: `TOPIC 3: BASICS OF ALGORITHMS & FLOWCHARTS

3.1 Defining Algorithms
An algorithm is a finite, step-by-step procedure for solving a problem.

3.2 Flowchart Symbols:
• Terminal (Oval): Start/End
• Input/Output (Parallelogram): Input/Output operations
• Process (Rectangle): Calculations
• Decision (Diamond): Yes/No conditions

3.3 Logical Structures:
1. Sequence: Executing steps one after another
2. Selection (If-Then-Else): Making choices
3. Iteration (Loops): Repeating steps`,
        quiz: {
          questions: [
            { id: 'q3_1', text: 'What symbol represents Start/End in a flowchart?', options: ['Rectangle', 'Diamond', 'Oval', 'Parallelogram'], correct: 2 },
            { id: 'q3_2', text: 'What best defines an Algorithm?', options: ['A physical component', 'A step-by-step procedure', 'A type of internet', 'A programming language'], correct: 1 },
            { id: 'q3_3', text: 'Which shape represents a calculation?', options: ['Diamond', 'Rectangle', 'Parallelogram', 'Oval'], correct: 1 },
            { id: 'q3_4', text: 'Which symbol is used for a Decision?', options: ['Rectangle', 'Oval', 'Parallelogram', 'Diamond'], correct: 3 },
            { id: 'q3_5', text: 'Which structure repeats steps?', options: ['Sequence', 'Selection', 'Iteration', 'Encryption'], correct: 2 }
          ]
        }
      },
      {
        id: 4,
        title: 'Internet Safety & Digital Citizenship',
        description: 'Web browsers, HTTPS, malware, phishing, and digital ethics.',
        duration: '20 min',
        fullContent: `TOPIC 4: INTERNET SAFETY & DIGITAL CITIZENSHIP

4.1 Understanding the Web
The Internet is a massive network of networks. The World Wide Web (WWW) is the system of interlinked documents.

4.2 Cybersecurity Basics
A. Malware: Viruses, Worms, Trojan Horses, Ransomware
B. Phishing: Attempts to acquire sensitive information
C. Strong Passwords: Use 12+ characters with mixed case, numbers, symbols

4.3 Digital Ethics
• Think Before You Post
• Respect Intellectual Property
• Protect Your Digital Footprint`,
        quiz: {
          questions: [
            { id: 'q4_1', text: 'What does the "S" stand for in HTTPS?', options: ['Standard', 'Secure', 'System', 'Speed'], correct: 1 },
            { id: 'q4_2', text: 'Which malware disguises itself as legitimate software?', options: ['Worm', 'Virus', 'Trojan Horse', 'Spyware'], correct: 2 },
            { id: 'q4_3', text: 'An email asking to verify bank details is an example of:', options: ['Phishing', 'Firewall', 'Encryption', 'Cloud Computing'], correct: 0 },
            { id: 'q4_4', text: 'What is the most effective way to secure an account?', options: ['Short password', 'MFA', 'Saving password', 'Using birthdate'], correct: 1 },
            { id: 'q4_5', text: 'What is your permanent record of online activities called?', options: ['Digital Shadow', 'Internet History', 'Digital Footprint', 'Cyber Trail'], correct: 2 }
          ]
        }
      }
    ],
    exam: {
      timeLimit: 60,
      questions: []
    }
  }
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicContent, setShowTopicContent] = useState(false);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState(null);
  
  // Anti-cheating states
  const [examStarted, setExamStarted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [warningShown, setWarningShown] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [suspiciousActivities, setSuspiciousActivities] = useState([]);
  const [timerId, setTimerId] = useState(null);
  
  // Track completed topics
  const [completedTopics, setCompletedTopics] = useState([]);

  // Helper function to get student ID from localStorage
  const getStudentId = () => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed._id || parsed.id;
      } catch {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchCompletedTopics();
  }, [courseId]);

  // Anti-cheating effects
  useEffect(() => {
    if (showQuiz || examStarted) {
      const handleContextMenu = (e) => e.preventDefault();
      const handleVisibilityChange = () => {
        if (document.hidden && (showQuiz || examStarted)) {
          handleTabSwitch();
        }
      };
      const handleWindowBlur = () => {
        if (showQuiz || examStarted) handleTabSwitch();
      };
      const handleCopy = (e) => e.preventDefault();
      const handlePaste = (e) => e.preventDefault();
      const handleCut = (e) => e.preventDefault();
      
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleWindowBlur);
      document.addEventListener('copy', handleCopy);
      document.addEventListener('paste', handlePaste);
      document.addEventListener('cut', handleCut);
      
      if (!fullscreenEnabled && window.innerWidth > 768) {
        requestFullscreen();
      }
      
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
        handleTabSwitch();
      };
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        document.removeEventListener('copy', handleCopy);
        document.removeEventListener('paste', handlePaste);
        document.removeEventListener('cut', handleCut);
        window.removeEventListener('popstate', handlePopState);
        if (timerId) clearInterval(timerId);
      };
    }
  }, [showQuiz, examStarted]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.courses.findOneCourse(courseId);
      
      let courseData = null;
      if (response?.data) {
        courseData = response.data;
      } else if (response?.message) {
        courseData = response.message;
      } else {
        courseData = response;
      }
      
      // Check if course has topics - if not, use local fallback
      if (courseData && (!courseData.topics || courseData.topics.length === 0)) {
        const localMatch = localCourses.find(local => 
          local.courseCode === courseData.courseCode || 
          local.courseTitle === courseData.courseTitle
        );
        
        if (localMatch) {
          courseData = {
            ...courseData,
            topics: localMatch.topics,
            exam: localMatch.exam,
            longDescription: localMatch.longDescription || courseData.longDescription,
            hasLocalContent: true
          };
        } else if (courseData.courseCode === 'CS101' || courseData.courseTitle?.includes('COMPUTING')) {
          const cs101Local = localCourses[0];
          if (cs101Local) {
            courseData = {
              ...courseData,
              topics: cs101Local.topics,
              exam: cs101Local.exam,
              longDescription: cs101Local.longDescription,
              hasLocalContent: true
            };
          }
        }
      }
      
      setCourse(courseData);
      
    } catch (err) {
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedTopics = () => {
    const saved = localStorage.getItem(`completed_topics_${courseId}`);
    if (saved) setCompletedTopics(JSON.parse(saved));
  };

  const saveCompletedTopics = (topics) => {
    localStorage.setItem(`completed_topics_${courseId}`, JSON.stringify(topics));
  };

  const handleTabSwitch = () => {
    setTabSwitchCount(prev => {
      const newCount = prev + 1;
      if (newCount === 1 && !warningShown) {
        setWarningShown(true);
        alert('⚠️ Warning: Switching tabs during quiz is not allowed. One more switch will auto-submit with a penalty.');
      }
      if (newCount >= 2) {
        alert('🚫 Quiz auto-submitted due to tab switching.');
        if (showQuiz) handleSubmitQuiz(true);
      }
      return newCount;
    });
  };

  const requestFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        setFullscreenEnabled(true);
      }).catch(() => {});
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const startTimer = (duration) => {
    const id = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(id);
          alert('⏰ Time\'s up! Submitting your quiz.');
          handleSubmitQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerId(id);
    return id;
  };

  const shuffleQuestions = (questions) => [...questions].sort(() => Math.random() - 0.5);
  const shuffleOptions = (questions) => {
    return questions.map(question => {
      const optionsWithIndices = question.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
      const shuffled = optionsWithIndices.sort(() => Math.random() - 0.5);
      return {
        ...question,
        options: shuffled.map(item => item.text),
        originalIndices: shuffled.map(item => item.originalIndex)
      };
    });
  };

  const isTopicUnlocked = (topicIndex) => topicIndex === 0 ? true : completedTopics.includes(topicIndex - 1);
  const isTopicCompleted = (topicIndex) => completedTopics.includes(topicIndex);

  // Fetch quiz questions from API
  const fetchQuizQuestions = async (courseId, topicId) => {
    setQuizLoading(true);
    setQuizError(null);
    try {
      const response = await api.quiz.getQuizQuestions(courseId, topicId);
      
      let questions = [];
      
      if (response?.questions && Array.isArray(response.questions)) {
        questions = response.questions;
      } else if (response?.data?.questions && Array.isArray(response.data.questions)) {
        questions = response.data.questions;
      } else if (Array.isArray(response)) {
        questions = response;
      } else if (response?.message && Array.isArray(response.message)) {
        questions = response.message;
      } else if (response?.quiz && Array.isArray(response.quiz)) {
        questions = response.quiz;
      }
      
      if (!questions || questions.length === 0) {
        return null;
      }
      
      return questions;
    } catch (error) {
      setQuizError('Failed to load quiz questions');
      return null;
    } finally {
      setQuizLoading(false);
    }
  };

  const handleTopicClick = (topic, index) => {
    if (!isTopicUnlocked(index)) {
      alert(`Complete Topic ${index} (${course.topics[index-1].title}) first to unlock this topic!`);
      return;
    }
    
    const content = topic.fullContent || topic.content || topic.longDescription || topic.description || 'No content available.';
    
    setSelectedTopic({ 
      ...topic, 
      index,
      displayContent: content
    });
    setShowTopicContent(true);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizError(null);
  };

  const closeTopicContent = () => {
    setShowTopicContent(false);
    setSelectedTopic(null);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizError(null);
  };

  const handleStartQuiz = async (topic) => {
    setQuizError(null);
    
    const topicId = topic._id || topic.id || topic.topicId || topic.topic_id || topic.ID;
    const currentCourseId = courseId;
    
    let quizQuestions = null;
    
    if (currentCourseId && topicId) {
      quizQuestions = await fetchQuizQuestions(currentCourseId, topicId);
    }
    
    if (!quizQuestions && topic.quiz?.questions) {
      quizQuestions = topic.quiz.questions;
    }
    
    if (!quizQuestions || quizQuestions.length === 0) {
      alert('No quiz questions available for this topic.');
      return;
    }
    
    const formattedQuestions = quizQuestions.map((q, idx) => ({
      id: q.id || q._id || `q${idx}`,
      text: q.text || q.question,
      options: q.options || q.choices,
      correct: q.correct !== undefined ? q.correct : (q.answerIndex !== undefined ? q.answerIndex : null)
    }));
    
    const invalidQuestions = formattedQuestions.filter(q => !q.options || q.options.length === 0);
    if (invalidQuestions.length > 0) {
      alert('Some quiz questions are malformed. Please contact support.');
      return;
    }
    
    const shuffledQuestions = shuffleQuestions(formattedQuestions);
    const shuffledWithOptions = shuffleOptions(shuffledQuestions);
    
    setCurrentQuiz({
      ...topic.quiz,
      questions: shuffledWithOptions,
      topicId: topicId,
      topicName: topic.title,
      courseId: currentCourseId
    });
    
    setShowQuiz(true);
    setExamStarted(true);
    setExamStartTime(Date.now());
    setTabSwitchCount(0);
    setWarningShown(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setSuspiciousActivities([]);
    
    const timeLimit = (quizQuestions.length || 5) * 60;
    setTimeRemaining(timeLimit);
    startTimer(timeLimit);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = async (autoSubmit = false) => {
    if (timerId) clearInterval(timerId);
    setSubmitting(true);
    
    const questions = currentQuiz?.questions || [];
    let correctCount = 0;
    const answers = {};
    
    questions.forEach((question, index) => {
      const questionId = question.id || `q${index}`;
      const selectedAnswer = selectedAnswers[questionId];
      answers[questionId] = selectedAnswer !== undefined ? selectedAnswer : null;
      if (selectedAnswer === question.correct) correctCount++;
    });
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    const penalty = autoSubmit ? 20 : (tabSwitchCount > 0 ? 10 : 0);
    const finalPercentage = Math.max(0, percentage - penalty);
    const passed = finalPercentage >= 70;
    
    setQuizScore({
      correct: autoSubmit ? Math.floor(correctCount * 0.8) : correctCount,
      total: questions.length,
      percentage: finalPercentage,
      originalPercentage: percentage,
      passed: passed,
      autoSubmitted: autoSubmit,
      tabSwitches: tabSwitchCount,
      penalty: penalty
    });
    
    if (currentQuiz?.topicId && currentQuiz?.courseId) {
      try {
        const studentId = getStudentId();
        await api.quiz.submitQuiz(
          currentQuiz.courseId, 
          currentQuiz.topicId, 
          answers, 
          finalPercentage
        );
        
        if (passed && selectedTopic && currentQuiz.courseId) {
          await api.student.updateCourseProgress(currentQuiz.courseId, selectedTopic.index);
        }
      } catch (error) {
        // Silent fail - quiz is already submitted locally
      }
    }
    
    setQuizSubmitted(true);
    setExamStarted(false);
    exitFullscreen();
    setSubmitting(false);
    
    if (passed && selectedTopic) {
      const newCompletedTopics = [...completedTopics, selectedTopic.index];
      setCompletedTopics(newCompletedTopics);
      saveCompletedTopics(newCompletedTopics);
    }
  };

  const closeQuiz = () => {
    if (timerId) clearInterval(timerId);
    setShowQuiz(false);
    setExamStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizError(null);
    exitFullscreen();
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuiz?.questions || currentQuestionIndex >= currentQuiz.questions.length) return false;
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const questionId = currentQuestion.id || `q${currentQuestionIndex}`;
    return selectedAnswers[questionId] !== undefined;
  };

  const areAllQuestionsAnswered = () => {
    if (!currentQuiz?.questions) return false;
    return currentQuiz.questions.every((question, index) => {
      const questionId = question.id || `q${index}`;
      return selectedAnswers[questionId] !== undefined;
    });
  };

  const getTopicIcon = (title, isCompleted, isLocked) => {
    if (isCompleted) return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
    if (isLocked) return <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
    if (title?.includes('Foundations')) return <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />;
    if (title?.includes('Binary')) return <Brain className="w-4 h-4 sm:w-5 sm:h-5" />;
    if (title?.includes('Algorithms')) return <BarChart className="w-4 h-4 sm:w-5 sm:h-5" />;
    if (title?.includes('Internet')) return <Shield className="w-4 h-4 sm:w-5 sm:h-5" />;
    return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
  };

  const Timer = ({ time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const getTimerColor = () => {
      if (time < 60) return 'bg-red-100 text-red-600 animate-pulse';
      if (time < 180) return 'bg-orange-100 text-orange-600';
      return 'bg-gray-100 text-gray-700';
    };
    return (
      <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm ${getTimerColor()}`}>
        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="font-mono font-bold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    );
  };

  const calculateProgress = () => {
    if (!course?.topics) return 0;
    return Math.round((completedTopics.length / course.topics.length) * 100);
  };

  if (loading) {
    return (
      <Layout activeItem="courses">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout activeItem="courses">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {error || 'Course not found'}
            </h2>
            <button
              onClick={() => navigate('/courses')}
              className="mt-4 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const overallProgress = calculateProgress();

  return (
    <Layout activeItem="courses">
      <div className={`px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 ${showQuiz || examStarted ? 'no-select' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 md:mb-6 transition-colors text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back to Courses
          </button>

          {/* Course Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-xl p-5 md:p-6 mb-5 md:mb-6 text-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl md:text-4xl">{course.icon || '💻'}</span>
                  <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold break-words">
                      {course.courseTitle || course.title}
                    </h1>
                    <p className="text-blue-100 text-xs md:text-sm mt-1">{course.courseCode}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-blue-100">
                  <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>{course.enrolledStudent?.length || 0} students</span></div>
                  <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>{course.topics?.length || 0} topics</span></div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>{course.duration || '4 weeks'}</span></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 md:p-4 backdrop-blur-sm min-w-[110px]">
                <div className="text-xs md:text-sm text-blue-100 mb-1">Overall Progress</div>
                <div className="text-xl md:text-2xl font-bold">{overallProgress}%</div>
                <div className="w-full h-1.5 md:h-2 bg-white/20 rounded-full mt-2">
                  <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${overallProgress}%` }} />
                </div>
                <div className="text-[10px] md:text-xs text-blue-100 mt-1 md:mt-2">{completedTopics.length} of {course.topics?.length} topics</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-5 md:mb-6 overflow-x-auto">
            <nav className="flex gap-4 md:gap-6 min-w-max pb-1">
              {['overview', 'content', 'assessments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 md:pb-4 px-1 border-b-2 font-medium text-sm md:text-base transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            {activeTab === 'overview' && (
              <div className="prose prose-sm md:prose dark:prose-invert max-w-none">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  About This Course
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {course.longDescription || course.description || 'No description available.'}
                </p>
                {course.section1 && (
                  <div className="mt-4 md:mt-6">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 whitespace-pre-line">{course.section1}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content' && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Course Topics
                </h2>
                
                {course.topics && course.topics.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {course.topics.map((topic, index) => {
                      const unlocked = isTopicUnlocked(index);
                      const completed = isTopicCompleted(index);
                      
                      return (
                        <div
                          key={topic.id || index}
                          onClick={() => unlocked && handleTopicClick(topic, index)}
                          className={`border rounded-lg p-3 md:p-4 transition-all cursor-pointer ${
                            unlocked ? 'hover:shadow-md hover:border-blue-300 active:bg-gray-50 dark:active:bg-gray-700' : 'cursor-not-allowed opacity-60'
                          } ${completed ? 'border-green-300 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'}`}
                        >
                          <div className="flex flex-row items-start gap-3">
                            <div className={`p-2 rounded-lg shrink-0 ${completed ? 'bg-green-100 text-green-600' : unlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                              {getTopicIcon(topic.title, completed, !unlocked)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className={`font-medium text-sm md:text-base break-words ${completed ? 'text-green-700' : unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                                  {index + 1}. {topic.title}
                                </h3>
                                {completed && <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full shrink-0">Completed</span>}
                                {!unlocked && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full flex items-center gap-1 shrink-0"><Lock className="w-3 h-3" />Locked</span>}
                              </div>
                              <p className={`text-xs md:text-sm mt-1 ${unlocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400'}`}>{topic.description}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.duration || '20 min'}</p>
                            </div>
                            {topic.quiz && unlocked && !completed && (
                              <span className="px-2 md:px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full shrink-0 self-center">Quiz</span>
                            )}
                          </div>
                          {index < course.topics.length - 1 && (
                            <div className="mt-3 ml-10 md:ml-12">
                              <div className="flex items-center gap-2">
                                <div className={`h-1 w-6 md:w-8 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                <span className="text-[10px] md:text-xs text-gray-400">
                                  {completed ? 'Next topic unlocked' : 'Complete this topic to unlock next'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Topics Available</h3>
                    <p className="text-gray-500 dark:text-gray-400">This course doesn't have any topics yet. Check back later!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'assessments' && course.exam && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Assessments
                </h2>
                <div className={`rounded-xl p-4 md:p-6 border ${completedTopics.length === course.topics?.length ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'}`}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className={`p-3 rounded-lg shrink-0 ${completedTopics.length === course.topics?.length ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <Award className={`w-6 h-6 md:w-8 md:h-8 ${completedTopics.length === course.topics?.length ? 'text-green-600' : 'text-purple-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">Final Examination</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{completedTopics.length === course.topics?.length ? 'You can now take the final exam!' : `Complete all ${course.topics?.length} topics to unlock`}</p>
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>{course.exam.questions?.length || 25} Questions</span></div>
                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>{course.exam.timeLimit || 60} Minutes</span></div>
                        <div className="flex items-center gap-1"><Award className="w-3.5 h-3.5 md:w-4 md:h-4" /><span>70% Passing</span></div>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-lg ${completedTopics.length === course.topics?.length ? 'bg-green-100' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {completedTopics.length === course.topics?.length ? (
                          <>
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                            <div className="flex-1"><p className="text-sm font-medium text-green-700 dark:text-green-400">Exam Unlocked!</p></div>
                            <button onClick={() => navigate(`/exam/${course._id}`)} className="px-3 md:px-4 py-1.5 md:py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 whitespace-nowrap">Start Exam</button>
                          </>
                        ) : (
                          <>
                            <LockIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500 shrink-0" />
                            <div className="flex-1"><p className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Locked</p></div>
                            <div className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full whitespace-nowrap">{completedTopics.length}/{course.topics?.length}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Topic Content Modal - Responsive */}
      {showTopicContent && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-3 sm:p-4 flex items-center justify-between z-10">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold flex items-center gap-2 pr-2">
                {getTopicIcon(selectedTopic.title, isTopicCompleted(selectedTopic.index), false)}
                <span className="break-words">{selectedTopic.title}</span>
              </h2>
              <button onClick={closeTopicContent} className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shrink-0">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              {selectedTopic.description && selectedTopic.description !== selectedTopic.displayContent && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">📌 Overview</h3>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">{selectedTopic.description}</p>
                </div>
              )}
              
              <div className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert">
                <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
                  {selectedTopic.displayContent || selectedTopic.fullContent || selectedTopic.content || selectedTopic.description || 'No content available for this topic.'}
                </div>
              </div>
              
              {selectedTopic.quiz && !isTopicCompleted(selectedTopic.index) && (
                <div className="mt-6 sm:mt-8 border-t pt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    📝 Topic Quiz
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
                    {quizError && (
                      <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs sm:text-sm">
                        ⚠️ {quizError}
                      </div>
                    )}
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                        ⚠️ Anti-cheating active. Do not switch tabs or leave this page.
                      </p>
                    </div>
                    <button 
                      onClick={() => handleStartQuiz(selectedTopic)} 
                      disabled={quizLoading}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {quizLoading ? 'Loading Quiz...' : `🚀 Start Quiz (${selectedTopic.quiz.questions?.length || '?'} questions)`}
                    </button>
                  </div>
                </div>
              )}
              
              {isTopicCompleted(selectedTopic.index) && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 dark:text-green-400 font-medium">✅ Topic Completed!</p>
                  <p className="text-green-600 dark:text-green-500 text-xs sm:text-sm">You've successfully completed this topic.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal - Responsive */}
      {showQuiz && currentQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-3 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h2 className="text-sm sm:text-base md:text-xl font-semibold flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                  <span className="break-words">Quiz: {selectedTopic?.title}</span>
                </h2>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {timeRemaining !== null && <Timer time={timeRemaining} />}
                  <button onClick={closeQuiz} className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-[10px] sm:text-xs p-1.5 sm:p-2 rounded-lg ${tabSwitchCount === 0 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'}`}>
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span className="break-words">{tabSwitchCount === 0 ? '🔒 Anti-cheating active - do not switch tabs' : `⚠️ Tab switching detected (${tabSwitchCount} time(s))`}</span>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              {!quizSubmitted ? (
                <>
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions?.length}</span>
                      <span>{Math.round(((currentQuestionIndex + 1) / currentQuiz.questions?.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions?.length) * 100}%` }} />
                    </div>
                  </div>
                  
                  {currentQuiz.questions && currentQuiz.questions[currentQuestionIndex] && (
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 break-words">
                        {currentQuiz.questions[currentQuestionIndex].text}
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {currentQuiz.questions[currentQuestionIndex].options.map((option, optIndex) => {
                          const questionId = currentQuiz.questions[currentQuestionIndex].id || `q${currentQuestionIndex}`;
                          const isSelected = selectedAnswers[questionId] === optIndex;
                          return (
                            <button
                              key={`${questionId}-${optIndex}`}
                              type="button"
                              onClick={() => handleAnswerSelect(questionId, optIndex)}
                              className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                                isSelected 
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                              }`}
                            >
                              <span className="flex items-center gap-2 sm:gap-3">
                                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm shrink-0 ${
                                  isSelected 
                                    ? 'border-blue-600 bg-blue-600 text-white' 
                                    : 'border-gray-400 dark:border-gray-500'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words">{option}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between gap-3 sm:gap-4">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm ${
                        currentQuestionIndex === 0 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      Previous
                    </button>
                    {currentQuestionIndex === currentQuiz.questions?.length - 1 ? (
                      <button
                        onClick={() => handleSubmitQuiz(false)}
                        disabled={!areAllQuestionsAnswered() || submitting}
                        className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm ${
                          !areAllQuestionsAnswered() || submitting 
                            ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {submitting ? 'Submitting...' : 'Submit Quiz'}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        disabled={!isCurrentQuestionAnswered()}
                        className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm ${
                          !isCurrentQuestionAnswered() 
                            ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className={`w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
                    quizScore?.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {quizScore?.passed 
                      ? <Check className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
                      : <XIcon className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 dark:text-red-400" />
                    }
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${quizScore?.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {quizScore?.passed ? 'Quiz Passed! 🎉' : 'Quiz Failed'}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    You scored {quizScore?.correct} out of {quizScore?.total} ({quizScore?.percentage}%)
                  </p>
                  {quizScore?.penalty > 0 && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 mb-3">
                      ⚠️ Penalty applied: -{quizScore.penalty}% for {quizScore.autoSubmitted ? 'auto-submission' : 'tab switching'}
                    </p>
                  )}
                  {quizScore?.passed ? (
                    <button
                      onClick={() => { closeQuiz(); closeTopicContent(); }}
                      className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base hover:bg-green-700"
                    >
                      Continue to Next Topic
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                        setExamStarted(true);
                        setTabSwitchCount(0);
                        setWarningShown(false);
                        handleStartQuiz(selectedTopic);
                      }}
                      className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-700"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-select { 
          user-select: none; 
          -webkit-user-select: none; 
          -moz-user-select: none; 
          -ms-user-select: none; 
        }
        @media (max-width: 640px) {
          .no-select { 
            user-select: text; 
            -webkit-user-select: text; 
          }
        }
      `}</style>
    </Layout>
  );
};

export default CourseDetails;