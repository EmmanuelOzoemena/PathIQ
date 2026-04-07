const express = require("express");
const authadminRoute = express.Router();
const passport = require("passport");
const adminController = require("../controllers/adminController");
const progressController = require("../controllers/progressController");
const validateData = require("../middleware/Zod/zodValidation");
const authValidation = require("../middleware/Zod/validationSchema");
const isAuth = require("../middleware/auth");
const upload = require("../config/multer");


authadminRoute.post(
  "/signup",
  validateData(authValidation.signupSchema),
  adminController.signup,
);
authadminRoute.post(
  "/login",
  validateData(authValidation.loginSchema),
  adminController.loginAdmin,
);
authadminRoute.post(
  "/verify-account",
  validateData(authValidation.verifyAccountSchema),
  adminController.verifyAccount,
);
authadminRoute.post(
  "/resend-otp",
  validateData(authValidation.resendOtpSchema),
  adminController.resendOtp,
);
authadminRoute.post("/refresh-token", isAuth, adminController.refreshToken);
authadminRoute.post(
  "/upload-profile-picture",
  isAuth,
  upload.single("profilePicture"),
  adminController.profilePictureUpload,
);
authadminRoute.post(
  "/forgot-password",
  validateData(authValidation.forgotPasswordSchema),
  adminController.forgotPassword,
);
authadminRoute.post(
  "/reset-password",
  validateData(authValidation.resetPasswordSchema),
  adminController.resetPassword,
);
authadminRoute.patch(
  "/update-profile",
  isAuth,
  validateData(authValidation.updateProfileSchema),
  adminController.updateProfile,
);
authadminRoute.delete("/delete-profile", isAuth, adminController.deleteProfile);

authadminRoute.post("/logout", isAuth, adminController.logoutAdmin);

authadminRoute.get("/get-all-students", isAuth, adminController.getAllStudents);

authadminRoute.get("/get-all-guardians", isAuth, adminController.fetchAllGuardian);

authadminRoute.get('/:studentId/:courseId/students-progress', isAuth, progressController.checkStudentProgress);

authadminRoute.get('/all-progress', isAuth, progressController.checkAllProgress);

// trigger re-engagement reminders
authadminRoute.post('/trigger-reminders', isAuth, progressController.triggerReminders);



module.exports = authadminRoute;
