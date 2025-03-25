const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerUser');
const loginUser=require('../Controllers/loginUser');
const verifyOtp = require('../Controllers/verifyOtp');
const submitUserDetails=require("../Controllers/SubmitUserDetails");
router.post('/welcome', submitUserDetails);
router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/verify-otp',verifyOtp);

module.exports = router;