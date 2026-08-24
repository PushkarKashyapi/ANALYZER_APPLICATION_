import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Loader2,
  CheckCircle,
  
} from "lucide-react";

import { analyzeDocument } from "../services/api";

const sampleImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=150",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
];

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf",
];

export default function UploadCard({ onSuccess }) {
  const inputRef = useRef();

  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const uploadFile = async (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG, JPG, JPEG, WEBP and PDF files are supported.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("Maximum file size is 15 MB.");
      return;
    }

    setSelectedFile(file);
    setError("");
    setLoading(true);

    try {
      const data = await analyzeDocument(file);
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={`upload-card ${dragging ? "drag-active" : ""}`}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        uploadFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.pdf"
        onChange={(e) => uploadFile(e.target.files[0])}
      />

      <button
        className="upload-btn"
        disabled={loading}
        onClick={() => inputRef.current.click()}
      >
        {loading ? (
          <>
            <Loader2 className="spin" size={20} />
            Analyzing...
          </>
        ) : (
          <>
            <UploadCloud size={20} />
            Upload Image
          </>
        )}
      </button>

      <h3>or Drag & Drop your image here</h3>

      <p className="upload-subtitle">
        PNG, JPG, WEBP or PDF · Max 15MB
      </p>

      {selectedFile ? (
        <motion.div
          className="selected-file"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {loading ? (
            <Loader2 className="spin" size={20} />
          ) : (
            <CheckCircle size={20} color="#8B5CF6" />
          )}

          <div className="file-details">
            <span>{selectedFile.name}</span>
            <small>
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </small>
          </div>
        </motion.div>
      ) : (
        <div className="sample-images">
          {sampleImages.map((img, index) => (
            <img src={img} alt="sample" key={index} />
          ))}
        </div>
      )}

      {loading && (
        <div className="analysis-status">
          <Loader2 className="spin" size={18} />
          <span>Running OCR • OpenCV • Gemini AI...</span>
        </div>
      )}

      {error && <div className="upload-error">{error}</div>}
    </motion.div>
  );
}