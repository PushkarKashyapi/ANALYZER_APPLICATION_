from pathlib import Path

import fitz  # PyMuPDF


class PDFService:
    """
    Extract text from PDF documents while preserving page order.
    """

    @classmethod
    def extract_text(cls, file_path: Path) -> str:
        document = fitz.open(file_path)

        extracted_pages = []

        try:
            for page in document:
                text = page.get_text("text").strip()

                if text:
                    extracted_pages.append(text)

            extracted_text = "\n\n".join(extracted_pages)

            return cls.clean_text(extracted_text)

        finally:
            document.close()

    @staticmethod
    def clean_text(text: str) -> str:
        """
        Remove unnecessary blank lines and spaces.
        """

        lines = [line.strip() for line in text.splitlines()]

        cleaned_lines = [line for line in lines if line]

        return "\n".join(cleaned_lines)