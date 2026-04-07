const GradingService = require("../services/GradingServices");
const GamificationService = require("../services/GamificationService");

exports.handleEvent = async (req, res) => {

  try {

    const {event} = req.body;

    switch (event.event_type) {

      case "quiz_completed":

        await GradingService.gradeQuiz(event);
        await GamificationService.processQuiz(event);
        await GamificationService.awardQuizXP(event);

        break;

      case "final_test_submitted":

        await GradingService.gradeFinalTest(event);
        await GamificationService.processFinalTest(event);

        break;

      default:
        return res.status(400).json({
          message: "Unsupported event type"
        });
    }

    res.status(200).json({
      message: "Event processed successfully"
    });

  } catch (error) {

    console.error("Event processing error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

  }

};