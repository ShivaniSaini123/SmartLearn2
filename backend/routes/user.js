const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express'); // Import multer for file uploads
const path = require('path');

// const { saveOtp, markAttendance } = require("../Controllers/attendance");
const { markAttendance, saveOtp, viewAttendance } = require("../Controllers/attendance");
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser = require('../Controllers/loginUser');
const verifyOtp = require('../Controllers/verifyOtp');
const submitUserDetails = require("../Controllers/SubmitUserDetails");
const { createOrUpdateTimetable, updateDaySchedule, getTt } = require('../Controllers/timetable.js');
const {addTimetable,getTimetable}=require('../Controllers/exam.js');
const userProfile = require("../Controllers/userProfile");
// const { addAssignment } = require('../Controllers/addAssignment');
const {addSubmission}=require('../Controllers/addSubmission.js')
const { submitAssignment } = require('../Controllers/submitAssignment.js');
const { addAssignmentProff } = require('../Controllers/addAssignmentProff.js');
const {addSyllabus}=require('../Controllers/addSyllabus');
const syllabusController = require('../Controllers/syllabusController');
const goalController = require('../Controllers/Goals');
const updateUserProfile = require('../Controllers/updateUserProfile');
const { createMeeting, verifyMeeting } =require('../Controllers/meetingController');
// user.js
router.post('/meeting/create', createMeeting);
router.post('/meeting/verify', verifyMeeting);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/assignments/'); // Store files in 'uploads/assignments'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

router.post('/welcome', submitUserDetails);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.post('/createOrUpdateTimetable', createOrUpdateTimetable);
router.put('/updateDaySchedule/:semester/:branch/:day', updateDaySchedule);
router.post('/addTimetable',addTimetable);
router.get('/getTimetable',getTimetable);
router.get('/getTt/:semester/:branch', getTt);
const { getAllAssignments } = require('../Controllers/getAllAssignments');
router.get('/assignments', getAllAssignments);
router.post('/assignment',addSubmission)
router.post('/submit', submitAssignment);
router.put('/updateprofile/:email', updateUserProfile);
router.get('/profile/:email', userProfile);
router.post('/addAssignmentProff', addAssignmentProff);
router.post('/syllabus',addSyllabus);
router.use('/api', syllabusController);
router.post('/attendance', saveOtp);
router.post('/mark', markAttendance);
router.post('/view-attendance', viewAttendance);

router.post('/goals', goalController.createGoal);
router.get('/goals/:userId', goalController.getGoalsByUser);
router.put('/goals/:id', goalController.updateGoal);
router.delete('/goals/:id', goalController.deleteGoal);
// Example Express route handler
router.get("/api/v1/meeting/:linkId", async (req, res) => {
  const { linkId } = req.params;
  try {
    const meeting = await Meeting.findOne({ linkId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json({ meeting });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
