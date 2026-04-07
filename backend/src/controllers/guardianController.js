const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const Guardian = require("../models/guardianModels");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const guardianServiceActivities = require("../services/guardianService");

const guardianService = new guardianServiceActivities();

const signup = async (req, res, next) => {

  try {
    const { name, email, password, uniqueCode } = req.body;
    const guardian = await guardianService.createGuardian({
      name,
      email,
      password,
      uniqueCode,
    });

    apiResponse(res, 201, guardian, "Guardian registered successfully");
  } catch (err) {
    next(err);
  }
};

const loginGuardian = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const guardian = await guardianService.login(email, password);

    apiResponse(res, 200, guardian, "Login successful");
  } catch (error) {
    next(error);
  }
};

const fetchAllGuardian = async (req, res, next) => {
  try {
    const guardians = await guardianService.getAllGuardians();

    apiResponse(res, 200, guardians, "All guardians retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    await guardianService.verifyAccount(email, otp);

    apiResponse(res, 200, null, "Account verified successfully");
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await guardianService.resendOtp(email);
    apiResponse(res, 200, result, "A new OTP has been sent to your email");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const guardianId = req.user.id; // From decoded refresh token
    const newRefreshToken =
      await guardianService.generateRefreshToken(guardianId);
    apiResponse(res, 200, { token: newRefreshToken }, "Token refreshed");
  } catch (error) {
    next(error);
  }
};

const profilePictureUpload = async (req, res, next) => {
  console.log("File:", req.file);
  try {
    const guardianId = req.user.id;
    const file = req.file;

    const guardian = await guardianService.uploadProfilePicture(
      guardianId,
      file,
    );

    apiResponse(res, 200, guardian, "Profile picture uploaded successfully");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = await guardianService.forgotPassword(req.body.email);
    apiResponse(res, 200, otp, "Reset OTP sent to email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await guardianService.resetPassword(email, otp, newPassword);
    apiResponse(res, 200, null, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const guardian = await guardianService.updateGuardianDetails(
      req.user.id,
      req.body,
    );
    apiResponse(res, 200, guardian, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const result = await guardianService.softDeleteGuardian(req.user.id);
    apiResponse(res, 200, null, result.message);
  } catch (error) {
    next(error);
  }
};

const logoutGuardian = async (req, res, next) => {
  try {
    await guardianService.logout(req.user.id);
    apiResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};

const addLinkedStudent = async (req, res, next) => {
  try {
    const guardianId = req.user.id;
    const { uniqueCode } = req.body;

    const student = await guardianService.linkStudent(guardianId, uniqueCode);

    apiResponse(res, 200, student, "Student linked successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  loginGuardian,
  fetchAllGuardian,
  verifyAccount,
  resendOtp,
  refreshToken,
  profilePictureUpload,
  forgotPassword,
  resetPassword,
  updateProfile,
  deleteProfile,
  logoutGuardian,
  addLinkedStudent,

};
