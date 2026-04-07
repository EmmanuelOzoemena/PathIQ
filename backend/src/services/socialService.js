const Student = require("../models/studentModels");
const ApiError = require("../middleware/apiError");
const TokenService = require("../utils/tokens");


const newToken = TokenService;


class oAuthServiceActivities {

  // For all OAuth logins, all have same logic
  async oAuthLogin(user) {
    // Generate token
    const token = newToken.generateAccessToken(user._id, user.role);

    // Clean sensitive data before returning Student info
    const loggedInUser = await Student.findById(user._id).select(
      "-password -otp -otpExpiry") 
      || await Guardian.findById(user._id).select("-password -otp -otpExpiry") 
      || await Admin.findById(user._id).select("-password -otp -otpExpiry");

    return { Student: loggedInUser, token };
  }
}

  
module.exports = oAuthServiceActivities;
