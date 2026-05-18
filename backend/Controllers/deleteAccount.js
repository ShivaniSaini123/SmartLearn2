// backend/Controllers/deleteAccount.js
const User = require("../models/userSchema");

const deleteAccount = async (req, res) => {
  try {
    // Expect email in request body
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // clear cookie if present
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({ message: "Account deleted. Please register again." });
  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({ message: "Delete account failed", error: err.message });
  }
};

module.exports = deleteAccount;
