const ExamTimetable = require('../models/examSchema');

/* ── Add exam(s) to a timetable (existing, unchanged) ── */
const addTimetable = async (req, res) => {
  try {
    console.log(req.body);
    const { branch, semester, exams } = req.body;

    const existingTimetable = await ExamTimetable.findOne({ branch, semester });

    if (existingTimetable) {
      const existingSubjects = existingTimetable.exams.map(
        exam => exam.subject?.toLowerCase()
      );

      const duplicateExam = exams.find(
        exam => existingSubjects.includes(exam.subject?.toLowerCase())
      );

      if (duplicateExam) {
        return res.status(400).json({
          message: `Subject "${duplicateExam.subject}" is already scheduled for this branch and semester.`,
        });
      }

      existingTimetable.exams.push(...exams);
      await existingTimetable.save();

      return res.status(200).json({
        message: 'New exams added to existing timetable!',
        timetable: existingTimetable,
      });
    }

    const newTimetable = new ExamTimetable({ branch, semester, exams });
    await newTimetable.save();

    res.status(201).json({
      message: 'Timetable created successfully!',
      timetable: newTimetable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding timetable',
      error: error.message
    });
  }
};

/* ── Get timetable (existing, unchanged) ── */
const getTimetable = async (req, res) => {
  try {
    const { branch, semester } = req.query;

    const timetable = await ExamTimetable.findOne({ branch, semester });
    if (!timetable) {
      return res.status(404).json({ message: 'No timetable found for this branch and semester.' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable', error: error.message });
  }
};

/* ── NEW: Update a single exam inside a timetable ── */
const updateExam = async (req, res) => {
  try {
    const { branch, semester, examId } = req.params;
    const { subject, date, startTime, endTime } = req.body;

    const timetable = await ExamTimetable.findOne({ branch, semester });
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found.' });
    }

    const exam = timetable.exams.id(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found in this timetable.' });
    }

    // Prevent duplicate subject (excluding the exam being edited)
    const duplicate = timetable.exams.find(
      (e) => e._id.toString() !== examId && e.subject?.toLowerCase() === subject?.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({ message: `Subject "${subject}" is already scheduled.` });
    }

    // Validate start/end time if both provided
    if (startTime && endTime && startTime >= endTime) {
      return res.status(400).json({ message: 'Start time must be before end time.' });
    }

    if (subject !== undefined) exam.subject = subject;
    if (date !== undefined) exam.date = date;
    if (startTime !== undefined) exam.startTime = startTime;
    if (endTime !== undefined) exam.endTime = endTime;

    await timetable.save();

    res.status(200).json({ message: 'Exam updated successfully!', timetable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating exam', error: error.message });
  }
};

/* ── NEW: Delete a single exam from a timetable ── */
const deleteExam = async (req, res) => {
  try {
    const { branch, semester, examId } = req.params;

    const timetable = await ExamTimetable.findOne({ branch, semester });
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found.' });
    }

    const exam = timetable.exams.id(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found in this timetable.' });
    }

    exam.deleteOne(); // removes subdocument from the array
    await timetable.save();

    res.status(200).json({ message: 'Exam deleted successfully!', timetable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting exam', error: error.message });
  }
};

module.exports = { addTimetable, getTimetable, updateExam, deleteExam };