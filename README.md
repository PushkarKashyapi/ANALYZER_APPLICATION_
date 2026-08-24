Social Media Content Analyzer

Version 1.0 • Django REST Framework • Production Architecture

A production-grade AI-powered Social Media Content Analyzer that evaluates Instagram, LinkedIn, and marketing creatives using OCR, Computer Vision, and Gemini AI. The application analyzes images and PDF documents, identifies design flaws, evaluates engagement potential, and provides actionable recommendations through an interactive dashboard.

Frontend (Live Demo) | https://your-frontend-url.vercel.app |
 Backend API  https://analyzer-1-272f.onrender.com/api/v1/analyze/ |

---

Table of Contents

1. Project Overview
2. Features
3. Unique Selling Proposition
4. Tech Stack
5. Project Structure
6. Prerequisites
7. Backend Setup
8. Frontend Setup
9. Environment Variables
10. Application Workflow
11. Analysis Modules
12. Dashboard Visualizations
13. Supported File Formats
14. Production Architecture
15. Future Enhancements

---

Project Overview

The Social Media Content Analyzer is an AI-powered application that analyzes social media creatives from platforms such as Instagram, LinkedIn, Facebook, and other marketing platforms.

The backend processes uploaded images and PDF documents using Tesseract OCR, OpenCV, and Gemini AI to generate marketing insights, caption recommendations, engagement suggestions, and quality scores. The frontend visualizes the complete analysis through interactive charts and dashboards.

---

<img width="841" height="552" alt="Screenshot 2026-08-24 101734" src="https://github.com/user-attachments/assets/2ed0d7aa-97c4-47b7-bd16-7577d8186679" />


Features

- Upload PNG, JPG, JPEG, WEBP, and PDF files.
- OCR-based text extraction using Tesseract OCR.
- Image quality analysis using OpenCV.
- Business and marketing creative evaluation.
- AI-generated captions, hashtags, and reach tips.
- Interactive dashboard built with Chart.js.
- Modular production-grade architecture following SOLID principles.

---

Unique Selling Proposition

Unlike traditional OCR or image analyzers, this application automatically classifies uploaded content and applies different AI analysis pipelines.

Marketing & Business Analysis

Used for advertisements, posters, pricing cards, banners, and promotional creatives.

- Color combination analysis.
- Brand color psychology.
- Typography quality.
- Text density analysis.
- Headline and hook line detection.
- CTA visibility analysis.
- Whitespace and layout evaluation.
- Business score generation.
- AI design suggestions.

Personal / Selfie Analysis

Used for creator posts, portraits, selfies, and personal branding content.

- Brightness and lighting score.
- Contrast analysis.
- Sharpness detection.
- Composition and framing.
- Background quality.
- Visual appeal score.
- Engagement potential score.
- Editing recommendations.

---

Tech Stack

Frontend

- React.js
- Vite
- Axios
- Framer Motion
- Chart.js
- React Chart.js 2
- Lucide React

Backend

- Django REST Framework
- Python
- Tesseract OCR
- OpenCV
- Pillow
- NumPy
- Google Gemini AI

Deployment

- Frontend: Vercel / Netlify
- Backend: Render

---

Project Structure

```text
Social-Media-Content-Analyzer/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── analyzer/
│   │   ├── api/
│   │   ├── services/
│   │   ├── utils/
│   │   └── models.py
│   ├── config/
│   ├── requirements.txt
│   └── manage.py
│
└── README.md
```

---

Prerequisites

Install the following before running the project.

- Python 3.11+
- Node.js 18+
- npm
- Git
- Tesseract OCR (installed and added to system PATH)

---

Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend URL

```text
http://127.0.0.1:8000
```

---

Frontend Setup

```bash
cd frontend

npm install

npm install axios framer-motion lucide-react chart.js react-chartjs-2

npm run dev
```

Frontend URL

```text
http://localhost:5173
```

---

Environment Variables

Backend (`backend/.env`)

```env
SECRET_KEY=your_secret_key
DEBUG=True
GEMINI_API_KEY=your_gemini_api_key
```

Frontend (`frontend/.env`)

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

Production

```env
VITE_API_URL=https://analyzer-1-272f.onrender.com/api/v1
```

---

Application Workflow

```text
User Uploads Image / PDF
        │
        ▼
React Frontend (Hero.jsx)
        │
        ▼
Axios API Request
        │
        ▼
Django REST API (/api/v1/analyze/)
        │
        ▼
Tesseract OCR
        │
        ▼
OpenCV Image Analysis
        │
        ▼
Gemini AI Marketing & Caption Analysis
        │
        ▼
Structured JSON Response
        │
        ▼
Chart.js Dashboard
```

---

Analysis Modules

OCR Analysis

- Text extraction from images and PDFs.
- Word count.
- Character count.
- Extracted text preview.

Image Quality Analysis

- Brightness.
- Contrast.
- Sharpness.
- Saturation.
- Exposure.
- Noise.
- Dominant colors.
- Whitespace score.

Marketing Analysis

- Business score.
- Color psychology feedback.
- Typography score.
- CTA visibility.
- Thumbnail score.
- Design strengths.
- Weaknesses.
- AI design suggestions.

Caption Intelligence

- Engagement score.
- Readability score.
- CTA score.
- Emoji score.
- Hashtag score.
- Improved caption generation.
- Hashtag recommendations.
- Reach tips.
- Best posting time.

---

Dashboard Visualizations

The frontend converts the backend response into interactive charts.

- Overall Score Doughnut Chart.
- Caption Analysis Radar Chart.
- Image Quality Bar Chart.
- Marketing Insights Horizontal Bar Chart.
- AI Suggestions and Recommendations.
- Improved Caption Preview.
- Recommended Hashtags.

---

<img width="808" height="837" alt="Screenshot 2026-08-24 104331" src="https://github.com/user-attachments/assets/051b8735-a78a-46e1-8b0e-bfabe05749d2" />




Supported File Formats

| File Type | Support |
|-----------|---------|
| PNG | Supported |
| JPG / JPEG | Supported |
| WEBP | Supported |
| PDF | Supported |

Maximum Upload Size: **15 MB**

---

Production Architecture

The application follows a layered architecture with clear separation of responsibilities.

- Presentation Layer – React Components.
- API Layer – Axios and Django REST Views.
- Validation Layer – Django Serializers.
- Service Layer – OCR, OpenCV, Marketing, and Gemini AI services.
- Utility Layer – Image and PDF preprocessing.
- Response Builder – Unified JSON response generation.

The architecture follows SOLID principles to ensure modularity, scalability, maintainability, and clean code organization.

<img width="1043" height="538" alt="Screenshot 2026-08-24 102244" src="https://github.com/user-attachments/assets/80dcdd83-c384-4760-b3d6-28c0084db995" />


---

Future Enhancements

- Instagram Reel and Video Analysis.
- Logo Detection.
- Brand Consistency Analysis.
- Multi-language OCR.
- AI-based Sentiment Analysis.
- Competitor Content Comparison.
- Analytics History Dashboard.

---

Developed With

React, Django REST Framework, OpenCV, Tesseract OCR, Gemini AI, Chart.js, and a production-grade modular architecture following SOLID principles.
