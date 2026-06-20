// models/DailyChallenge.js
const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true, index: true }, // "YYYY-MM-DD"
  category: { type: String, enum: ["aptitude", "dsa", "subject"], default: "dsa" },
  question: { type: String, required: true },
  options: [{ type: String }],       // for MCQ
  correctAnswer: { type: String },   // matches one of options, or short text answer
  explanation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);