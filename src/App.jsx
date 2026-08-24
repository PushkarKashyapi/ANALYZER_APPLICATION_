import { useState } from "react";

import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";

import "./styles/global.css";
import "./styles/hero.css";
import "./styles/dashboard.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="app">
      {analysisData ? (
        <Dashboard
          data={analysisData}
          onBack={() => setAnalysisData(null)}
        />
      ) : (
        <Hero onAnalyze={setAnalysisData} />
      )}
    </div>
  );
}