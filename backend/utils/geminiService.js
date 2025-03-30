const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const generateAIInsights = async (columns) => {
    const prompt = `Given these columns: ${columns.join(", ")}, suggest 5 charts (Pie, Bar, Line, Scatter, Histogram) suitable for business insights.`;

    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
            throw new Error("No AI response received.");
        }

        const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;
        if (!aiResponse) {
            throw new Error("Invalid AI response format.");
        }

        return aiResponse;
    } catch (error) {
        console.error("❌ AI Error:", error.response?.data || error.message);
        throw new Error("Failed to generate insights. Please try again later.");
    }
};

module.exports = { generateAIInsights };
