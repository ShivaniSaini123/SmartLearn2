// models/Achievement.js
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  badgeKey: { type: String, required: true },   // e.g. "streak_5", "goals_50"
  title: { type: String, required: true },       // e.g. "5-day Study Streak"
  icon: { type: String, default: "🏅" },
  earnedAt: { type: Date, default: Date.now },
}, { timestamps: true });

achievementSchema.index({ userId: 1, badgeKey: 1 }, { unique: true });

module.exports = mongoose.model("Achievement", achievementSchema);