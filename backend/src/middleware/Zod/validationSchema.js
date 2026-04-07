const { z }  = require ('zod');

const  signupSchema = z.object ({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),

})
const  guardianSignupSchema = z.object ({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    uniqueCode: z.string().optional(),

})

const loginSchema = z.object ({
    email: z.string().email(),
    password: z.string(),

})

const verifyAccountSchema = z.object ({
    email: z.string().email(),
    otp: z.string(),

})

const resendOtpSchema = z.object({
    email: z.string().email(),
})


const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string(),
    newPassword: z.string(),
})

const updateProfileSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
})

const createCourseSchema = z.object({
    courseTitle: z.string(),
    courseCode: z.string(),
})


 const addTopicSchema = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string().optional(),
})


const quizCompletedSchema = z.object({
  event_type: z.literal("quiz_completed"),
  student_id: z.string(),
  score: z.number().int(),
  time_spent: z.number().int(),
  topic_name: z.string()
});

const finalTestSchema = z.object({
  event_type: z.literal("final_test_submitted"),
  student_id: z.string(),
  test_score: z.number().int(),
  attempt_number: z.number().int()
});


const quizScoreSchema = z.object({
    // Max 10 points per topic as per the 40% weight logic
    score: z.number()
      .min(0, "Score cannot be negative")
      .max(10, "Quiz score cannot exceed 10 points")
})

// Schema for the Final Exam
const examSchema = z.object({
    // Max 100 points as per the 60% weight logic
    examScore: z.number()
      .min(0, "Score cannot be negative")
      .max(100, "Final exam score cannot exceed 100 points")
      
  })

module.exports = {
    signupSchema, 
    guardianSignupSchema,
    loginSchema,
    verifyAccountSchema,
    resendOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateProfileSchema,
    createCourseSchema,
    addTopicSchema, 
    quizScoreSchema,
    examSchema,
    quizCompletedSchema,
    finalTestSchema

 }