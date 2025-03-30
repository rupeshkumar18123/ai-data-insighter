const pdfkit = require("pdfkit");
const fs = require("fs");

const generatePDFReport = async (insights, charts) => {
    return new Promise((resolve, reject) => {
        const filePath = `./reports/Business_Report.pdf`;
        const pdf = new pdfkit();

        pdf.pipe(fs.createWriteStream(filePath));

        pdf.fontSize(20).text("📊 Business Insights", { align: "center" }).moveDown();
        pdf.fontSize(14).text(insights).moveDown();

        charts.forEach((chart) => {
            pdf.image(Buffer.from(chart, "base64"), { width: 500 }).moveDown();
        });

        pdf.end();
        pdf.on("finish", () => resolve(filePath));
        pdf.on("error", reject);
    });
};

module.exports = { generatePDFReport };
