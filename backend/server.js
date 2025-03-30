// const express = require("express");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const insightsRoutes = require("./routes/insights.js");
// const pdfRoutes = require("./routes/pdf.js");
// const dotenv = require("dotenv");
// const path = require("path");   
// const fs = require("fs");
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(fileUpload());

// app.use("/api/insights", insightsRoutes);
// app.use("/api/pdf", pdfRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const insightsRoutes = require("./routes/insights");
const reportRoutes = require("./routes/reports");

const app = express();
app.use(cors());

app.use(express.json());
app.use(fileUpload());

app.use("/api/insights", insightsRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
