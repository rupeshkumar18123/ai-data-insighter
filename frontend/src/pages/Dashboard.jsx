import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChartDisplay from "../components/ChartDisplay";
import PdfDownload from "../components/PdfDownload";

const Dashboard = () => {
  const [data, setData] = useState(null);

  return (
    <div>
      <h1>📊 AI-Powered Business Analytics</h1>
      <FileUpload onUploadComplete={setData} />
      {data && <ChartDisplay charts={data.charts} />}
      {data && <PdfDownload insights={data.insights} charts={data.charts} />}
    </div>
  );
};

export default Dashboard;
