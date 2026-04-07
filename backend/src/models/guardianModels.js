const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    linkedStudent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    }
    ],// guardian can be linked to multiple students, but each student can have only one guardian
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    profilePicture: {
        type: String,
    },
    stateOfOrigin: {
      type: String,
    },
    lga: {
      type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    isloggedIn: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'guardian'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }, 
    deletedAt: {
        type: Date,
        default: null
    }, 
}, { timestamps: true,
      versionKey: false,
    
});

const Guardian = mongoose.model('Guardian', guardianSchema);

module.exports = Guardian;