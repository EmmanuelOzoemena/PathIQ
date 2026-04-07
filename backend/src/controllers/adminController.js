const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const Admin = require("../models/adminModels");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const adminServiceActivities = require("../services/adminService");
const courseServiceActivities = require("../services/courseService");

const adminService = new adminServiceActivities();
const courseService = new courseServiceActivities();

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const admin = await adminService.createAdmin({ name, email, password });

    apiResponse(res, 201, admin, "Admin registered successfully");
  } catch (err) {
    next(err);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await adminService.login(email, password);

    apiResponse(res, 200, admin, "Login successful");
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    await adminService.verifyAccount(email, otp);

    apiResponse(res, 200, null, "Account verified successfully");
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await adminService.resendOtp(email);
    apiResponse(res, 200, result, "A new OTP has been sent to your email");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const adminId = req.user.id; // From decoded refresh token
    const newRefreshToken = await adminService.generateRefreshToken(adminId);
    apiResponse(res, 200, { token: newRefreshToken }, "Token refreshed");
  } catch (error) {
    next(error);
  }
};

const profilePictureUpload = async (req, res, next) => {
  console.log("File:", req.file);
  try {
    const adminId = req.user.id;
    const file = req.file;

    const admin = await adminService.uploadProfilePicture(adminId, file);

    apiResponse(res, 200, admin, "Profile picture uploaded successfully");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = await adminService.forgotPassword(req.body.email);
    apiResponse(res, 200, otp, "Reset OTP sent to email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await adminService.resetPassword(email, otp, newPassword);
    apiResponse(res, 200, null, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const admin = await adminService.updateAdminDetails(req.user.id, req.body);
    apiResponse(res, 200, admin, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const result = await adminService.softDeleteAdmin(req.user.id);
    apiResponse(res, 200, null, result.message);
  } catch (error) {
    next(error);
  }
};

const logoutAdmin = async (req, res, next) => {
  try {
    await adminService.logout(req.user.id);
    apiResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};

const addTopic = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const topicData = req.body;

    if (req.user.role !== "admin") {
      return apiResponse(
        res,
        403,
        null,
        "Unauthorized: Only admins can add topics",
      );
    }
    const updatedCourse = await courseService.addTopicToCourse(
      courseId,
      topicData,
    );

    return apiResponse(
      res,
      201,
      updatedCourse.topics,
      "Topic added successfully",
    );
  } catch (err) {
    next(err);
  }
};


const fetchAllGuardian = async (req, res, next) => {

  try {
    const role = req.user.role;
    const guardians = await adminService.getAllGuardians(role);

    apiResponse(res, 200, guardians, "All guardians retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const role = req.user.role;
    const guardianId = req.user.id; // Assuming the guardian's ID is in the token
    const students = await adminService.getAllStudents(role, guardianId);

    apiResponse(res, 200, students, "All students retrieved successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  loginAdmin,
  verifyAccount,
  resendOtp,
  refreshToken,
  profilePictureUpload,
  forgotPassword,
  resetPassword,
  updateProfile,
  deleteProfile,
  logoutAdmin,
  addTopic,
  fetchAllGuardian,
  getAllStudents
};
