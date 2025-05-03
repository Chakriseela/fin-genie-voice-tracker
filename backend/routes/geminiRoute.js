// backend/routes/geminiRoute.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/genai");

const router = express.Router();

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route: POST /api/gemini
router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({
      error: "Gemini API request failed",
      details: error.message,
    });
  }
});

module.exports = router;
