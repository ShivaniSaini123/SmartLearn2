const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const timetableSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  monday: [subjectSchema],
  tuesday: [subjectSchema],
  wednesday: [subjectSchema],
  thursday: [subjectSchema],
  friday: [subjectSchema],
  saturday: [subjectSchema],
  sunday: [subjectSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
