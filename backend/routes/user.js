const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');
const verifyOtp = require('../Controllers/verifyOtp');
const submitUserDetails=require("../Controllers/SubmitUserDetails");
const {createOrUpdateTimetable,updateDaySchedule,getTt}=require('../Controllers/timetable.js')
//const {addTimetable,getTimetable}=require('../Controllers/ExamController.js');

router.post('/welcome', submitUserDetails);
router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/verify-otp',verifyOtp);
router.put('/updateDaySchedule/:semester/:branch/:day',updateDaySchedule);
router.post('/createOrUpdateTimetable',createOrUpdateTimetable);
router.post('/addTimetable', createOrUpdateTimetable);
// router.get('/getTimetable',getTimetable);
router.get('/getTt/:semester/:branch',getTt);



module.exports = router;