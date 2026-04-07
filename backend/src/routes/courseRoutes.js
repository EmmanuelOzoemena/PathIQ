
const express = require("express");
const courseRoute = express.Router();
const courseController = require("../controllers/courseController");
const validateData = require("../middleware/Zod/zodValidation");
const authValidation = require("../middleware/Zod/validationSchema");
const isAuth = require("../middleware/auth")
const resultController = require("../controllers/resultController");
const csvController = require("../controllers/uploadcourse");


courseRoute.post("/create-course", isAuth, validateData(authValidation.createCourseSchema), courseController.createCourse);
courseRoute.get("/:id/find-course", isAuth, courseController.getCourse);
courseRoute.get("/find-all-courses", isAuth, courseController.getAllCourses);
courseRoute.post("/:id/:studentId/enroll", isAuth, courseController.enrollStudent);
courseRoute.post("/:courseId/add-topic", isAuth, validateData(authValidation.addTopicSchema), courseController.addTopic);
courseRoute.post("/:courseId/:studentId/:topicId/add-quiz-score", isAuth, validateData(authValidation.quizScoreSchema), courseController.addQuizScore);
// courseRoute.post("/:courseId/:studentId/add-exam-score", isAuth, validateData(authValidation.examSchema), courseController.addExamScore);
courseRoute.post("/:studentId/:courseId/add-exam-score", isAuth, validateData(authValidation.examSchema), courseController.addExamScore);
courseRoute.post("/:courseId/:studentId/final-grade", isAuth, resultController.finalGrades);

courseRoute.get("/:courseId/get-all-topics", isAuth, courseController.getAllTopics);

courseRoute.post("/:courseId/:topicId/add-quiz-question", isAuth, courseController.addquizQuestion);
courseRoute.post("/:courseId/add-test-question", isAuth, courseController.addTestQuestion);
courseRoute.get("/:courseId/:topicId/quiz", isAuth, courseController.getQuizQuestions);
courseRoute.get("/:courseId/test", isAuth, courseController.getTestQuestions);
courseRoute.post("/quiz/:courseId/:topicId/submit", isAuth, courseController.submitQuizAnswers);
courseRoute.post("/test/:courseId/submit", isAuth, courseController.submitTestAnswers);
courseRoute.get("/:courseId/:topicId/content", isAuth, courseController.getTopicContent);


// Direct endpoint to trigger the ingestion
courseRoute.post('/import-bulk', csvController.uploadBulkCourses);






module.exports = courseRoute;