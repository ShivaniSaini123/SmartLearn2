const StudyStreak = require("../models/StudyStreak");
const { checkAndAwardBadges } = require("./achievementController");

// IST is UTC+5:30. We compute "today"/"yesterday" in IST so the streak's
// day boundary matches midnight for users in India, instead of UTC midnight
// (which would roll the date over at 5:30 AM IST and cause incorrect streak
// breaks/double-counts for anyone active late at night or just after midnight).
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

const istDateStr = (baseDate) => {
  const istTime = new Date(baseDate.getTime() + IST_OFFSET_MS);
  return istTime.toISOString().split("T")[0];
};

const todayStr = () => istDateStr(new Date());
const yesterdayStr = () => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return istDateStr(d);
};

/* GET /streak/:userId */
exports.getStreak = async (req, res) => {
  try {
    const { userId } = req.params;
    let streak = await StudyStreak.findOne({ userId });
    if (!streak) {
      streak = await StudyStreak.create({ userId, currentStreak: 0, longestStreak: 0, lastActiveDate: null, history: [] });
    }
    res.json(streak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Core streak-update logic, reusable from other controllers (e.g. challengeController
   calls this on a daily-challenge attempt instead of HTTP-pinging this route). */
async function applyStreakPing(userId) {
  const today = todayStr();
  const yesterday = yesterdayStr();

  let streak = await StudyStreak.findOne({ userId });
  if (!streak) {
    streak = new StudyStreak({ userId, currentStreak: 1, longestStreak: 1, lastActiveDate: today, history: [{ date: today, active: true }] });
    await streak.save();
    return streak;
  }

  if (streak.lastActiveDate === today) {
    // already counted today
    return streak;
  }

  if (streak.lastActiveDate === yesterday) {
    streak.currentStreak += 1;
  } else {
    streak.currentStreak = 1; // streak broken, restart
  }

  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  streak.lastActiveDate = today;
  streak.history.push({ date: today, active: true });
  if (streak.history.length > 30) streak.history = streak.history.slice(-30);

  await streak.save();
  await checkAndAwardBadges(userId);
  return streak;
}
exports.applyStreakPing = applyStreakPing;

/* POST /streak/:userId/ping  — kept for now in case other parts of the app call it directly.
   No longer called from the dashboard on page load; daily-challenge attempts drive the streak. */
exports.pingActivity = async (req, res) => {
  try {
    const streak = await applyStreakPing(req.params.userId);
    res.json(streak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};