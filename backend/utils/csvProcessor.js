const fs = require("fs");
const csv = require("csv-parser");

const processCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        let columns = [];
        let data = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                if (columns.length === 0) columns = Object.keys(row);
                data.push(row);
            })
            .on("end", () => resolve({ columns, data }))
            .on("error", reject);
    });
};

module.exports = { processCSV };
