const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Course = require('./src/models/courseModels');
require('dotenv').config();

// const courseId = '69be4d6bbef9adb727e0da0e';
// const targetTopicId = '69be4db547bd2770863de95a';
// const questionsToPush = [];

// const seedQuiz = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URI);
    
//     fs.createReadStream('courses.csv')
//       .pipe(csv())
//       .on('data', (row) => {
//         if (row.questionText) {
//           questionsToPush.push({
//             questionText: row.questionText.trim(),
//             // Ensure options are an array of strings
//             options: row.options ? row.options.split(',').map(opt => opt.trim()) : [],
//             correctOption: row.correctOption.trim()
//           });
//         }
//       })
//       .on('end', async () => {
//         try {
//           // Use arrayFilters to find the specific topicId inside the quizQuestions array
//           const result = await Course.updateOne(
//             { _id: courseId },
//             { 
//               $push: { "quizQuestions.$[elem].questions": { $each: questionsToPush } } 
//             },
//             { 
//               arrayFilters: [{ "elem.topicId": targetTopicId }],
//               new: true 
//             }
//           );

//           if (result.modifiedCount === 0) {
//             console.log("❌ No changes made. Verify that the Topic ID exists inside the quizQuestions array.");
//           } else {
//             console.log(`✅ Successfully added ${questionsToPush.length} questions to the quiz!`);
//           }
//           process.exit();
//         } catch (err) {
//           console.error("❌ Database Error:", err);
//           process.exit(1);
//         }
//       });
//   } catch (error) {
//     console.error("Connection error:", error);
//   }
// };


const courseId = '69bdb77f52967a16822eff9d'; // Ensure this matches your ENG303 Course ID
const testQuestionsToSeed = [];

const seedFinalTest = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("📡 Connected to Database for Final Test Seeding...");

    // Update this filename to whatever you save the Final Test CSV as
    fs.createReadStream('courses.csv') 
      .pipe(csv())
      .on('data', (row) => {
        if (row.questionText) {
          testQuestionsToSeed.push({
            questionText: row.questionText.trim(),
            // Splits "A) opt1, B) opt2" into ["A) opt1", "B) opt2"]
            options: row.options ? row.options.split(',').map(opt => opt.trim()) : [],
            correctOption: row.correctOption ? row.correctOption.trim() : ""
          });
        }
      })
      .on('end', async () => {
        console.log(`📖 Parsed ${testQuestionsToSeed.length} questions. Updating Course...`);
        
        try {
          // Since testQuestions is a top-level array in the Course schema,
          // we just push directly to it using the courseId.
          const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { 
              $push: { testQuestions: { $each: testQuestionsToSeed } } 
            },
            { new: true }
          );

          if (!updatedCourse) {
            console.error("❌ Course not found. Verify the courseId.");
          } else {
            console.log(`✅ Success! Added ${testQuestionsToSeed.length} questions to the Final Test of: ${updatedCourse.courseName}`);
          }
          process.exit();
        } catch (err) {
          console.error("❌ Database Error:", err.message);
          process.exit(1);
        }
      });
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
};

seedFinalTest();



