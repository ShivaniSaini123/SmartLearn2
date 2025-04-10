const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express'); // Import multer for file uploads
const path = require('path');

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
router.get('/profile/:email', userProfile);
router.post('/addAssignmentProff', addAssignmentProff);
router.post('/syllabus',addSyllabus);
router.use('/api', syllabusController);
module.exports = router;
