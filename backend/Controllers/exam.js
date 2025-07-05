const ExamTimetable = require('../models/examSchema');


const addTimetable = async (req, res) => {
  try {
    const { branch, semester, exams } = req.body;

    // Step 1: Check if timetable exists
    const existingTimetable = await ExamTimetable.findOne({ branch, semester });

    if (existingTimetable) {
      // Step 2: Get existing subjects
      const existingSubjects = existingTimetable.exams.map(exam => exam.subject.toLowerCase());

      // Step 3: Check if any subject is already scheduled
      const duplicateExam = exams.find(
        exam => existingSubjects.includes(exam.subject.toLowerCase())
      );

      if (duplicateExam) {
        return res.status(400).json({
          message: `Subject "${duplicateExam.subject}" is already scheduled for this branch and semester.`,
        });
      }

      // Step 4: Add new exams to existing timetable
      existingTimetable.exams.push(...exams);
      await existingTimetable.save();

      return res.status(200).json({
        message: 'New exams added to existing timetable!',
        timetable: existingTimetable,
      });
    }

    // Step 5: If no timetable exists, create a new one
    const newTimetable = new ExamTimetable({ branch, semester, exams });
    await newTimetable.save();

    res.status(201).json({
      message: 'Timetable created successfully!',
      timetable: newTimetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding timetable', error: error.message });
  }
};

// Controller to get timetable based on branch and semester
const getTimetable = async (req, res) => {
  try {
    const { branch, semester } = req.query;

    // Fetch the timetable for the specified branch and semester
    const timetable = await ExamTimetable.findOne({ branch, semester });
    if (!timetable) {
      return res.status(404).json({ message: 'No timetable found for this branch and semester.' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable', error: error.message });
  }
};

module.exports = { addTimetable, getTimetable };