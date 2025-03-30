import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false); // Track upload status

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true); // Show loading state
        try {
            const { data } = await axios.post("http://localhost:5000/api/insights/generate", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onUploadComplete(data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert(error.response?.data?.error || "File upload failed. Please check the server and try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".csv, .xlsx"
                disabled={uploading}
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload & Analyze"}
            </button>
        </div>
    );
};

export default FileUpload;
