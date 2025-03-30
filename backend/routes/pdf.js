const express = require("express");
const pdfkit = require("pdfkit");
const fs = require("fs");

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { insights, charts } = req.body;

  const pdf = new pdfkit();
  const filePath = `./reports/Business_Report.pdf`;
  pdf.pipe(fs.createWriteStream(filePath));

  pdf.fontSize(20).text("📊 Business Insights", { align: "center" }).moveDown();
  pdf.fontSize(14).text(insights).moveDown();

  charts.forEach((chart, index) => {
    pdf.image(Buffer.from(chart, "base64"), { width: 500 }).moveDown();
  });

  pdf.end();
  res.download(filePath);
});

module.exports = router;
