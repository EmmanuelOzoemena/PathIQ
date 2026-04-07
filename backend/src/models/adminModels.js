const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        default: 'admin'
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;