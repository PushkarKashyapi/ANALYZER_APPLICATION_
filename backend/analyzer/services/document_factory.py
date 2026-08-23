from pathlib import Path

from analyzer.services.ocr_service import OCRService
from analyzer.services.pdf_service import PDFService


class DocumentFactory:
    """
    Factory class that chooses the correct text extraction
    service based on uploaded file type.
    """

    IMAGE_TYPES = {".jpg", ".jpeg", ".png"}
    PDF_TYPES = {".pdf"}

    @classmethod
    def extract_text(cls, file_path: Path) -> str:
        extension = file_path.suffix.lower()

        # ---------- PDF ----------
        if extension in cls.PDF_TYPES:
            return PDFService.extract_text(file_path)

        # ---------- Image ----------
        if extension in cls.IMAGE_TYPES:
            return OCRService.extract_text(file_path)

        raise ValueError(f"Unsupported file type: {extension}")