const Student = require("../models/studentModels");
const Guardian = require ("../models/guardianModels");
const Admin = require ("../models/adminModels")
const ApiError = require("../middleware/apiError");
const TokenService = require("../utils/tokens");
const AuthTokens = require("../utils/hash");
const { sendOTPEmail } = require("../email/emailService");
const cloudinary = require("../config/cloudinary");
const generateStudentCode = require("../utils/uniquecode");

const newToken = TokenService;
const hash = AuthTokens;

class studentServiceActivities {
  async generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    return otp;
  }

  async generateOtpExpiry() {
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    return expiry;
  }

  async checkEmailGlobalUniqueness (email) {
  const [student, guardian, admin] = await Promise.all([
    Student.findOne({ email }),
    Guardian.findOne({ email }),
    Admin.findOne({ email })
  ]);

  if (student || guardian || admin) {
    throw new Error('Email is already registered under another role.');
  }
};

  async createStudent(studentData) {
    const { email, password, name } = studentData;

    // check for existing Student
    const existingStudent = await this.checkEmailGlobalUniqueness(email);

    if (existingStudent) {
      throw new ApiError(409, "Identity conflict: Email already taken");
    }

    // Hash password
    const hashedPassword = await hash.hashPassword(password);

    // Generate otp, otp expiry and email
    const otp = await this.generateOtp();
    const otpExpiry = await this.generateOtpExpiry();
    // Generate unique student code

    const newCode = await generateStudentCode();
    
    // Create student
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      uniqueCode: newCode,
    });

    // sendOTPEmail(email, name, "VERIFICATION", otp);

    // Return student without sensitive fields
    return Student.findById(newStudent._id).select("-password -otpExpiry");
  }

  async login(email, password) {
    const student = await Student.findOne({ email });
    if (!student) {
      throw new ApiError(404, "Student does not exist");
    }
    const isPasswordValid = await hash.comparePassword(
      password,
      student.password,
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid student credentials");
    }
    if (!student.isVerified) {
      throw new ApiError(
        403,
        "Account not verified. Please verify your account to log in.",
      );
    }
    student.isloggedIn = true;
    student.lastLogin = new Date();
    student.isInactiveNotificationSent = false; // reset inactivity notification flag on login

    await student.save();

    // Generate token
    const payload = { id: student._id, role: student.role };
    const token = newToken.generateAccessToken(payload);

    // Remove sensitive data before returning
    const loggedInStudent = await Student.findById(student._id).select(
      "-password -otp -otpExpiry",
    );
    return { student: loggedInStudent, token };
  }

  async getAllStudents() {
    if (role !== 'admin') {
          throw new ApiError(403, "Access denied: Admins only");
        }
    const students = await Student.find();
    return students;
  }

  async verifyAccount(email, otp) {
    const student = await Student.findOne({ email });

    if (!student) throw new ApiError(404, "Student not found");
    if (student.isVerified) throw new ApiError(400, "Account already verified");

    // Check if OTP matches and hasn't expired
    if (student.otp !== otp) throw new ApiError(400, "Invalid OTP");
    if (new Date() > student.otpExpiry)
      throw new ApiError(400, "OTP has expired");

    student.isVerified = true;
    student.otp = null; // Clear OTP once used
    student.otpExpiry = null;
    await student.save();

    return student;
  }

  async resendOtp(email) {
    const student = await Student.findOne({ email });
    if (!student) throw new ApiError(404, "Student not found");

    // Generate otp, otp expiry and send otp as email
    const newOtp = await this.generateOtp();
    const newOtpExpiry = await this.generateOtpExpiry();
    
    // Update student with new OTP and expiry
    student.otp = newOtp;
    student.otpExpiry = newOtpExpiry;
    await student.save();
    
    // sendOTPEmail(email, student.name, "RESEND_OTP", newOtp);

    return student.otp;
  }

  async generateRefreshToken(StudentId) {
    console.log("Searching for ID:", StudentId);
    const student = await Student.findById(StudentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    if (!student.isloggedIn) {
      throw new ApiError(400, "Please log in first");
    }
    if (student.isDeleted) {
      throw new ApiError(400, "Cannot refresh token for a deleted account");
    }
    // Generate new refresh token and save to DB
    const refreshToken = newToken.generateRefreshToken({ id: StudentId });
    student.refreshToken = refreshToken;
    await student.save();

    return refreshToken;
  }

  //upload Profile Picture
  async uploadProfilePicture(StudentId, file) {
    if (!file) {
      throw new ApiError(400, "No file uploaded");
    }
    const student = await Student.findById(StudentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    if (!student.isloggedIn) {
      throw new ApiError(400, "Please log in first");
    }
    if (student.isDeleted) {
      throw new ApiError(400, "Cannot upload picture for a deleted account");
    }
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "profilePicture",
      public_id: `Student_${StudentId}_profile`,
    });
    student.profilePicture = uploadResult.secure_url;
    await student.save();
    return student;
  }

  async forgotPassword(email) {
    const student = await Student.findOne({ email });
    if (!student) throw new ApiError(404, "Student not found");

    // Generate otp, otp expiry and send otp as email
    const otp = await this.generateOtp();
    const otpExpiry = await this.generateOtpExpiry();
    
    // Update student with new OTP and expiry
    student.otp = otp;
    student.otpExpiry = otpExpiry;
    await student.save();

    // sendOTPEmail(email, student.name, "PASSWORD_RESET", otp);

    return otp;
  }

  async resetPassword(email, otp, newPassword) {
    const student = await Student.findOne({ email, otp });
    if (!student) throw new ApiError(400, "Student not found or invalid OTP");
    if (new Date() > student.otpExpiry)
      throw new ApiError(400, "OTP has expired");

    student.password = await AuthTokens.hashPassword(newPassword);
    student.otp = null;
    student.otpExpiry = null;
    await student.save();

    return { message: "Password reset successful" };
  }

  async updateStudentDetails(StudentId, updateData) {
    const student = await Student.findById(StudentId);
    if (!student) throw new ApiError(404, "Student not found");
    if (!student.isloggedIn) throw new ApiError(400, "Please log in first");
    if (student.isDeleted)
      throw new ApiError(400, "Cannot update a deleted account");

    const updates = {}; // will update only provided fields
    if (updateData.name) updates.name = updateData.name;
    if (updateData.email) {
      const existing = await Student.findOne({
        email: updateData.email,
        _id: { $ne: StudentId },
      });
      if (existing)
        throw new ApiError(400, "Email already in use by another account");
      updates.email = updateData.email;
    }
    if (updateData.password) {
      updates.password = await AuthTokens.hashPassword(updateData.password);
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      StudentId,
      { $set: updates }, // $set ensures only these fields are touched
      { new: true, runValidators: true },
    ).select("-password -otp -otpExpiry");

    return updatedStudent;
  }

  async softDeleteStudent(StudentId) {
    //  mark the student as deleted and set a timestamp
    const student = await Student.findById(StudentId);
    if (!student) throw new ApiError(404, "Student not found");
    if (!student.isloggedIn)
      throw new ApiError(400, "Cannot delete account!, Please log in first");
    const deletedStudent = await Student.findByIdAndUpdate(
      StudentId,
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: "inactive", // Optional: update status for easier filtering
      },
      { new: true },
    );
    return { message: "Account deactivated successfully" };
  }

  async logout(StudentId) {
    // Clear the refresh token in the DB to invalidate the session
    const student = await Student.findByIdAndUpdate(StudentId, {
      $unset: { refreshToken: 1 },
    });
    if (!student) throw new ApiError(404, "Student not found");
    if (student.isDeleted)
      throw new ApiError(400, "Cannot logout from a deleted account");
    if (!student.isloggedIn)
      throw new ApiError(400, "Student is already logged out");
    await Student.findByIdAndUpdate(StudentId, { isloggedIn: false });
    return { message: "Logged out successfully" };
  }


  async enrollCourse(studentId, courseId, role) {
    if (role !== 'admin' && role !== 'student') {
          throw new ApiError(403, "Access denied");
        }
    if (!courseId) {
      throw new ApiError(400, "Enrollment failed: No course ID provided.");
    }
    const student = await Student.findById(studentId);
    if (!student) throw new ApiError(404, "Student not found");

    // Check if already enrolled to prevent duplicates
    if (student.enrolledCourses.includes(courseId)) {
      throw new ApiError(400, "Course already enrolled");
    }
    student.enrolledCourses.push(courseId);
    await student.save();
    return student;
  }
}

module.exports = studentServiceActivities;
