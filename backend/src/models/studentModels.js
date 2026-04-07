const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    stateOfOrigin: {
      type: String,
    },
    lga: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isloggedIn: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },

    uniqueCode: {
      type: String,
      unique: true,
      required: true,
    },

    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    
    isInactiveNotificationSent: {
      type: Boolean,
      default: false,
    },

    certificate: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        hash: {
            type: String
        },
        certicateNo: {
            type: String
        },
        txHash: {
          type: String
        },

    }],

    streak: {
      count: {
        type: Number,
        default: 0,
      },

      lastCheckIn: {
        type: Date,
        default: null,
      },

      rewards: {
        hasStreakIcon: {
          type: Boolean,
          default: false,
        },
        hasBadgeIcon: {
          type: Boolean,
          default: false,
        },
        hasRewardIcon: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  { timestamps: true, versionKey: false },
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
