const resultService = require('../services/resultServices');
const apiResponse = require ('../middleware/apiResponse');
const ApiError = require ("../middleware/apiError")
const scoringService = require('../services/resultServices');

const finalGrades = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.params;

    const result = await scoringService.processFinalGrade(
      studentId, 
      courseId
    );

    apiResponse(res, 201, result, "Final grade calculated based on stored scores.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  finalGrades
}