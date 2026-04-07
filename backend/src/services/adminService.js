const Admin = require("../models/adminModels");
const Guardian = require("../models/guardianModels");
const Student = require("../models/studentModels");
const ApiError  = require("../middleware/apiError");
const TokenService  = require("../utils/tokens");
const AuthTokens  = require("../utils/hash");
const {sendOTPEmail}  = require("../email/emailService");
const cloudinary = require("../config/cloudinary");


const newToken = TokenService
const hash = AuthTokens


class adminServiceActivities {

    async generateOtp () {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        return otp;
    }

    async generateOtpExpiry() {
        const expiry = new Date (Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
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

    async createAdmin(adminData) {
        const { email,  password, name } = adminData;

        // check for existing Admin
        const existingAdmin = await this.checkEmailGlobalUniqueness(email);

        if (existingAdmin) {
            throw new ApiError(409, "Identity conflict: Email already taken");
        }

        // Hash password
        const hashedPassword = await hash.hashPassword(password);

         // Generate otp, otp expiry and email
        const otp = await this.generateOtp();
        const otpExpiry = await this.generateOtpExpiry();

        
        // Create admin
        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry
        });
        
        // sendOTPEmail(email, name, 'VERIFICATION', otp);
        // Return admin without sensitive fields
        return Admin.findById(newAdmin._id).select("-password -otpExpiry");
    }

    async login(email, password) {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(404, "Account does not exist");
        }
        const isPasswordValid = await hash.comparePassword(password, admin.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid admin credentials");
        }
        if (!admin.isVerified) {
            throw new ApiError(403, "Account not verified. Please verify your account to log in.");
        }
        admin.isloggedIn = true;
        
        await admin.save();

        // Generate token
        const payload = {id: admin._id, role: admin.role}
        const token = newToken.generateAccessToken(payload);

        // Remove sensitive data before returning
        const loggedInAdmin = await Admin.findById(admin._id).select("-password -otp -otpExpiry");
        return {admin: loggedInAdmin, token};
    }

    async verifyAccount(email, otp) {
        const admin = await Admin.findOne({ email });

        if (!admin) throw new ApiError(404, "Admin not found");
        if (admin.isVerified) throw new ApiError(400, "Account already verified");

        // Check if OTP matches and hasn't expired
        if (admin.otp !== otp) throw new ApiError(400, "Invalid OTP");
        if (new Date() > admin.otpExpiry) throw new ApiError(400, "OTP has expired");

        admin.isVerified = true;
        admin.otp = null; // Clear OTP once used
        admin.otpExpiry = null;
        await admin.save();

        return admin; // Optionally return admin info after verification
    }

    async resendOtp(email) {
        const admin = await Admin.findOne({ email });
        if (!admin) throw new ApiError(404, "Admin not found");

        // Generate otp, otp expiry and send otp as email
        const newOtp = await this.generateOtp();
        const newOtpExpiry = await this.generateOtpExpiry();
        
        // Update admin with new OTP and expiry
        admin.otp = newOtp;
        admin.otpExpiry = newOtpExpiry;
        await admin.save();
        
        // sendOTPEmail(email, admin.name, 'RESEND_OTP', newOtp);
        return admin.otp;
    }

    async generateRefreshToken(AdminId) {
    console.log("Searching for ID:", AdminId);
    const admin = await Admin.findById(AdminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }
    if (!admin.isloggedIn) {
        throw new ApiError(400, "Please log in first");
    }
    if (admin.isDeleted) {
        throw new ApiError(400, "Cannot refresh token for a deleted account");
    }
    // Generate new refresh token and save to DB
    const refreshToken = newToken.generateRefreshToken({ id: AdminId });
    admin.refreshToken = refreshToken;
    await admin.save();

    return refreshToken;
}

    //upload Profile Picture
    async uploadProfilePicture(AdminId, file) {
        if (!file) {
            throw new ApiError(400, "No file uploaded");
        }
        const admin = await Admin.findById(AdminId);
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        };
        if (!admin.isloggedIn) {
            throw new ApiError(400, "Please log in first");
        }
        if (admin.isDeleted) {
            throw new ApiError(400, "Cannot upload picture for a deleted account");
        }
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'profilePicture',
            public_id: `Admin_${AdminId}_profile`,
        });
        admin.profilePicture = uploadResult.secure_url;
        await admin.save()
        return admin; 
    };


    async forgotPassword(email) {
        const admin = await Admin.findOne({ email });
        if (!admin) throw new ApiError(404, "Admin not found");
        
         // Generate otp, otp expiry and send otp as email
        const otp = await this.generateOtp();
        const otpExpiry = await this.generateOtpExpiry();
        
        // Update admin with new OTP and expiry
        admin.otp = otp;
        admin.otpExpiry = otpExpiry;
        await admin.save();
        // sendOTPEmail(email, admin.name, 'PASSWORD_RESET', otp);
        
        return otp;
    }

    async resetPassword(email, otp, newPassword) {
        const admin = await Admin.findOne({ email, otp });
        if (!admin) throw new ApiError(400, "Admin not found or invalid OTP");
        if (new Date() > admin.otpExpiry) throw new ApiError(400, "OTP has expired");

        admin.password = await AuthTokens.hashPassword(newPassword);
        admin.otp = null;
        admin.otpExpiry = null;
        await admin.save();

        return { message: "Password reset successful" };
    }

    async updateAdminDetails(AdminId, updateData) {
        const admin = await Admin.findById(AdminId);
        if (!admin) throw new ApiError(404, "Admin not found");
        if (!admin.isloggedIn) throw new ApiError(400, "Please log in first");
        if (admin.isDeleted) throw new ApiError(400, "Cannot update a deleted account");

        const updates = {}; // will update only provided fields
        if (updateData.name) updates.name = updateData.name;
        if (updateData.email) {
            const existing = await Admin.findOne({ email: updateData.email, _id: { $ne: AdminId } });
            if (existing) throw new ApiError(400, "Email already in use by another account");
            updates.email = updateData.email;
        }
        if (updateData.password) {
            updates.password = await AuthTokens.hashPassword(updateData.password);
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(
            AdminId, 
            { $set: updates }, // $set ensures only these fields are touched
            { new: true, runValidators: true }
        ).select("-password -otp -otpExpiry");

        return updatedAdmin;
}

async softDeleteAdmin(AdminId) {
    //  mark the admin as deleted and set a timestamp
    const admin = await Admin.findById(AdminId);
    if (!admin) throw new ApiError(404, "Admin not found");
    if (!admin.isloggedIn) throw new ApiError(400, "Cannot delete account!, Please log in first");
    const deletedAdmin = await Admin.findByIdAndUpdate(
        AdminId,
        { 
            isDeleted: true, 
            deletedAt: new Date(),
            status: "inactive" // Optional: update status for easier filtering
        },
        { new: true }
    );
    return { message: "Account deactivated successfully" };
}

    async logout(AdminId) {
        // Clear the refresh token in the DB to invalidate the session
        const admin = await Admin.findByIdAndUpdate(AdminId, { $unset: { refreshToken: 1 } });
        if (!admin) throw new ApiError(404, "Admin not found");
        if (admin.isDeleted) throw new ApiError(400, "Cannot logout from a deleted account");
        if (!admin.isloggedIn) throw new ApiError(400, "Admin is already logged out");
        await Admin.findByIdAndUpdate(AdminId, { isloggedIn: false });
        return { message: "Logged out successfully" };
    }

    async getAllGuardians(role) {
        if (role !== 'admin') {
          throw new ApiError(403, "Access denied: Admins only");
        }
        const guardians = await Guardian.find().select("-password -otp -otpExpiry").populate('linkedStudent', 'name email');
        return guardians;
      }

    async getAllStudents(role, guardianId) {
        if (role === 'guardian') {
        const getLinkedStudents = await Guardian.findById(guardianId).populate('linkedStudent', '-password -otp -otpExpiry');
        if (!getLinkedStudents) {
            throw new ApiError(404, "Cannot find students linked to this guardian");
        }
        return getLinkedStudents.linkedStudent;}
         else if (role === 'student') {
            throw new ApiError(403, "Access denied: Students cannot access student list");
        } else {
            const students = await Student.find().select("-password -otp -otpExpiry");
            return students;
        }
    }

//     async editCourseContent(courseId, updateData) {
//         const course = await Course.findById(courseId);
//         if (!course) throw new ApiError(404, "Course not found");

//         // Update only provided fields
//         if (updateData.courseTitle) course.courseName = updateData.courseName;
//         if (updateData.coursCode) course.description = updateData.description;
//         if (updateData.description) course.description = updateData.description;
//         if (updateData.content) course.content = updateData.content;
// }

}
module.exports = adminServiceActivities;