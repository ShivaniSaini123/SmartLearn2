const User = require("../models/userSchema");

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  // ⬇️ Add this log to see what was received
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({ email });

    // ⬇️ Add these logs after fetching user
    console.log("Fetched User:", user);
    if (user) {
      console.log("Stored OTP:", user.otp);
      console.log("Input OTP:", otp);
      console.log("OTP Expiry:", user.otpExpiresAt, "Now:", Date.now());
    }

    if (!user || String(user.otp) !== String(otp) || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined; 
    user.otpExpiresAt = undefined; 
    await user.save();

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Verification failed.", error: error.message });
  }
};

module.exports = verifyOtp;
