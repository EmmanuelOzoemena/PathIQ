
const express = require("express");
const authguardianRoute = express.Router();
const passport = require('passport');
const guardianController = require("../controllers/guardianController");
const validateData = require("../middleware/Zod/zodValidation");
const authValidation = require("../middleware/Zod/validationSchema");
const isAuth = require("../middleware/auth")
const upload = require("../config/multer");
const progressController = require("../controllers/progressController");
const adminController = require("../controllers/adminController");



authguardianRoute.post("/signup", validateData(authValidation.guardianSignupSchema), guardianController.signup);
authguardianRoute.post("/login",  validateData(authValidation.loginSchema), guardianController.loginGuardian);
authguardianRoute.get("/get-students", isAuth,  adminController.getAllStudents);
authguardianRoute.post("/verify-account", validateData(authValidation.verifyAccountSchema), guardianController.verifyAccount);
authguardianRoute.post("/resend-otp", validateData(authValidation.resendOtpSchema),  guardianController.resendOtp);
authguardianRoute.post("/refresh-token", isAuth, guardianController.refreshToken);
authguardianRoute.post("/upload-profile-picture", isAuth, upload.single('profilePicture'),guardianController.profilePictureUpload);
authguardianRoute.post("/forgot-password", validateData(authValidation.forgotPasswordSchema), guardianController.forgotPassword);
authguardianRoute.post("/reset-password", validateData(authValidation.resetPasswordSchema), guardianController.resetPassword);
authguardianRoute.patch("/update-profile", isAuth, validateData(authValidation.updateProfileSchema), guardianController.updateProfile);
authguardianRoute.delete("/delete-profile", isAuth, guardianController.deleteProfile);

authguardianRoute.post("/logout", isAuth, guardianController.logoutGuardian);

authguardianRoute.get(
  "/:studentId/:courseId/students-progress",
  isAuth,
  progressController.checkStudentProgress,
);

authguardianRoute.post("/link-student", isAuth,  guardianController.addLinkedStudent);

module.exports = authguardianRoute;