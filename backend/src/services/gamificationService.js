const Course = require("../models/courseModels");

exports.processQuiz = async (event) => {

  const { student_id, score, time_spent, topic_name, courseCode } = event;

  console.log("Saving quiz result", {
    student_id,
    score,
    time_spent,
    topic_name
  });

  // store quiz analytics event
  await Course.updateOne(
    { courseCode: courseCode },
    {
      $push: {
        analyticsEvents: {
          student_id,
          event_type: "quiz_completed",
          score,
          time_spent,
          topic_name
        }
      }
    }
  );

};


exports.processFinalTest = async (event) => {

  const { student_id, test_score, attempt_number, courseCode } = event;

  console.log("Saving final test result", {
    student_id,
    test_score,
    attempt_number
  });

  await Course.updateOne(
    { courseCode: courseCode },
    {
      $push: {
        analyticsEvents: {
          student_id,
          event_type: "final_test_submitted",
          test_score,
          attempt_number
        }
      }
    }
  );

};


exports.awardQuizXP = async (event) => {

  const { student_id, score } = event;

  // simple XP logic (example)
  const xp = score * 10;

  console.log("Awarding XP for quiz completion", {
    student_id,
    score,
    xp_awarded: xp
  });

  // In a real system this would update a Student XP field
};