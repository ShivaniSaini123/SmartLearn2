// models/ChallengeAttempt.js
const mongoose = require("mongoose");

const challengeAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  date: { type: String, required: true },         // "YYYY-MM-DD"
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "DailyChallenge" },
  selectedAnswer: { type: String },
  isCorrect: { type: Boolean },
}, { timestamps: true });

challengeAttemptSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("ChallengeAttempt", challengeAttemptSchema);