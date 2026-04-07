
const progressService = require('../services/progressService');
const ApiError  = require("../middleware/apiError");
const  apiResponse = require("../middleware/apiResponse");

const Progress = new progressService();


const startCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;
        const result = await Progress.startCourse(studentId, courseId);
        apiResponse(res, 201, result, "Course started and progress initialized");
    } catch (err) {
        next(err);
    }
};


const updateTopicProgress = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { topicIndex } = req.body;
        const studentId = req.user.id;
        const result = await Progress.updateTopicProgress(studentId, courseId, topicIndex);
        apiResponse(res, 200, result, "Progress updated successfully");
    } catch (err) {
        next(err);
    }
};

const checkStudentProgress = async (req, res, next) => {
    try {
        const role = req.user.role;
        const { studentId, courseId} = req.params;
        const guardianId = req.user.id
        const result = await Progress.checkStudentProgress(studentId, courseId, guardianId, role);
        apiResponse(res, 200, result, "Student progress retrieved successfully");
    } catch (err) {
        next(err);
    } 
};

const checkAllProgress = async (req, res, next) => {
    try {
        const role = req.user.role;
        const result = await Progress.getAllProgress(role);
        apiResponse(res, 200, result, "All progress retrieved successfully");
    } catch (err) {
        next(err);
    }
};


const triggerReminders = async (req, res, next) => {
    try {
        const role = req.user.role;
        await Progress.checkAndSendReminders(role);
        apiResponse(res, 200, null, "Re-engagement reminders triggered successfully");
    } catch (err) {
        next(err);
    }
};


module.exports = {
    startCourse,
    updateTopicProgress,
    checkStudentProgress,
    checkAllProgress,
    triggerReminders
};

