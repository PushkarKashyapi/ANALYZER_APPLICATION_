Social Media Content Analyzer — Backend Documentation
Version 1.0 • Django REST Framework • Production Architecture

Prerequisites

Python 3.11+

Node.js 18+

npm

Git

Tesseract OCR (installed and added to PATH)

Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend Setup
cd frontend
npm install
npm install axios framer-motion lucide-react chart.js react-chartjs-2
npm run dev


1. Project Overview

The backend powers the Social Media Content Analyzer, an AI-driven analysis engine that processes Instagram, LinkedIn, and other social media creatives in the form of images and PDF documents.

Its primary responsibility is to receive uploaded content, extract meaningful information, analyze visual and textual quality, generate marketing insights using AI, and return a structured JSON response that the frontend converts into interactive dashboards.

Unlike a simple OCR API, this backend performs multi-stage AI analysis by combining OCR, computer vision, marketing heuristics, caption intelligence, and Gemini AI into a single pipeline.

Objective
The backend solves three major problems faced by content creators and businesses:

Problem	Backend Solution
Text inside creatives cannot be evaluated automatically.	Tesseract OCR extracts complete text from images and PDFs.
Marketing creatives have hidden design issues.	OpenCV analyzes brightness, contrast, whitespace, color balance, typography density, and image quality.
Users need actionable improvements instead of raw scores.	Gemini AI generates marketing feedback, improved captions, hashtags, reach tips, and posting strategies.

2. Backend Features
The backend is divided into specialized analysis modules. Each module performs one responsibility and contributes to the final report.

Core Functionalities
Feature	Description


Image Upload API

	Accepts PNG, JPG, JPEG, WEBP images.


PDF Upload API

	Accepts PDF marketing documents and extracts embedded images and text.


OCR Extraction

	Tesseract OCR extracts visible text from posters and advertisements.


Image Quality Analysis

	Measures brightness, contrast, sharpness, saturation, exposure, noise, whitespace, and dominant colors.


Marketing Analysis

	Evaluates branding quality, CTA visibility, typography, text density, thumbnail score, and design flaws.


Caption Intelligence

	Generates caption score, engagement score, hashtags, improved captions, reach tips, and best posting time.


AI Recommendation Engine

	Uses Gemini AI to generate personalized marketing suggestions.


REST API Response

	Returns structured JSON consumed directly by React Chart Dashboard.
  
3. Problem Statement and Solution

Problem We Solved

Most creators post marketing creatives without knowing:

Whether text is readable.

Whether CTA buttons attract attention.

Whether colors match business psychology.

Whether captions improve engagement.

Whether typography and whitespace affect readability.

Manual review is subjective and time-consuming.


<img width="841" height="552" alt="image" src="https://github.com/user-attachments/assets/63d417bf-7115-49bf-9075-51e56406191b" />

Output Produced

The backend returns one unified response containing:

OCR extracted text.

Image quality metrics.

Marketing insights.

Caption intelligence.

AI-generated recommendations.

Overall score and grading.

This single response powers the frontend dashboard.

<img width="987" height="710" alt="image" src="https://github.com/user-attachments/assets/b43d1907-ee97-4c57-9f23-fd191acd1600" />

<img width="626" height="598" alt="image" src="https://github.com/user-attachments/assets/1def7e19-0375-4398-a38f-3e9053fbc0bb" />

Working Functionality (End-to-End Pipeline)
Step	Backend Operation


1. Upload Validation

	Checks file type, size, and supported format.


2. OCR Processing

	Tesseract extracts visible text from posters and PDFs.


3. Image Analysis

	OpenCV computes brightness, contrast, saturation, sharpness, exposure, whitespace, and noise.


4. Marketing Analysis

	Business score, typography score, CTA visibility, thumbnail quality, color alignment, and whitespace score are calculated.


5. Caption Analysis

	Gemini AI evaluates engagement potential and generates improved captions and hashtags.


6. Final Response

	All outputs merged into a structured JSON payload.

  <img width="1043" height="538" alt="image" src="https://github.com/user-attachments/assets/3387d6ac-5cfe-4f2d-bac1-e03ce2a548c8" />


<img width="777" height="745" alt="image" src="https://github.com/user-attachments/assets/6cfe76db-cffe-4b83-b9b3-d2e560b86f7e" />



