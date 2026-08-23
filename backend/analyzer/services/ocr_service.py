import os
from pathlib import Path

import cv2
import pytesseract


class OCRService:
    """
    Handles OCR extraction using Tesseract.
    Works on Windows (local) and Linux (Render).
    """

    # Configure Tesseract path automatically
    if os.name == "nt":
        pytesseract.pytesseract.tesseract_cmd = (
            r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        )

    @classmethod
    def extract_text(cls, file_path: Path) -> str:
        image = cv2.imread(str(file_path))

        if image is None:
            raise ValueError("Unable to read image for OCR.")

        processed_image = cls.preprocess_image(image)

        text = pytesseract.image_to_string(
            processed_image,
            lang="eng",
            config="--oem 3 --psm 6"
        )

        return text.strip()

    @staticmethod
    def preprocess_image(image):
        """
        Improve OCR accuracy before sending image to Tesseract.
        """

        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Remove noise
        gray = cv2.medianBlur(gray, 3)

        # Adaptive threshold
        threshold = cv2.adaptiveThreshold(
            gray,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,
            2,
        )

        return threshold