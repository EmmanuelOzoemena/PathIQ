const Guardian = require("../models/guardianModels");
const Student = require("../models/studentModels");
const Admin = require("../models/adminModels");
const ApiError = require("../middleware/apiError");
const TokenService = require("../utils/tokens");
const AuthTokens = require("../utils/hash");
const {sendOTPEmail} = require("../email/emailService");
const cloudinary = require("../config/cloudinary");

const newToken = TokenService;
const hash = AuthTokens;

class guardianServiceActivities {
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
      throw new Error( 'Email is already registered under another role.');
    }
  };

  async createGuardian(guardianData) {
    console.log("FULL DATA RECEIVED BY SERVICE:", guardianData);
    const { email, password, name, uniqueCode } = guardianData;

    //  Validate the code FIRST before creating the Guardian
    const student = await Student.findOne({ uniqueCode: uniqueCode });
    console.log(
      "Looking for student with code:",
      uniqueCode,
      "Found student:",
      student,
    );
    if (!student) {
      throw new ApiError(400, "Invalid Student Code. Check with the student.");
    }
    // check for existing Guardian
    const existingGuardian = await this.checkEmailGlobalUniqueness(email);

    if (existingGuardian) {
      throw new ApiError(409, "Identity conflict: Email already taken");
    }
    // Hash password
    const hashedPassword = await hash.hashPassword(password);

    // Generate otp, otp expiry and email
    const otp = await this.generateOtp();
    const otpExpiry = await this.generateOtpExpiry();

    
    // Create guardian
    const newGuardian = await Guardian.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      linkedStudent: [student._id], // Store reference to the student
    });
    
    // sendOTPEmail(email, name, "VERIFICATION", otp);
    // Return guardian without sensitive fields
    return await Guardian.findById(newGuardian._id)
    .populate({
      path: "linkedStudent",
      select: "name email uniqueCode", // Only pull out these fields
    })
    .select("-password -otpExpiry");
  }

  async login(email, password) {
    const guardian = await Guardian.findOne({ email });
    if (!guardian) {
      throw new ApiError(404, "Account does not exist");
    }
    const isPasswordValid = await hash.comparePassword(
      password,
      guardian.password,
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid guardian credentials");
    }
    if (!guardian.isVerified) {
      throw new ApiError(
        403,
        "Account not verified. Please verify your account to log in.",
      );
    }
    guardian.isloggedIn = true;

    await guardian.save();

    // Generate token
    const payload = { id: guardian._id, role: guardian.role };
    const token = newToken.generateAccessToken(payload);

    // Remove sensitive data before returning
    const loggedInGuardian = await Guardian.findById(guardian._id).select(
      "-password -otp -otpExpiry",
    );
    return { guardian: loggedInGuardian, token };
  }


  async verifyAccount(email, otp) {
    const guardian = await Guardian.findOne({ email });

    if (!guardian) throw new ApiError(404, "Guardian not found");
    if (guardian.isVerified)
      throw new ApiError(400, "Account already verified");

    // Check if OTP matches and hasn't expired
    if (guardian.otp !== otp) throw new ApiError(400, "Invalid OTP");
    if (new Date() > guardian.otpExpiry)
      throw new ApiError(400, "OTP has expired");

    guardian.isVerified = true;
    guardian.otp = null; // Clear OTP once used
    guardian.otpExpiry = null;
    await guardian.save();

    return guardian;
  }

  async resendOtp(email) {
    const guardian = await Guardian.findOne({ email });
    if (!guardian) throw new ApiError(404, "Guardian not found");

    // Generate otp, otp expiry and send otp as email
    const newOtp = await this.generateOtp();
    const newOtpExpiry = await this.generateOtpExpiry();
    
    // Update guardian with new OTP and expiry
    guardian.otp = newOtp;
    guardian.otpExpiry = newOtpExpiry;
    await guardian.save();
    // sendOTPEmail(email, guardian.name, "RESEND_OTP", newOtp);
    
    return guardian.otp;
  }

  async generateRefreshToken(GuardianId) {
    console.log("Searching for ID:", GuardianId);
    const guardian = await Guardian.findById(GuardianId);
    if (!guardian) {
      throw new ApiError(404, "Guardian not found");
    }
    if (!guardian.isloggedIn) {
      throw new ApiError(400, "Please log in first");
    }
    if (guardian.isDeleted) {
      throw new ApiError(400, "Cannot refresh token for a deleted account");
    }
    // Generate new refresh token and save to DB
    const refreshToken = newToken.generateRefreshToken({ id: GuardianId });
    guardian.refreshToken = refreshToken;
    await guardian.save();

    return refreshToken;
  }

  //upload Profile Picture
  async uploadProfilePicture(GuardianId, file) {
    if (!file) {
      throw new ApiError(400, "No file uploaded");
    }
    const guardian = await Guardian.findById(GuardianId);
    if (!guardian) {
      throw new ApiError(404, "Guardian not found");
    }
    if (!guardian.isloggedIn) {
      throw new ApiError(400, "Please log in first");
    }
    if (guardian.isDeleted) {
      throw new ApiError(400, "Cannot upload picture for a deleted account");
    }
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "profilePicture",
      public_id: `Guardian_${GuardianId}_profile`,
    });
    guardian.profilePicture = uploadResult.secure_url;
    await guardian.save();
    return guardian;
  }

  async forgotPassword(email) {
    const guardian = await Guardian.findOne({ email });
    if (!guardian) throw new ApiError(404, "Guardian not found");

    // Generate otp, otp expiry and send otp as email
    const otp = await this.generateOtp();
    const otpExpiry = await this.generateOtpExpiry();
    
    // Update guardian with new OTP and expiry
    guardian.otp = otp;
    guardian.otpExpiry = otpExpiry;
    await guardian.save();
    
    // sendOTPEmail(email, guardian.name, "PASSWORD_RESET", otp);
    return otp;
  }

  async resetPassword(email, otp, newPassword) {
    const guardian = await Guardian.findOne({ email, otp });
    if (!guardian) throw new ApiError(400, "Guardian not found or invalid OTP");
    if (new Date() > guardian.otpExpiry)
      throw new ApiError(400, "OTP has expired");

    guardian.password = await AuthTokens.hashPassword(newPassword);
    guardian.otp = null;
    guardian.otpExpiry = null;
    await guardian.save();

    return { message: "Password reset successful" };
  }

  async updateGuardianDetails(GuardianId, updateData) {
    const guardian = await Guardian.findById(GuardianId);
    if (!guardian) throw new ApiError(404, "Guardian not found");
    if (!guardian.isloggedIn) throw new ApiError(400, "Please log in first");
    if (guardian.isDeleted)
      throw new ApiError(400, "Cannot update a deleted account");

    const updates = {}; // will update only provided fields
    if (updateData.name) updates.name = updateData.name;
    if (updateData.email) {
      const existing = await Guardian.findOne({
        email: updateData.email,
        _id: { $ne: GuardianId },
      });
      if (existing)
        throw new ApiError(400, "Email already in use by another account");
      updates.email = updateData.email;
    }
    if (updateData.password) {
      updates.password = await AuthTokens.hashPassword(updateData.password);
    }
    const updatedGuardian = await Guardian.findByIdAndUpdate(
      GuardianId,
      { $set: updates }, // $set ensures only these fields are touched
      { new: true, runValidators: true },
    ).select("-password -otp -otpExpiry");

    return updatedGuardian;
  }

  async softDeleteGuardian(GuardianId) {
    //  mark the guardian as deleted and set a timestamp
    const guardian = await Guardian.findById(GuardianId);
    if (!guardian) throw new ApiError(404, "Guardian not found");
    if (!guardian.isloggedIn)
      throw new ApiError(400, "Cannot delete account!, Please log in first");
    const deletedGuardian = await Guardian.findByIdAndUpdate(
      GuardianId,
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: "inactive", // Optional: update status for easier filtering
      },
      { new: true },
    );
    return { message: "Account deactivated successfully" };
  }

  async logout(GuardianId) {
    // Clear the refresh token in the DB to invalidate the session
    const guardian = await Guardian.findByIdAndUpdate(GuardianId, {
      $unset: { refreshToken: 1 },
    });
    if (!guardian) throw new ApiError(404, "Guardian not found");
    if (guardian.isDeleted)
      throw new ApiError(400, "Cannot logout from a deleted account");
    if (!guardian.isloggedIn)
      throw new ApiError(400, "Guardian is already logged out");
    await Guardian.findByIdAndUpdate(GuardianId, { isloggedIn: false });
    return { message: "Logged out successfully" };
  }

  async linkStudent(GuardianId, uniqueCode) {
    const guardian = await Guardian.findById(GuardianId);
    const student = await Student.findOne({ uniqueCode });

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    if (guardian.linkedStudent.includes(student._id)) {
      throw new ApiError(400, "Student is already linked to this guardian");
    }

    guardian.linkedStudent.push(student._id);
    await guardian.save();

    return student;
  }
}
module.exports = guardianServiceActivities;
