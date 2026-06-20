const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;

    const result =
      await model.generateContent(question);

    const answer = result.response.text();

    res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    error: error.message
  });
}
};