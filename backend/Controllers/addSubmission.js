const Submission = require('../models/submission');
const upload = require('../middleware/cloudinaryUpload');

const addSubmission = async (req, res) => {

  upload.array('attachments', 5)(req, res, async function (err) {

    // Upload error
    if (err) {
      console.error('Upload Error:', err);

      return res.status(400).json({
        success: false,
        message: 'File upload failed',
      });
    }

    try {

      const {
        assignmentNumber,
        subject,
        chapter,
        deadline,
        professorName,
        description,
        email,
        branch,
      } = req.body;

      // Validation
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
          success: false,
          message: 'Missing required fields',
        });
      }

      // Process email
      let processedEmail = Array.isArray(email)
        ? email.find((e) => e.trim() !== '')
        : email;

      if (typeof processedEmail === 'string') {
        processedEmail = processedEmail.trim();
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Cloudinary uploaded files
      const attachments = req.files.map((file) => ({
        filename: file.originalname,
        url: file.path,
        public_id: file.filename,
      }));

      // Create submission
      const newSubmission = new Submission({
        assignmentNumber,
        subject,
        chapter,
        deadline,
        professorName,
        description,
        email: processedEmail,
        branch,
        submitted: true,
        createdAt: new Date(),
        attachments,
      });

      const savedSubmission = await newSubmission.save();

      res.status(201).json({
        success: true,
        message: 'Submission saved successfully',
        submission: savedSubmission,
      });

    } catch (error) {

      console.error('Add Submission Error:', error);

      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  });
};

module.exports = { addSubmission };