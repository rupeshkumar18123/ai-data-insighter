import React from "react";

const ChartDisplay = ({ charts }) => {
  return (
    <div>
      {charts.map((chart, index) => (
        <img key={index} src={`data:image/png;base64,${chart}`} alt="Chart" width="400" />
      ))}
    </div>
  );
};

export default ChartDisplay;
