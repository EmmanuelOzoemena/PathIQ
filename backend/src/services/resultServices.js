const Result = require('../models/resultModels');
const certificateService =require("./certificateService")

const certService = new certificateService ()

/**
 * Core Logic: Calculates weighted score
 * Quizzes = 40% (Sum of topics)
 * Exam = 60% (Raw score out of 100 * 0.6)
 */

class resultServiceActivities {
  
  
  async calculateWeightedScore(quizArray = [], rawTestScore = 0) {
    // Sum up all individual quiz scores (40% of total grade)
    const quizTotal = quizArray.reduce((sum, item) => sum + (item.score || 0), 0);
    
    // Calculate Weighted Test (60% of the raw 100 score)
    const weightedTest = (rawTestScore / 100) * 60;
    
    // Return both so we can assign them to specific fields
    return {
      quizTotal,
      weightedTest,
      overallTotal: quizTotal + weightedTest
    };
  }

  async processFinalGrade(studentId, courseId) {
    // Fetch the record
    const result = await Result.findOne({ studentId, courseId });

    if (!result) {
      throw new Error("Result record not found. Ensure quizzes are completed first.");
    }

    // Ensure the raw testScore has been recorded
    if (result.testScore === undefined || result.testScore === null) {
      throw new Error("No test score found in database. Please add test score first.");
    }

    // Perform the calculation
    const scores = await this.calculateWeightedScore(result.quizScores, result.testScore);

    // Map values to your Schema fields
    result.weightedTestScore = scores.weightedTest;
    result.overallTotalScore = scores.overallTotal;
    
    // Logic for Passing and Certification
    if (scores.overallTotal >= 50) {
      result.isPassed = true;
      result.isCertified = true; 
      // generate certificate
      const generateCert = await certService.generateCertificate(studentId, courseId)
    } else {
      result.isPassed = false;
      result.isCertified = false;
    }

    // Save the document
    await result.save();
    
    return result;
  }
}


module.exports = new resultServiceActivities();