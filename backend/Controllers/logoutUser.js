const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = logoutUser;
