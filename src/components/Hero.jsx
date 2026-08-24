import { motion } from "framer-motion";

import Navbar from "./Navbar";
import UploadCard from "./UploadCard";

import logo from "../assets/bigger_zlim.png";
import "../styles/hero.css";

export default function Hero({ onAnalyze }) {
  return (
    <>
      <Navbar />

      <section className="hero-section">
        <div className="stars" />

        <div className="hero-wrapper">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={logo} alt="ZLIM Logo" className="hero-logo" />

            <h1 className="hero-title">
              Analyze Your <br />
              <span>Social Media</span> Content
            </h1>

            <p className="hero-description">
              Upload Instagram posts, LinkedIn creatives, marketing posters or
              PDFs and get AI-powered OCR extraction, design quality scores,
              engagement insights, caption analysis and actionable improvement
              suggestions in seconds.
            </p>

            <div className="hero-badges">
              <span>100% AI Powered</span>
              <span>OCR + Gemini AI</span>
              <span>Marketing Insights</span>
            </div>
          </motion.div>

          <UploadCard onSuccess={onAnalyze} />
        </div>
      </section>
    </>
  );
}