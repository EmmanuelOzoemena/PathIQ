const fs = require('fs');
const csv = require('csv-parser');
const Course = require('../models/courseModels'); // Your Mongoose or Prisma model

const importCoursesFromCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Bulk insert for efficiency with large content
          const savedCourses = await Course.insertMany(results);
          resolve(savedCourses);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (err) => reject(err));
  });
};

module.exports = { importCoursesFromCSV };