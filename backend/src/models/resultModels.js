const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    quizScores: [
        {
            topicId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course.topics',
            },
            topicName: {
                type: String
            },
            score: {
                type: Number,
                default: 0
            },
            correctAnswers: {
                type: Number,
                default: 0
            }
        }
    ],
    
    testScore: {
        type: Number,
        default: 0
    },
    weightedTestScore: {
        type: Number,
        default: 0
    },
    overallTotalScore: {
        type: Number,
        default: 0
    },
    isPassed: {
        type: Boolean,
        default: false
    },
    isCertified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);


module.exports = Result;