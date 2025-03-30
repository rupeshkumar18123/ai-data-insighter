const express = require("express");
const { generatePDFReport } = require("../utils/pdfGenerator");

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { insights, charts } = req.body;
        const filePath = await generatePDFReport(insights, charts);
        res.download(filePath);
    } catch (error) {
        console.error("❌ Error generating report:", error);
        res.status(500).json({ error: "Failed to generate report" });
    }
});

module.exports = router;
