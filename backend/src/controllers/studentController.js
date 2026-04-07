const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const Student = require("../models/studentModels");
const bcrypt = require("bcryptjs");
const studentServiceActivities = require("../services/studentService");
const progressService = require("../services/progressService")
const cloudinary = require("../config/cloudinary");
const gamificationService = require("../services/gamificationService");
const checkInService = require("../services/checkInService");

const newProgressService =  new progressService()
const studentService = new studentServiceActivities();

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const student = await studentService.createStudent({
      name,
      email,
      password,
    });

    apiResponse(res, 201, student, "Student registered successfully");
  } catch (err) {
    next(err);
  }
};

const fetchAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();

    return apiResponse(res, 200, students, "All students retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const loginstudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const student = await studentService.login(email, password);

    apiResponse(res, 200, student, "Login successful");
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    await studentService.verifyAccount(email, otp);

    apiResponse(res, 200, null, "Account verified successfully");
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await studentService.resendOtp(email);
    apiResponse(res, 200, result, "A new OTP has been sent to your email");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const studentId = req.user.id; // From decoded refresh token
    const newRefreshToken =
      await studentService.generateRefreshToken(studentId);
    apiResponse(res, 200, { token: newRefreshToken }, "Token refreshed");
  } catch (error) {
    next(error);
  }
};

const profilePictureUpload = async (req, res, next) => {
  console.log("File:", req.file);
  try {
    const studentId = req.user.id;
    const file = req.file;

    const student = await studentService.uploadProfilePicture(studentId, file);

    apiResponse(res, 200, student, "Profile picture uploaded successfully");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = await studentService.forgotPassword(req.body.email);
    apiResponse(res, 200, otp, "Reset OTP sent to email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await studentService.resetPassword(email, otp, newPassword);
    apiResponse(res, 200, null, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const student = await studentService.updateStudentDetails(
      req.user.id,
      req.body,
    );
    apiResponse(res, 200, student, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const result = await studentService.softDeleteStudent(req.user.id);
    apiResponse(res, 200, null, result.message);
  } catch (error) {
    next(error);
  }
};

const logoutstudent = async (req, res, next) => {
  try {
    await studentService.logout(req.student.id);
    apiResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};

const enrollNewCourse = async (req, res, next) => {
  try {
    const role = req.user.role;
    const studentId = req.user.id;
    const { courseId } = req.params;
    const enrollment = await studentService.enrollCourse(studentId, courseId, role);
    apiResponse(res, 200, enrollment, "Enrolled in course successfully");
  } catch (error) {
    next(error);
  };
}


const updateStreak = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    const { courseId } = req.params;

    const updatedStudent = await checkInService.handleDailyCheckIn(
      studentId,
      courseId,
    );

    return apiResponse(
      res,
      200,
      {
        streak: updatedStudent.streak,
        message: courseId
          ? "Streak persisted to test record"
          : "Daily check-in successful",
      },
      "Operation successful",
    );
  } catch (err) {
    next(err);
  }
};

const getMyProgress = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params

    const progressData = await newProgressService.checkStudentProgress(studentId, courseId);

    return apiResponse(res, 200, progressData, "Progress retrived successfully")
  } catch (err) {
    next(err)
  }
}

module.exports = {
  signup,
  loginstudent,
  fetchAllStudents,
  verifyAccount,
  resendOtp,
  refreshToken,
  profilePictureUpload,
  forgotPassword,
  resetPassword,
  updateProfile,
  deleteProfile,
  logoutstudent,
  enrollNewCourse,
  updateStreak,
  getMyProgress,
};
