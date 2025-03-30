require("dotenv").config();
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.error("❌ API_KEY is missing! Check your .env file.");
}
module.exports = { API_KEY };
