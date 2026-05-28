const Assignment = require('../models/assignment');

const addAssignmentProff = async (req, res) => {

  try {

    console.log("Received Data:", req.body);
    console.log("Uploaded Files:", req.file);

    const {
      assignmentNumber,
      subject,
      chapter,
      deadline,
      professorName,
      description,
      email,
      branch
    } = req.body;

    if (
      !assignmentNumber ||
      !subject ||
      !chapter ||
      !deadline ||
      !professorName ||
      !email ||
      !branch
    ) {
      return res.status(400).json({
        error: 'Missing required fields.',
      });
    }

    // Process email
    const processedEmail = email.trim();

    // Cloudinary URLs
   const attachments = req.file
  ? [{
      filename: req.file.originalname,
      url: req.file.secure_url || req.file.path,
    }]
  : [];

    const newAssignment = new Assignment({
      assignmentNumber,
      subject,
      chapter,
      deadline,
      professorName,
      description,
      branch,
      email: processedEmail,
      attachments,
      submitted: false,
      createdAt: new Date(),
    });

    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully.',
      assignment: savedAssignment,
    });

  } catch (error) {

    console.error('Error adding assignment:', error);

    res.status(500).json({
      error: 'Server error. Could not add assignment.',
    });
  }
};

module.exports = { addAssignmentProff };