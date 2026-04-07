const courseServiceActivities = require("../services/courseService");
const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const Student = require("../models/studentModels");

const courseService = new courseServiceActivities();

const createCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    const role = req.user.role;
    const newCourse = await courseService.createCourse(courseData, role);
    apiResponse(res, 201, newCourse, "Course created successfully");
  } catch (err) {
    next(err);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = req.user.role;
    const course = await courseService.findCourse(id, role);
    apiResponse(res, 200, course, "Course retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const role = req.user.role;
    const courses = await courseService.findAllCourses(role);
    apiResponse(res, 200, courses, "Courses retrieved successfully");
  } catch (err) {
    next(err);
  }
};


const enrollStudent = async (req, res, next) => {
  try {
    const role = req.user.role
    const { id, studentId } = req.params;
    const course = await courseService.enrollStudent(id, studentId, role);
    apiResponse(res, 200, course, "Student enrolled successfully");
  } catch (err) {
    next(err);
  }
};

const addTopic = async (req, res, next) => {
  const { courseId } = req.params;
  const topicData = req.body;
  const role = req.user.role;

  if (role !== "admin" && "student") {
    return apiResponse(
      res,
      403,
      null,
      "You do not have permission to view these topics",
    );
  }

  try {
    const updatedCourse = await courseService.addTopicToCourse(
      courseId,
      topicData,
      role,
    );

    apiResponse(res, 200, updatedCourse, "Topic added successfully to course");
  } catch (err) {
    next(err);
  }
};

const addQuizScore = async (req, res, next) => {
  const { courseId, studentId, topicId } = req.params;
  const quizData = req.body;
  const role = req.user.role;

  try {
    const result = await courseService.addQuizScore(courseId, studentId, topicId, quizData, role);
    apiResponse(res, 200, result, "Quiz score added successfully");
  } catch (err) {
    next(err);
  }
};

const addExamScore = async (req, res, next) => {
  const { courseId, studentId } = req.params;
  const role = req.user.role;
  const examData = req.body
  try {
    const result = await courseService.addExamScore(courseId, studentId, role, examData);
    apiResponse(res, 200, result, "Exam score added successfully")

  } catch (err) {
    next(err)
  }
}

const getAllTopics = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const role = req.user.role;
    const topics = await courseService.findTopic(courseId, role);
    if (!topics) {
      return apiResponse(res, 404, null, "Course not found");
    }
  } catch (err) {
    next(err);
  };
}

const addquizQuestion = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.params;
    const questions= req.body;
    const role = req.user.role;
    const updatedCourse = await courseService.addQuizQuestions(courseId, topicId, questions, role);
    apiResponse(res, 200, updatedCourse, "Quiz question added successfully");
  } catch (err) {
    next(err);
  }
};


const addTestQuestion = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const questionData = req.body;
    const role = req.user.role;
    const updatedCourse = await courseService.addTestQuestions(courseId, questionData, role);
    apiResponse(res, 200, updatedCourse, "Test question added successfully");
  } catch (err) {
    next(err);
  }
};


const getQuizQuestions = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.params;
    const role = req.user.role;
    const quizQuestions = await courseService.getQuizQuestions(courseId, topicId, role);
    if (!quizQuestions) {
      return apiResponse(res, 404, null, "Course not found");
    }
    apiResponse(res, 200, quizQuestions, "Quiz questions retrieved successfully");
  } catch (err) {
    next(err);
  }

};

const getTestQuestions = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const role = req.user.role;
    const testQuestions = await courseService.getTestQuestions(courseId, role);
    if (!testQuestions) {
      return apiResponse(res, 404, null, "Course not found");
    }
    apiResponse(res, 200, testQuestions, "Test questions retrieved successfully");
  } catch (err) {
    next(err);
  }
};


const submitQuizAnswers = async (req, res, next) => {
  try {    const { courseId, topicId } = req.params;
    const { role, _id: studentId } = req.user;
    const {submittedAnswers} = req.body;
    const result = await courseService.submitQuizAnswers(courseId, topicId, role, submittedAnswers, studentId);
    apiResponse(res, 200, result, "Quiz answers submitted successfully");
  } catch (err) {
    next(err);
  }
};


const submitTestAnswers = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const {submittedAnswers} = req.body;
    const {role, _id: studentId } = req.user;
    const result = await courseService.submitTestAnswers(courseId, role, submittedAnswers, studentId);
    apiResponse(res, 200, result, "Test answers submitted successfully");
  } catch (err) {
    next(err);
  }
};

const getTopicContent = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.params;
    const role = req.user.role;
    const content = await courseService.getTopicContent(courseId, topicId, role);
    if (!content) {
      return apiResponse(res, 404, null, "Course or topic not found");
    }
    apiResponse(res, 200, content, "Topic content retrieved successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  getAllTopics,
  enrollStudent,
  addTopic,
  addQuizScore,
  addExamScore,
  addquizQuestion,
  addTestQuestion,
  getQuizQuestions,
  getTestQuestions,
  submitQuizAnswers,
  submitTestAnswers,
  getTopicContent
};
