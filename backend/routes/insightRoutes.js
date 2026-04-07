const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Expense = require("../models/Expenses");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model:  "gemini-2.5-flash" });

router.get("/", protect, async (req, res) => {
  try {
   const expenses = await Expense.find({ user: req.user });

    if (expenses.length === 0) {
      return res.json({ insight: "No expenses recorded yet." });
    }

    const summary = expenses.map(e => ({
      amount: e.amount,
      category: e.category,
      date: e.createdAt
    }));
const prompt = `
You are a financial analysis assistant.

Analyze the following transactions:

${JSON.stringify(summary)}

Return your response strictly in this JSON format:

{
  "summary": "Short overview",
  "risks": ["Risk 1", "Risk 2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}

Do not return anything outside JSON.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ insight: text });

  } catch (error) {
  console.error("Gemini Full Error:", error.response?.data || error.message || error);
  res.status(500).json({ message: "Gemini AI failed", error: error.message });
}
});

module.exports = router;