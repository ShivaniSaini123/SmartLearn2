// const User = require("../models/userSchema");
// const bcrypt = require("bcryptjs");

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Please provide email and password",
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Invalid email or password",
//       });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Invalid email or password",
//       });
//     }

//     // Store userId in session
//     req.session.userId = user._id;

//     // Send response with user details including role
//     res.status(200).json({
//       status: "success",
//       message: "Login successful",
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // Include role in the response
//         yearOfStudy: user.yearOfStudy,
//         department: user.department,
//         college: user.college,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Server error, please try again later",
//     });
//   }
// };

// module.exports = loginUser;

const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.isVerified) {
      // User exists and password is valid, but OTP not verified
      return res.status(403).json({
        message: "Email not verified.",
        redirectTo: "/verify-otp",
        email: user.email, // Send email back to client to pass into VerifyOtp
      });
    }

    // If verified, proceed with login (e.g., generate token)
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = loginUser;
