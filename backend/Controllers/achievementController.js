const Achievement = require("../models/Achievement");
const StudyStreak = require("../models/StudyStreak");
const Goal = require("../models/GoalSchema");

const BADGE_DEFINITIONS = [
  { key: "streak_5",     title: "5-day Study Streak",     icon: "🔥", check: (ctx) => ctx.streak.currentStreak >= 5 },
  { key: "streak_15",    title: "15-day Study Streak",    icon: "🔥", check: (ctx) => ctx.streak.currentStreak >= 15 },
  { key: "goals_50",     title: "Completed 50 Goals",     icon: "🏆", check: (ctx) => ctx.goalsCompletedTotal >= 50 },
  { key: "goals_90pct",  title: "90% Goal Completion",    icon: "🎯", check: (ctx) => ctx.goalCompletionPct >= 90 },
];

/* Core badge-check logic, reusable from other controllers (goal toggle,
   challenge attempt, streak ping). Looks at the user's current stats and
   awards any badge whose criteria is now met. Returns the list of badges
   newly awarded in THIS call (empty array if none). */
async function checkAndAwardBadges(userId) {
  const streak = await StudyStreak.findOne({ userId }) || { currentStreak: 0 };
  const allGoals = await Goal.find({ userId });
  const goalsCompletedTotal = allGoals.filter(g => g.completed).length;
  const goalCompletionPct = allGoals.length ? Math.round((goalsCompletedTotal / allGoals.length) * 100) : 0;

  const ctx = { streak, goalsCompletedTotal, goalCompletionPct };

  const newlyAwarded = [];
  for (const badge of BADGE_DEFINITIONS) {
    if (badge.check(ctx)) {
      const existing = await Achievement.findOne({ userId, badgeKey: badge.key });
      if (!existing) {
        const created = await Achievement.create({
          userId, badgeKey: badge.key, title: badge.title, icon: badge.icon,
        });
        newlyAwarded.push(created);
      }
    }
  }
  return newlyAwarded;
}
exports.checkAndAwardBadges = checkAndAwardBadges;

/* GET /achievements/:userId — checks for newly earned badges, then returns all earned badges */
exports.getAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    await checkAndAwardBadges(userId);
    const earned = await Achievement.find({ userId }).sort({ earnedAt: -1 });
    res.json(earned);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};