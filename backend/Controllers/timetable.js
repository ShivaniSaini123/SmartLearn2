const Timetable = require('../models/TimeTableSchema');

exports.createOrUpdateTimetable = async (req, res) => {
  try {
    const { semester, branch, schedule } = req.body;
    let timetable = await Timetable.findOne({ semester, branch });

    if (timetable) {
      timetable.schedule = schedule;
      await timetable.save();
      res.status(200).json({ message: 'Timetable updated successfully', timetable });
    } else {
      timetable = new Timetable({ semester, branch, ...schedule });
      await timetable.save();
      res.status(201).json({ message: 'Timetable created successfully', timetable });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateDaySchedule = async (req, res) => {
  try {
    const { semester, branch, day } = req.params;
    const { subjects } = req.body;
    const timetable = await Timetable.findOne({ semester, branch });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    timetable[day] = subjects;
    await timetable.save();

    res.status(200).json({ message: `${day} schedule updated successfully`, timetable });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTt = async (req, res) => {
  try {
    const { semester, branch } = req.params;
    const timetable = await Timetable.findOne({ semester, branch });

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found for the specified semester and branch" });
    }

    return res.status(200).json(timetable);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching the timetable" });
  }
};
