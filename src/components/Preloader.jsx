import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import logo from "../assets/bigger_zlim.png";
import "../styles/global.css";

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return value + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.section
      className="preloader-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logo}
        alt="ZLIM"
        className="preloader-logo"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <h1>All Analysis. One Place.</h1>

      <p>OCR • AI Vision • Marketing Insights • Engagement Prediction</p>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <span>{progress}%</span>
    </motion.section>
  );
}