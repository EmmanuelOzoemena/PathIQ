const Course = require("../models/courseModels");
const Student = require("../models/studentModels");
const Result = require("../models/resultModels")
const ApiError = require("../middleware/apiError");
const TokenService = require("../utils/tokens");
const AuthTokens = require("../utils/hash");
const { quizScoreSchema } = require("../middleware/Zod/validationSchema");


const newToken = TokenService
const hash = AuthTokens


class courseServiceActivities {

    async createCourse(courseData, role) {
        if (role !== 'admin') {
            throw new ApiError(403, "Access denied: Admins only");
        }

        const { courseTitle, courseCode } = courseData;
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            throw new ApiError(409, "Course code already exists");
        };
        const newCourse = await Course.create({
            courseTitle,
            courseCode
        });
        return newCourse;
    }

    async findCourse(id, role) {
        if (role === 'guardian') {
            throw new ApiError(403, "Access denied: Guardians cannot access course ");
        }
        const course = await Course.findById(id);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        return course;
    }

    async findAllCourses(role) {
        if (role === 'guardian') {
            throw new ApiError(403, "Access denied: Guardians cannot access course list");
        }
        const courses = await Course.find().select("-__v");
        return courses;
    }

    async findTopic(courseId, role) {
        if (role === 'guardian') {
            throw new ApiError(403, "Access denied: Guardians cannot access course topics");
        }
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        return course.topics;
    }


    // Logic to enroll a student in a course
    async enrollStudent(id, studentId, role) {
        if (role !== 'admin') {
            throw new ApiError(403, "Access denied: Admins only");
        }
        if (!studentId) {
            throw new ApiError(400, "Enrollment failed: No student ID provided.");
        }
        const student = await Student.findById(studentId)
        const course = await Course.findById(id);
        if (!course || !student) throw new ApiError(404, "Course or Student not found");

        // Check if already enrolled to prevent duplicates
        if (course.enrolledStudent.includes(studentId)) {
            throw new ApiError(400, "Student already enrolled in this course");
        }
        course.enrolledStudent.push(studentId);
        await course.save();
        return course;
    }

    async addTopicToCourse(courseId, topicData, role) {
        if (role !== 'admin') {
            throw new ApiError(403, "Access denied: Admins only");
        }
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        const existingTopic = course.topics.find(t => t.title === topicData.title);
        if (existingTopic) {
            throw new ApiError(409, "Topic with this title already exists in the course");
        }
        course.topics.push(topicData);
        await course.save();
        return course;
    }


    async addQuizScore(courseId, studentId, topicId, quizData, role) {

        if (role !== 'admin') throw new ApiError(403, "Access denied");

        // Validate the Topic exists within the specific Course
        const course = await Course.findOne({
            _id: courseId,
            "topics._id": topicId
        }, { "topics.$": 1 }); // Uses projection to only return the matching topic

        if (!course) {
            throw new ApiError(404, "Topic not found in this course");
        }

        const matchedTopic = course.topics[0];
        const { score } = quizData;

        // Update Result: Try to push to an existing topic entry in the results array
        let result = await Result.findOneAndUpdate(
            {
                courseId,
                studentId,
                "quizScores.topicId": topicId
            },
            {
                $set: { "quizScores.$.score": score }
            },
            { new: true }
        );

        // 4. If no result entry exists for this topic yet, create the entry
        if (!result) {
            result = await Result.findOneAndUpdate(
                { courseId, studentId },
                {
                    $push: {
                        quizScores: {
                            topicId: matchedTopic._id,
                            topicName: matchedTopic.title, // Pulling name from Course source of truth
                            score: score
                        }
                    }
                },
                { new: true, upsert: true }
            );
        }

        return result;
    }

    async addTestScore(courseId, studentId, role, testData) {
        if (role !== 'admin') throw new ApiError(403, "Access denied");

        // 1. Validate the Topic exists within the specific Course
        const course = await Course.findOne({
            _id: courseId,
        });

        if (!course) {
            throw new ApiError(404, "Course not found for this student");
        }

        const { testScore } = testData;

        let result = await Result.findOneAndUpdate(
            {
                courseId,
                studentId,
            },
            {
                $set: { testScore: testData.testScore }
            },
            { new: true }
        );


        return result;

    }


    async addQuizQuestions(courseId, topicId, questionData, role) {
        if (role !== 'admin') throw new ApiError(403, "Access denied");

        // 1. Fetch the course to check existing data
        const course = await Course.findById(courseId);
        if (!course) throw new ApiError(404, "Course not found");

        // 2. Find the specific topic entry in the quizQuestions array
        const topicEntry = course.quizQuestions.find(q => q.topicId.toString() === topicId);

        if (topicEntry) {
            // --- DUPLICATE CHECK ---
            const isDuplicate = topicEntry.questions.some(
                q => q.questionText.trim().toLowerCase() === questionData.questionText.trim().toLowerCase()
            );
            if (isDuplicate) {
                throw new ApiError(400, "This question already exists for this topic");
            }

            // --- LIMIT CHECK ---
            if (topicEntry.questions.length >= 5) {
                throw new ApiError(400, "Maximum of 5 questions reached for this topic");
            }
        }

        const newQuestion = {
            questionText: questionData.questionText,
            options: questionData.options,
            correctOption: questionData.correctOption
        };

        // 3. Try to push to an existing topic entry
        let result = await Course.findOneAndUpdate(
            { _id: courseId, "quizQuestions.topicId": topicId },
            { $push: { "quizQuestions.$.questions": newQuestion } },
            { new: true, runValidators: false }
        );

        // 4. If the topic entry didn't exist yet, create it
        if (!result) {
            result = await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        quizQuestions: { topicId, questions: [newQuestion] }
                    }
                },
                { new: true, runValidators: false }
            );
        }

        return result;
    }

    async addTestQuestions(courseId, testQuestionData, role) {
        if (role !== 'admin') { throw new ApiError(403, "Access denied") };

        // Defensive check for input data (The "Undefined" Fix)
        if (!testQuestionData || !testQuestionData.questionText) {
            throw new ApiError(400, "Question text is required");
        }


        //  Fetch course
        const course = await Course.findById(courseId);
        if (!course) throw new ApiError(404, "Course not found");

        // --- DUPLICATE CHECK ---
        if (course.testQuestions.some(q => q.questionText === testQuestionData.questionText)) {
            throw new ApiError(400, "This question already exists in the test");
        }

        // --- LIMIT CHECK ---
        if (course.testQuestions.length >= 25) {
            throw new ApiError(400, "Maximum of 25 questions reached for this test");
        }

        const newTestQuestion = {
            questionText: testQuestionData.questionText,
            options: testQuestionData.options,
            correctOption: testQuestionData.correctOption
        };


        course.testQuestions.push(newTestQuestion);
        await course.save();


        return course;
    }

    async getQuizQuestions(courseId, topicId, role) {
        if (role === 'guardian') throw new ApiError(403, "Access denied");

        const course = await Course.findById(courseId);
        if (!course) throw new ApiError(404, "Course not found");

        // Find by topicId since that is your primary identifier for quizzes
        const quiz = course.quizQuestions.find(q => q.topicId.toString() === topicId);
        if (!quiz) throw new ApiError(404, "Quiz not found for this topic");

        return quiz;
    }

    async getTestQuestions(courseId, role) {
        if (role === 'guardian') throw new ApiError(403, "Access denied");

        const course = await Course.findById(courseId);
        if (!course) throw new ApiError(404, "Course not found");

        return course.testQuestions;
    }


    async submitQuizAnswers(courseId, topicId, role, submittedAnswers, studentId) {
        // Role Authorization
        if (role !== 'student') {
            throw new ApiError(403, "Access denied: only students can submit quiz answers");
        }

        // Fetch Course and find the specific Quiz
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }

        const quiz = course.quizQuestions.find(q => q.topicId.toString() === topicId);
        if (!quiz) {
            throw new ApiError(404, "Quiz not found");
        }

        // Calculation Logic
        let correctCount = 0;
        const totalQuestions = 5;
        const marksPerQuestion = 2;

        // iterate through the quiz questions stored in the DB
        const results = quiz.questions.map((question, index) => {
            // Find the user's answer for this specific question ID
            const userChoice = submittedAnswers.find(ans => ans.questionId === question._id.toString());

            const isCorrect = userChoice && userChoice.selectedOption === question.correctOption;

            if (isCorrect) {
                correctCount++;
            }

            return {
                questionId: question._id,
                isCorrect: !!isCorrect
            };
        });

        const finalScore = correctCount * marksPerQuestion;

        //Fetch the existing result first to check the length
        const existingResult = await Result.findOne({ courseId, studentId });

        // Perform the limit check
        // If the result exists and the quizScores array is already at 5 (index 0,1,2,3,4)
        if (existingResult && existingResult.quizScores.length >= 4) {
            throw new ApiError(400, "Cannot add score: quiz scores already complete for this course (limit of 4 reached)");
        }

        // Update the Result document for this student and course with the quiz score
        const addtoResult = await Result.findOneAndUpdate(
            {
                courseId,
                studentId, // Assuming all answers belong to the same student
            },
            {
                $push: {
                    quizScores: {
                        topicId: quiz.topicId,
                        topicName: course.topics.find(t => t._id.toString() === quiz.topicId.toString())?.title || "Unknown Topic",
                        score: finalScore,
                        correctAnswers: correctCount
                    }
                }
            },
            { new: true }
        );

        console.log("Updated Result after quiz submission:", addtoResult);


        // 4. Return results 
        return {
            message: "Quiz answers submitted successfully",
            score: finalScore,           // Out of 10
            correctAnswers: correctCount, // Out of 5
            breakdown: results
        };
    }

    async submitTestAnswers(courseId, role, submittedAnswers, studentId) {
        if (role !== 'student') {
            throw new ApiError(403, "Access denied: only students can submit test answers");
        }
        
        // Fetch Course and find the specific Quiz
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }

        // Calculation Logic
        let correctCount = 0;
        const totalQuestions = 25;
        const marksPerQuestion = 4;

        // iterate through the quiz questions stored in the DB 
        const results = course.testQuestions.map((question, index) => {
            // Find the user's answer for this specific question ID
            const userChoice = submittedAnswers.find(ans => ans.questionId === question._id.toString());

            const isCorrect = userChoice && userChoice.selectedOption === question.correctOption;

            if (isCorrect) {
                correctCount++;
            }

            return {
                questionId: question._id,
                isCorrect: !!isCorrect
            };
        });

        const finalScore = correctCount * marksPerQuestion;


        // Update the Result document for this student and course with the test score
        const addtoResult = await Result.findOneAndUpdate(
            {
                courseId,
                studentId, // Assuming all answers belong to the same student
            },
            {
                $set: {
                    testScore: finalScore
                }
            },
            { new: true }
        );

        console.log("Updated Result after test submission:", addtoResult);


        // 4. Return results 
        return {
            message: "Test answers submitted successfully",
            score: finalScore,           // Out of 100
            correctAnswers: correctCount, // Out of 25
            breakdown: results
        };
    }

    async getTopicContent(courseId, topicId, role) {
        if (role === 'guardian') {
            throw new ApiError(403, "Access denied: Guardians cannot access course content");
        }
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        const topic = course.topics.find(t => t._id.toString() === topicId.toString());
        if (!topic) {
            throw new ApiError(404, "Topic not found");
        }
        return topic;
    }

}

module.exports = courseServiceActivities

