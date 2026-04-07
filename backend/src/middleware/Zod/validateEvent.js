const {
  quizCompletedSchema,
  finalTestSchema
} = require("../Zod/validationSchema");

module.exports = (req, res, next) => {
   console.log("Incoming event payload:", req.body);

  const { event_type, student_id } = req.body;

  if (!event_type || !student_id) {
    return res.status(400).json({
      message: "Invalid event payload"
    });
  }

  next();
  const eventType = req.body.event_type;

  try {

    if (eventType === "quiz_completed") {
      quizCompletedSchema.parse(req.body);
    }

    else if (eventType === "final_test_submitted") {
      finalTestSchema.parse(req.body);
    }

    else {
      return res.status(400).json({
        message: "Unsupported event type"
      });
    }

    next();

  } catch (error) {
    return res.status(400).json({
      message: "Invalid event payload",
      error: error.errors
    });
  }
};