// const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

// const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });

// const generateCharts = async (data, chartTypes) => {
//     let charts = [];

//     for (const type of chartTypes) {
//         const chartConfig = {
//             type,
//             data: { labels: data.map((d) => d.Category), datasets: [{ label: "Data", data: data.map((d) => d.Value) }] },
//         };
//         const image = await chartJSNodeCanvas.renderToBuffer(chartConfig);
//         charts.push(image.toString("base64"));
//     }

//     return charts;
// };

// module.exports = { generateCharts };


const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });

const generateCharts = async (data) => {
    let charts = [];

    const types = ["bar", "line", "pie"];
    for (const type of types) {
        const config = {
            type,
            data: {
                labels: data.map((d) => d.Category),
                datasets: [{ label: "Data", data: data.map((d) => d.Value) }],
            },
        };

        const image = await chartJSNodeCanvas.renderToBuffer(config);
        charts.push(image.toString("base64"));
    }

    return charts;
};

module.exports = { generateCharts };
