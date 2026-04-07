const express = require("express");
const authstudentRoute = express.Router();
const passport = require("passport");
const studentController = require("../controllers/studentController");
const progressController = require("../controllers/progressController");
const validateData = require("../middleware/Zod/zodValidation");
const authValidation = require("../middleware/Zod/validationSchema");
const isAuth = require("../middleware/auth");
const upload = require("../config/multer");
const resultController = require('../controllers/resultController');
const courseController = require("../controllers/courseController");




authstudentRoute.post(
  "/signup",
  validateData(authValidation.signupSchema),
  studentController.signup,
);
authstudentRoute.post(
  "/login",
  validateData(authValidation.loginSchema),
  studentController.loginstudent,
);
authstudentRoute.get("/all", studentController.fetchAllStudents)
authstudentRoute.post(
  "/verify-account",
  validateData(authValidation.verifyAccountSchema),
  studentController.verifyAccount,
);
authstudentRoute.post(
  "/resend-otp",
  validateData(authValidation.resendOtpSchema),
  studentController.resendOtp,
);
authstudentRoute.post("/refresh-token", isAuth, studentController.refreshToken);
authstudentRoute.post(
  "/upload-profile-picture",
  isAuth,
  upload.single("profilePicture"),
  studentController.profilePictureUpload,
);
authstudentRoute.post(
  "/forgot-password",
  validateData(authValidation.forgotPasswordSchema),
  studentController.forgotPassword,
);
authstudentRoute.post(
  "/reset-password",
  validateData(authValidation.resetPasswordSchema),
  studentController.resetPassword,
);
authstudentRoute.patch(
  "/update-profile",
  isAuth,
  validateData(authValidation.updateProfileSchema),
  studentController.updateProfile,
);
authstudentRoute.delete(
  "/delete-profile",
  isAuth,
  studentController.deleteProfile,
);
authstudentRoute.post("/logout", isAuth, studentController.logoutstudent);
authstudentRoute.get("/:id/find-course", isAuth, courseController.getCourse);
authstudentRoute.get("/find-all-courses", isAuth, courseController.getAllCourses);
authstudentRoute.post('/:courseId/enroll-courses', isAuth, studentController.enrollNewCourse);
authstudentRoute.post('/:courseId/start-course', isAuth, progressController.startCourse);
authstudentRoute.patch('/:courseId/course-progress', isAuth, progressController.updateTopicProgress);

// POST request to submit the final exam
// authstudentRoute.post('/submit-exam', isAuth, resultController.submitFinalExam);

authstudentRoute.post("/:courseId/app-open", isAuth, studentController.updateStreak);

authstudentRoute.get("/:courseId/my-progress", isAuth, studentController.getMyProgress);


module.exports = authstudentRoute;
