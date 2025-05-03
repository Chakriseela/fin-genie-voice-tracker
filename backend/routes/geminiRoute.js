const express = require('express');
const router = express.Router();
import { GoogleGenAI } from "@google/genai";
require('dotenv').config();

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY); // Your Gemini API key in .env

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "message" field' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // or "gemini-1.5-flash"
    const result = await model.generateContent(message);
    const reply = result?.response?.text();

    if (!reply) {
      return res.status(500).json({ error: 'No response from Gemini' });
    }

    res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    console.error("Gemini API Error:", error?.message || error);
    res.status(500).json({
      error: "Gemini API request failed",
      details: error?.message || "Unknown error",
    });
  }
});

module.exports = router;
