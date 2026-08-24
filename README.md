Social Media Content Analyzer — Backend Documentation

Version 1.0 • Django REST Framework • Production Architecture

A production-grade backend built with Django REST Framework that analyzes Instagram, LinkedIn, and social media creatives using Tesseract OCR, OpenCV, and Gemini AI to generate marketing insights and engagement recommendations.

Table of Contents

Prerequisites & Project Setup

Project Overview

Backend Features

Problem Statement & Solution

Backend Architecture

Backend Folder Structure

End-to-End Working Pipeline

Code Quality & SOLID Principles

Backend Summary

1. Prerequisites & Project Setup
Prerequisites

Before running the project, install the following:

Python 3.11+

Node.js 18+

npm

Git

Tesseract OCR (installed and added to system PATH)

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


2. Project Overview

The Social Media Content Analyzer backend is an AI-powered document and image analysis engine designed to evaluate marketing creatives from platforms like Instagram, LinkedIn, Facebook, and other social media channels.

The backend receives uploaded images or PDF documents, extracts textual content using OCR, performs image quality analysis using computer vision, evaluates marketing effectiveness using AI, and returns a structured JSON response that is visualized on the frontend through interactive charts.

Objective

The backend solves common challenges faced by content creators, marketers, and businesses.

Problem

	

Backend Solution




Text inside creatives cannot be analyzed automatically.

	

Uses Tesseract OCR to extract text from images and PDFs.




Marketing creatives contain hidden design flaws.

	

Uses OpenCV to evaluate brightness, contrast, typography density, whitespace, color balance, sharpness, and exposure.




Users need improvement suggestions instead of raw metrics.

	

Uses Gemini AI to generate captions, hashtags, engagement tips, and marketing recommendations.

Technologies Used

Technology

	

Purpose




Django REST Framework

	

REST API development




Tesseract OCR

	

Text extraction from images and PDFs




OpenCV

	

Image quality and visual analysis




Gemini AI

	

Caption and marketing intelligence




Pillow & NumPy

	

Image preprocessing and analysis

3. Backend Features

The backend is divided into multiple independent analysis modules where each module has a single responsibility and contributes to the final AI report.

Core Functionalities
Feature	Description


Image Upload API

	Accepts PNG, JPG, JPEG, and WEBP images.


PDF Upload API

	Accepts PDF marketing creatives and extracts embedded text.


OCR Extraction

	Extracts visible text from posters and advertisements using Tesseract OCR.


Image Quality Analysis

	Measures brightness, contrast, saturation, sharpness, exposure, noise, whitespace, dominant colors, and color harmony.


Marketing Analysis

	Evaluates branding quality, CTA visibility, typography score, business score, thumbnail score, and design suggestions.


Caption Intelligence

	Generates engagement score, improved caption, hashtags, reach tips, and best posting time.


AI Recommendation Engine

	Uses Gemini AI to generate actionable marketing recommendations.


REST API Response

	Returns structured JSON consumed directly by the React dashboard.
4. Problem Statement & Solution
Problem We Solved

Most creators publish marketing creatives without understanding their effectiveness.

Common challenges include:

Is the extracted text readable?

Is the CTA button clearly visible?

Are colors aligned with branding psychology?

Is typography improving readability?

Will the caption increase engagement?

Manual evaluation is subjective, inconsistent, and time-consuming.

<img width="777" height="745" alt="Screenshot 2026-08-24 102710" src="https://github.com/user-attachments/assets/f4388be1-be24-4e3a-8cb3-026a37b19fb0" />


Output Produced

The backend generates a unified report containing:

OCR extracted text.

Image quality metrics.

Marketing insights.

Caption analysis.

AI-generated recommendations.

Overall content score and grade.

This structured response powers the frontend analytics dashboard.

(Insert JSON Response Image Here)

5. Backend Architecture

The backend follows a layered production architecture that separates routing, validation, business logic, AI services, and response formatting.

High-Level Architecture

<img width="841" height="552" alt="Screenshot 2026-08-24 101734" src="https://github.com/user-attachments/assets/7cade087-1ac3-41df-8c06-3f480419bb1d" />


Folder	Responsibility


<img width="551" height="542" alt="image" src="https://github.com/user-attachments/assets/b190fa48-64ec-43e0-80fd-6036c78e54b1" />


api/views

	Receives API requests and triggers the analysis pipeline.


serializers

	Validates uploaded image and PDF files.


services

	Contains OCR, OpenCV, marketing analysis, caption analysis, and Gemini AI services.


utils

	Reusable helper functions for image preprocessing, PDF parsing, and response formatting.


config

	Project configuration, middleware, routing, and environment variables.


SOLID Principles Used
<img width="1043" height="538" alt="Screenshot 2026-08-24 102244" src="https://github.com/user-attachments/assets/6d55dffe-4cd4-4144-bfa0-109989254652" />

Our problem solving approach 

<img width="808" height="837" alt="image" src="https://github.com/user-attachments/assets/10cbb89d-1176-4626-943a-8a384dc7861d" />






