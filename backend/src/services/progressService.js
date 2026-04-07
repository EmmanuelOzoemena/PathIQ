const Student = require('../models/studentModels');
const Course = require('../models/courseModels');
const Guardian = require('../models/guardianModels');
const Progress = require('../models/progressModels'); 
const ApiError = require('../middleware/apiError');
const { sendReEngagementEmail } = require('../email/emailService');


class progressService {
    // Initialize progress when they enroll
    async startCourse(studentId, courseId) {
        if (!studentId || !courseId) {
            throw new ApiError(400, "Student ID and Course ID are required");
        }
        const student = await Student.findById(studentId)
        const course = await Course.findById(courseId)
        if (!course || !student) {
            throw new ApiError (404, "No record of this student or course was found")
        }
        if  (!student.enrolledCourses.includes(courseId) || !course.enrolledStudent.includes(studentId)) {
            throw new ApiError(403, "Access denied: Student not enrolled in this course. Enrollment required to start course");
        }
        const existing = await Progress.findOne({ studentId, courseId });
        if (existing) return existing;

        return await Progress.create({
            studentId,
            courseId,
            currentTopicIndex: 0,
            completionPercentage: 0
        });
    }

    // Update progress when a topic is finished
    async updateTopicProgress(studentId, courseId, topicIndex) {
        if (!studentId) {
            throw new ApiError (400, "Student ID is required to update progress");
        }
        console.log("Updating progress for student:", studentId, "Course:", courseId, "Topic Index:", topicIndex);
        const progress = await Progress.findOne({ studentId, courseId });
        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);

        if  (!student.enrolledCourses.includes(courseId) || !course.enrolledStudent.includes(studentId)) {
            throw new ApiError(403, "Access denied: Cannot update progress. Please enroll first.");
        }

        if (!progress || !course) throw new ApiError(404, "Progress record not found");

        // Update to the next topic
        progress.currentTopicIndex = topicIndex;
        
        // Calculate Percentage: (Current Topic / Total Topics) * 100
        const total = course.topics.length;
        progress.completionPercentage = Math.round(((topicIndex + 1) / total) * 100);

        if (progress.completionPercentage >= 100) {
            progress.isCompleted = true;
            progress.completedAt = new Date();
        }

        progress.lastActive = new Date();
        progress.completedTopics = progress.currentTopicIndex >= 0 ? course.topics.slice(0, progress.currentTopicIndex + 1).map(t => t.title) : [];
        await progress.save();
        const result = await Progress.findById(progress._id).select('-lastAccessedTopic')
        return result;
    }


async checkStudentProgress(studentId, courseId, guardianId, role) {
    if (role === 'guardian') {
        const guardian = await Guardian.findById(guardianId);
        
        if (!guardian) throw new ApiError(404, "Guardian not found");

        // Use 'sId' for the loop to avoid overwriting the 'courseId'
        const isLinked = guardian.linkedStudent.some(
            (sId) => sId && sId.toString() === studentId.toString()
        );
        
        if (!isLinked) {
            throw new ApiError(403, "Access denied: not linked to this student");
        }  
    } 
    // Find progress specifically for THIS student and THIS course
    const progress = await Progress.findOne({ studentId, courseId });
    console.log("Progress record found:", studentId, courseId);
    if (!progress) {
        throw new ApiError(404, "No progress record found for this student.");
    }; 
    const course = await Course.findById(courseId);
    console.log("Course ID being searched:", courseId);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    // Logic for topics
    progress.lastAccessedTopic = progress.currentTopicIndex >= 0 
        ? course.topics[progress.currentTopicIndex]?.title 
        : "Not started";

    progress.completedTopics = progress.currentTopicIndex >= 0 
        ? course.topics.slice(0, progress.currentTopicIndex + 1).map(t => t.title) 
        : [];

    await progress.save();
    return progress;
}

async getAllProgress(role) {
    if (role !== 'admin') {
        throw new ApiError(403, "Access denied: Admins only");
    }   
    const allProgress = await Progress.find().populate('studentId', 'name email').populate('courseId', 'courseTitle');
    return allProgress;
}

    async checkAndSendReminders(role) {
        if (role !== 'admin') {
            throw new ApiError(403, "Access denied: Admins only");
        }
        const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

        // Find progress records that haven't been touched in 14 days and aren't 100% complete
        const inactiveProgress = await Progress.find({
            lastActive: { $lt: fourteenDaysAgo },
            completionPercentage: { $lt: 100 }
        }).populate('studentId courseId');

        for (const record of inactiveProgress) {
            const { studentId, courseId, lastAccessedTopic } = record;

            // Send the email using the topic name we stored
            // sendReEngagementEmail(
            //     studentId.email, 
            //     studentId.name, 
            //     lastAccessedTopic,
            //     courseId.courseTitle, 
            // );

            console.log(`Reminder sent to ${studentId.email} for ${lastAccessedTopic}`);
        }
    }
}

module.exports =  progressService;