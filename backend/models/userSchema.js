const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Student", "Professor"],
  },
  identifier: {
    type: String, 
    required: false,
  },
  yearOfStudy: {
    type: String,
  },
  semester: {
    type: String,
  },
  department: {
    type: String,
  },
  college: {
    type: String,
  },
  phone: {
    type: String,
    
  },
  otp: {
    type: String, 
  },
  otpExpiresAt: {
    type: Date, 
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", userSchema);
