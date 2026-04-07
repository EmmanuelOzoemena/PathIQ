const Course = require("../models/courseModels");

/*
------------------------------------
QUIZ GRADING
------------------------------------
*/

exports.gradeQuiz = async (event) => {

  const { student_id, courseCode, topic_name, score, time_spent } = event;

  let grade;
  let status;

  // grading logic
  if (score >= 70) {
    grade = "A";
    status = "passed";
  } 
  else if (score >= 50) {
    grade = "B";
    status = "passed";
  } 
  else {
    grade = "F";
    status = "failed";
  }

  console.log("Quiz graded", {
    student_id,
    topic_name,
    score,
    grade,
    status
  });

  // store analytics event
  await Course.updateOne(
    { courseCode: courseCode },
    {
      $push: {
        analyticsEvents: {
          student_id,
          event_type: "quiz_graded",
          topic_name,
          score,
          grade,
          status,
          time_spent
        }
      }
    }
  );

  return {
    student_id,
    grade,
    status
  };
};


/*
------------------------------------
FINAL TEST GRADING
------------------------------------
*/

exports.gradeFinalTest = async (event) => {

  const { student_id, courseCode, test_score, attempt_number } = event;

  let grade;
  let result;

  if (test_score >= 70) {
    grade = "A";
    result = "passed";
  } 
  else if (test_score >= 50) {
    grade = "B";
    result = "passed";
  } 
  else {
    grade = "F";
    result = "failed";
  }

  console.log("Final test graded", {
    student_id,
    test_score,
    attempt_number,
    grade,
    result
  });

  await Course.updateOne(
    { courseCode: courseCode },
    {
      $push: {
        analyticsEvents: {
          student_id,
          event_type: "final_test_graded",
          test_score,
          attempt_number,
          grade,
          result
        }
      }
    }
  );

  return {
    student_id,
    grade,
    result
  };
};