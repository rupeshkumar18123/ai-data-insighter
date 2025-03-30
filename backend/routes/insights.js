// // 

// const express = require("express");
// const OpenAI = require("openai");
// const fs = require("fs");
// const csv = require("csv-parser");
// const path = require("path");
// const { generateCharts } = require("../utils/chartGenerator.js");
// const { API_KEY } = require("../config.js");

// const router = express.Router();
// const openai = new OpenAI({ apiKey: API_KEY });

// router.post("/generate", async (req, res) => {
//     try {
//         if (!req.files || !req.files.file) {
//             console.error("❌ No file uploaded.");
//             return res.status(400).json({ error: "No file uploaded." });
//         }

//         const file = req.files.file;
//         const filePath = path.join(__dirname, "../uploads", file.name);
//         await file.mv(filePath);

//         let columns = [];
//         let data = [];

//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on("data", (row) => {
//                 if (columns.length === 0) columns = Object.keys(row);
//                 data.push(row);
//             })
//             .on("end", async () => {
//                 try {
//                     console.log("✅ File processed successfully.");

//                     const prompt = `Given these columns: ${columns.join(", ")} suggest 5 charts (Pie, Bar, Line, Scatter, Histogram).`;
//                     const response = await openai.chat.completions.create({
//                         model: "gpt-4o",
//                         messages: [{ role: "user", content: prompt }],
//                     });

//                     if (!response.choices || !response.choices[0]) {
//                         throw new Error("OpenAI response is empty.");
//                     }

//                     const chartTypes = response.choices[0].message.content.split(",").map((c) => c.trim().toLowerCase());
//                     const charts = generateCharts(data, chartTypes);

//                     res.json({ columns, insights: response.choices[0].message.content, charts });
//                 } catch (error) {
//                     console.error("❌ Error processing AI insights:", error);
//                     res.status(500).json({ error: "Error generating AI insights." });
//                 }
//             });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// });

// module.exports = router;


const express = require("express");
const { processCSV } = require("../utils/csvProcessor");
const { generateAIInsights } = require("../utils/geminiService");
const { generateCharts } = require("../utils/chartGenerator");
const path = require("path");

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const file = req.files.file;
        const filePath = path.join(__dirname, "../uploads", file.name);
        await file.mv(filePath);

        const { columns, data } = await processCSV(filePath);
        const insights = await generateAIInsights(columns);
        const charts = await generateCharts(data);

        res.json({ columns, insights, charts });
    } catch (error) {
        console.error("❌ Error processing AI insights:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
