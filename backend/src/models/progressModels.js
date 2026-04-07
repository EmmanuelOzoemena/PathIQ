
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    lastAccessedTopic: { 
        type: String, 
    }, 
    currentTopicIndex: {
        type: Number,
        default: 0
    },
    completionPercentage: { 
        type: Number, 
        default: 0 
    },
    isCompleted: { 
        type: Boolean, 
        default: false
    },
    completedTopics: [{ 
        type: String 
    }],
    completedAt: { 
        type: Date 
    },
    lastActive: { 
        type: Date, 
        default: Date.now 
    },
    streak_length: {
        type: Number,
        default: 0
    }
}, 

{   timestamps: true,
    versionKey: false
});

const Progress = mongoose.model('Progress', progressSchema);


module.exports = Progress;