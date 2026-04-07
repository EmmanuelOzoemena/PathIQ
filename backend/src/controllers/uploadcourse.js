const courseService = require('../services/uploadcourse');

const uploadBulkCourses = async (req, res, next) => {
  try {
    // Assuming the file path is sent or fixed in your 'uploads' folder
    const filePath = './courses.csv'; 
    const data = await courseService.importCoursesFromCSV(filePath);
    
    res.status(201).json({
      message: "Courses imported successfully",
      count: data.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadBulkCourses };