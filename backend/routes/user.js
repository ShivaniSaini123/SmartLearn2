const express = require('express');
// const multer = require('multer');
// const path = require('path');
const upload = require("../middleware/cloudinaryUpload");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Controllers
const registerUser = require('../Controllers/registerUser');
const loginUser = require('../Controllers/loginUser');
const verifyOtp = require('../Controllers/verifyOtp');
const submitUserDetails = require("../Controllers/SubmitUserDetails");
const getuserProfile = require("../Controllers/userProfile");
const updateUserProfile = require('../Controllers/updateUserProfile');
const { markAttendance, saveOtp, viewAttendance } = require("../Controllers/attendance");
const {addTimetable,getTimetable,updateExam,deleteExam}=require('../Controllers/exam.js');
const { createOrUpdateTimetable, updateDaySchedule, getTt } = require('../Controllers/timetable.js');
const { getAllAssignments } = require('../Controllers/getAllAssignments');
const { addSubmission } = require('../Controllers/addSubmission');
const { submitAssignment } = require('../Controllers/submitAssignment');
const { addAssignmentProff } = require('../Controllers/addAssignmentProff');
const { addSyllabus } = require('../Controllers/addSyllabus');
const syllabusController = require('../Controllers/syllabusController');
const goalController = require('../Controllers/Goals');
const { createMeeting, verifyMeeting } = require('../Controllers/meetingController');
const msgController = require("../Controllers/messageController");
const {
  getUserByEmail,
  getContacts,
  getConnectionRequests,
  sendConnectionRequest,
  acceptConnectionRequest,rejectConnectionRequest, deleteContact
} = require('../Controllers/getUserByEmail');
const logoutUser = require("../Controllers/logoutUser");
const deleteAccount = require("../Controllers/deleteAccount");
const aiController = require("../Controllers/aiController");
const streakController = require('../Controllers/streakController');
const achievementController = require('../Controllers/achievementController');
const challengeController = require('../Controllers/challengeController');
const healthScoreController = require('../Controllers/healthScoreController');
 

//---------------------------- AUTH ROUTES ----------------------------//
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.post('/welcome', submitUserDetails);

//---------------------------- PROFILE ROUTES ----------------------------//
router.get('/profile/:email', getuserProfile);
router.put('/updateprofile/:email', updateUserProfile);

//---------------------------- ATTENDANCE ROUTES ----------------------------//
router.post('/attendance', saveOtp);
router.post('/mark', markAttendance);
router.post('/view-attendance', viewAttendance);

//---------------------------- TIMETABLE & EXAM ROUTES ----------------------------//
router.post('/createOrUpdateTimetable', createOrUpdateTimetable);
router.put('/updateDaySchedule/:semester/:branch/:day', updateDaySchedule);
router.post('/addTimetable', addTimetable);
router.get('/getTimetable', getTimetable);
router.get('/getTt/:semester/:branch', getTt);
router.put('/updateExam/:branch/:semester/:examId', updateExam);
router.delete('/deleteExam/:branch/:semester/:examId', deleteExam);

//---------------------------- SYLLABUS ROUTES ----------------------------//
router.post('/syllabus', addSyllabus);
router.use('/api', syllabusController);


//---------------------------- ASSIGNMENTS ROUTES ----------------------------//
router.get('/assignments', getAllAssignments);
router.post('/assignment', addSubmission);
router.post('/submit', submitAssignment);
// router.post('/addAssignmentProff', addAssignmentProff);
router.post(
  '/addAssignmentProff',
  upload.array('attachments', 5),
  addAssignmentProff
);
//---------------------------- GOALS ROUTES ----------------------------//
router.post('/goals', goalController.createGoal);
router.get('/goals/:userId', goalController.getGoalsByUser);
router.put('/goals/:id', goalController.updateGoal);
router.delete('/goals/:id', goalController.deleteGoal);
router.patch('/goals/:id/toggle', goalController.toggleGoal);

//---------------------------- MEETING ROUTES ----------------------------//
router.post('/meeting/create', createMeeting);
router.post('/meeting/verify', verifyMeeting);
router.get("/meeting/:linkId", async (req, res) => {
  const { linkId } = req.params;
  try {
    const meeting = await Meeting.findOne({ linkId });
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.json({ meeting });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//---------------------------- CONNECTION & CONTACT ROUTES ----------------------------//
router.get('/users/:email/contacts', getContacts);
router.get('/users/:email/connection-requests', getConnectionRequests);
router.post('/users/:email/connection-requests', sendConnectionRequest);
router.post("/users/:email/connection-requests/:requesterEmail/accept", acceptConnectionRequest);
router.delete("/users/:email/connection-requests/:requesterEmail/reject", rejectConnectionRequest);
router.delete("/users/:email/contacts/:contactEmail", deleteContact);
router.get('/users/search', getUserByEmail);

//---------------------------- CHAT & MESSAGES ROUTES ----------------------------//
router.get("/messages/:user1/:user2", msgController.getMessagesBetweenUsers);
router.delete("/messages/delete/:messageId", msgController.deleteMessageController);
router.post("/send", async (req, res) => {
  try {
    const { sender, recipient, content, type, timestamp, recipientOnline } = req.body;
    const msgData = {
      from: sender.trim().toLowerCase(),
      to: recipient.trim().toLowerCase(),
      content, type, timestamp,
    };
    await msgController.saveMessage(msgData, recipientOnline);
    if (recipientOnline) await msgController.markMessagesDelivered(recipient, sender);
    res.status(200).json({ success: true, message: "Message saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});
router.post(
  "/send-file",
  upload.single("file"),
  async (req, res) => {
    try {
      const {
        sender,
        recipient,
        type,
        timestamp,
        recipientOnline,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const msgData = {
        from: sender.trim().toLowerCase(),
        to: recipient.trim().toLowerCase(),

        // Cloudinary URL
        content: req.file.path,

        type: type || "file",
        timestamp: timestamp || new Date(),
      };

      const savedMessage = await msgController.saveMessage(
        msgData,
        recipientOnline,
        req.app.get("io")
      );

      if (recipientOnline) {
        await msgController.markMessagesDelivered(recipient, sender);
      }

      res.status(200).json({
        success: true,
        message: "File sent successfully",
        data: savedMessage,
      });

    } catch (err) {
      console.error("File upload error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to send file",
      });
    }
  }
);
router.post("/mark-delivered", async (req, res) => {
  const { user1, user2 } = req.body;
  await msgController.markMessagesDelivered(user1, user2);
  res.status(200).json({ success: true });
});
router.post("/messages/mark-read", async (req, res) => {
  const { user1, user2 } = req.body;
  await msgController.markMessagesRead(user1, user2);
  res.status(200).json({ success: true });
});
router.get("/unread-senders/:userId", async (req, res) => {
  const data = await msgController.getUnreadCountsPerSender(req.params.userId);
  res.status(200).json({ unreadCounts: data });
});
router.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  next();
});
// ------------------ LOGOUT & DELETE ------------------ //

router.post("/logout", logoutUser);
// routes/user.js (replace current line)
router.delete("/delete-account", deleteAccount);


//---------------------------- AI ROUTES ----------------------------//
router.post(
  "/ai/chat",
  aiController.chat
);

// ---------------------------- STUDY STREAK ROUTES ---------------------------- //
router.get('/streak/:userId', streakController.getStreak);
router.post('/streak/:userId/ping', streakController.pingActivity);
 
// ---------------------------- ACHIEVEMENTS ROUTES ---------------------------- //
router.get('/achievements/:userId', achievementController.getAchievements);
 
// ---------------------------- DAILY CHALLENGE ROUTES ---------------------------- //
router.get('/challenge/today', challengeController.getTodayChallenge);
router.post('/challenge/:userId/attempt', challengeController.submitAttempt);
router.get('/challenge/:userId/attempt-today', challengeController.getTodayAttempt);
 
// ---------------------------- ACADEMIC HEALTH SCORE ROUTE ---------------------------- //
router.get('/health-score/:userId', healthScoreController.getHealthScore);
 

module.exports = router;
