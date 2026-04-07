const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const oAuthServiceActivities = require("../services/socialService");


const oAuthService = new oAuthServiceActivities();


const loginWithOauth = async (req, res, next) => {
  try {
    // Passport's middleware populates req.student
    if (!req.user) {
      throw new ApiError(401, "Authentication failed");
    }

    const result = await oAuthService.oAuthLogin(req.user);

    apiResponse(res, 200, result, " login successful");
  } catch (error) {
    next(error);
  }
};



module.exports = {
  
  loginWithOauth,

};
