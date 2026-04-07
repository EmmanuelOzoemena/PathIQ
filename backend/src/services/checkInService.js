const Student = require ("../models/studentModels");

class checkInService {

  async handleDailyCheckIn(studentId) {
    const student = await Student.findById(studentId);
    if (!student) throw new Error("Student not found");

    const now = new Date();
    const lastCheckIn = student.streak.lastCheckIn;

    // If no previous check-in, start the streak at 1
    if (!lastCheckIn) {
      student.streak.count = 1;
    } else {
      // Calculate the difference in hours
      const diffInMs = now - lastCheckIn;
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours < 24) {
        // Scenario A: Less than 24 hours? Do nothing
        return student;
      } else if (diffInHours >= 24 && diffInHours <= 48) {
        // Scenario B: Between 24 and 48 hours? Streak continues!
        student.streak.count += 1;
      } else {
        // Scenario C: More than 48 hours? They missed a day. Reset to 1.
        student.streak.count = 1;
      }
    }

    // Logic for Gamification Tiers
    if (student.streak.count >= 1) student.streak.rewards.hasStreakIcon = true;
    if (student.streak.count >= 7) student.streak.rewards.hasBadgeIcon = true;
    if (student.streak.count >= 30) student.streak.rewards.hasRewardIcon = true;

    //  Update the timestamp to 'now' and save
    student.streak.lastCheckIn = now;
    await student.save();

    return student;
  }
}


module.exports =  new checkInService();