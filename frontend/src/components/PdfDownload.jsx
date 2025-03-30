import React from "react";
import axios from "axios";

const PdfDownload = ({ insights, charts }) => {
  const handleDownload = async () => {
    const response = await axios.post("http://localhost:5000/api/pdf/generate", { insights, charts }, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Business_Report.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return <button onClick={handleDownload}>📥 Download Report</button>;
};

export default PdfDownload;
