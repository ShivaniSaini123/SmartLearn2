const bcrypt = require('bcryptjs');
const User = require("../models/userSchema");

const submitUserDetails = async (req, res) => {
  const { email, name, password, identifier } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Check if a user with the same email already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        // name: name || "Anonymous",
        email,
        password: hashedPassword,
        role: role || "Student", // Default to Student if role is not provided
        identifier: identifier || null,
      });

      await user.save();
      return res.status(201).json({ message: "New user created successfully!" });
    }

    // If the user already exists, check if the phone number is already associated with a different user
    const existingUser = await User.findOne({ phone });
    if (existingUser && existingUser.email !== email) {
      return res.status(409).json({
        message: "A user with this phone number already exists.",
      });
    }

    // At this point, we have a valid 'user' object to update
    user.name = name || user.name;
    user.role = role || user.role;
    user.identifier = identifier || user.identifier;

    // Update yearOfStudy if the user is a student
    if (user.role === "Student") {
      user.yearOfStudy = yearOfStudy || user.yearOfStudy;
      user.semester = undefined; // Clear semester if user changes role to Student
    }

    // Update semester if the user is a professor
    if (user.role === "Professor") {
      user.semester = semester || user.semester;
      user.yearOfStudy = undefined; // Clear yearOfStudy if user changes role to Professor
    }

    // Update password if provided and not already set
    if (password && !user.password) {
      user.password = hashedPassword;
    }

    // Save the updated user object to the database
    await user.save();

    // Send a success response
    res.status(200).json({ message: "User details updated successfully!" });
    console.log("User details:", user);

  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({
      message: "Failed to update user details.",
      error: error.message,
    });
  }
};

module.exports = submitUserDetails;