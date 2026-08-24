import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut, Radar, Bar } from "react-chartjs-2";
import { ArrowLeft } from "lucide-react";

import "../styles/dashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Dashboard({ data, onBack }) {
  const caption = data.caption_analysis || {};
  const image = data.image_analysis || {};
  const marketing = data.marketing_analysis || {};

  const overallChart = {
    datasets: [
      {
        data: [data.overall_score || 0, 100 - (data.overall_score || 0)],
        backgroundColor: ["#8B5CF6", "#1A1625"],
        borderWidth: 0,
        cutout: "78%",
      },
    ],
  };

  const captionChart = {
    labels: [
      "Hook",
      "Catchiness",
      "Engagement",
      "Readability",
      "CTA",
      "Emoji",
      "Hashtags",
    ],
    datasets: [
      {
        data: [
          caption.hook_score || 0,
          caption.catchiness_score || 0,
          caption.engagement_score || 0,
          caption.readability_score || 0,
          caption.cta_score || 0,
          caption.emoji_score || 0,
          caption.hashtag_score || 0,
        ],
        backgroundColor: "rgba(139,92,246,.18)",
        borderColor: "#8B5CF6",
        borderWidth: 2,
        pointBackgroundColor: "#C084FC",
      },
    ],
  };

  const imageChart = {
    labels: [
      "Brightness",
      "Contrast",
      "Sharpness",
      "Saturation",
      "Exposure",
      "Noise",
    ],
    datasets: [
      {
        data: [
          image.brightness_score || 0,
          image.contrast_score || 0,
          image.sharpness_score || 0,
          image.saturation_score || 0,
          image.exposure_score || 0,
          image.noise_score || 0,
        ],
        backgroundColor: "#8B5CF6",
        borderRadius: 8,
      },
    ],
  };

  const marketingChart = {
    labels: [
      "Business",
      "Color",
      "Typography",
      "Text Density",
      "Whitespace",
      "CTA",
      "Thumbnail",
    ],
    datasets: [
      {
        data: [
          marketing.business_score || 0,
          marketing.color_alignment_score || 0,
          marketing.typography_score || 0,
          marketing.text_density_score || 0,
          marketing.whitespace_score || 0,
          marketing.cta_visibility_score || 0,
          marketing.thumbnail_score || 0,
        ],
        backgroundColor: [
          "#8B5CF6",
          "#A855F7",
          "#C026D3",
          "#D946EF",
          "#9333EA",
          "#7E22CE",
          "#6366F1",
        ],
        borderRadius: 8,
      },
    ],
  };

  return (
    <section className="dashboard">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Analyze Another File
      </button>

      <div className="dashboard-header">
        <h1>{data.filename}</h1>
        <p>{data.platform} • {data.content_type}</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <span>Business Category</span>
          <h3>{data.business_category}</h3>
        </div>

        <div className="info-card">
          <span>Target Audience</span>
          <h3>{data.target_audience}</h3>
        </div>

        <div className="info-card">
          <span>Goal</span>
          <h3>{data.post_goal}</h3>
        </div>

        <div className="info-card">
          <span>Overall Grade</span>
          <h3>{data.overall_grade}</h3>
        </div>
      </div>

      <div className="chart-grid">
        <div className="card score-card">
          <h2>Overall AI Score</h2>

          <div className="score-ring">
            <Doughnut
              data={overallChart}
              options={{
                plugins: { legend: { display: false } },
              }}
            />

            <div className="score-center">
              <h1>{data.overall_score}</h1>
              <span>/100</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Caption Analysis</h2>

          <div className="chart-box">
            <Radar
              data={captionChart}
              options={{
                plugins: { legend: { display: false } },
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    grid: { color: "rgba(255,255,255,.08)" },
                    angleLines: { color: "rgba(255,255,255,.08)" },
                    pointLabels: { color: "#fff" },
                    ticks: {
                      color: "#8d89aa",
                      backdropColor: "transparent",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="card">
          <h2>Image Quality</h2>

          <div className="chart-box">
            <Bar
              data={imageChart}
              options={{
                plugins: { legend: { display: false } },
                scales: {
                  x: {
                    ticks: { color: "#fff" },
                    grid: { display: false },
                  },
                  y: {
                    min: 0,
                    max: 100,
                    ticks: { color: "#fff" },
                    grid: { color: "rgba(255,255,255,.08)" },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="card">
          <h2>Marketing Insights</h2>

          <div className="chart-box">
            <Bar
              data={marketingChart}
              options={{
                indexAxis: "y",
                plugins: { legend: { display: false } },
                scales: {
                  x: {
                    min: 0,
                    max: 100,
                    ticks: { color: "#fff" },
                    grid: { color: "rgba(255,255,255,.08)" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                    grid: { display: false },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Extracted OCR Text</h2>
        <div className="ocr-text">{data.extracted_text}</div>
      </div>

      <div className="feedback-grid">
        <div className="card">
          <h2>Strengths</h2>
          <ul>
            {(marketing.strengths || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Weaknesses</h2>
          <ul>
            {(marketing.weaknesses || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h2>Design Suggestions</h2>
        <ul>
          {(marketing.design_suggestions || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card caption-card">
        <h2>AI Generated Caption</h2>

        <div className="caption-box">
          <p>{caption.improved_caption}</p>
        </div>

        <div className="caption-metrics">
          <div>
            <span>Sentiment</span>
            <strong>{caption.sentiment}</strong>
          </div>

          <div>
            <span>Best Time</span>
            <strong>{caption.best_posting_time}</strong>
          </div>

          <div>
            <span>Readability</span>
            <strong>{caption.readability_score}</strong>
          </div>

          <div>
            <span>Engagement</span>
            <strong>{caption.engagement_score}</strong>
          </div>

          <div>
            <span>CTA Score</span>
            <strong>{caption.cta_score}</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Reach Tips</h2>

        <ul>
          {(caption.reach_tips || []).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Recommended Hashtags</h2>

        <div className="hashtags">
          {(caption.hashtags || []).map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}