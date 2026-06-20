// models/StudyStreak.js
const mongoose = require("mongoose");

const studyStreakSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: String, default: null }, // "YYYY-MM-DD"
  history: [{ date: String, active: Boolean }],     // last 30 days log
}, { timestamps: true });

module.exports = mongoose.model("StudyStreak", studyStreakSchema);