from pathlib import Path

from analyzer.services.ai_service import AIService
from analyzer.services.document_factory import DocumentFactory
from analyzer.services.image_analysis_service import ImageAnalysisService


class AnalysisService:
    """
    Main orchestrator for the Social Media Content Analyzer.
    """

    IMAGE_TYPES = {".png", ".jpg", ".jpeg"}

    @classmethod
    def process_document(cls, file_path: Path, filename: str) -> dict:
        # ----------------------------------------------------
        # STEP 1 : Extract text (OCR or PDF)
        # ----------------------------------------------------
        extracted_text = DocumentFactory.extract_text(file_path)

        # ----------------------------------------------------
        # STEP 2 : Initialize response
        # ----------------------------------------------------
        image_analysis = {}
        marketing_analysis = None
        personal_analysis = None
        content_info = {
            "content_type": "Other",
            "business_category": "None"
        }

        # ----------------------------------------------------
        # STEP 3 : Run image pipeline (only for images)
        # ----------------------------------------------------
        if file_path.suffix.lower() in cls.IMAGE_TYPES:

            # OpenCV metrics
            image_analysis = ImageAnalysisService.analyze(file_path)

            # Detect image type
            content_info = AIService.detect_content_type(str(file_path))

            content_type = content_info.get("content_type", "Other")
            business_category = content_info.get("business_category", "None")

            # ---------------- Marketing Pipeline ----------------
            if content_type in [
                "Marketing Poster",
                "Product Promotion",
                "Educational Post",
                "Event Announcement",
            ]:

                marketing_analysis = AIService.analyze_marketing_image(
                    image_path=str(file_path),
                    caption_text=extracted_text,
                    image_metrics=image_analysis,
                    business_category=business_category,
                )

            # ---------------- Personal Pipeline -----------------
            else:

                personal_analysis = AIService.analyze_personal_image(
                    image_path=str(file_path),
                    caption_text=extracted_text,
                    image_metrics=image_analysis,
                )

        # ----------------------------------------------------
        # STEP 4 : Caption analysis (runs for every upload)
        # ----------------------------------------------------
        caption_analysis = AIService.analyze_caption(
            caption_text=extracted_text,
            content_type=content_info.get("content_type", "Other"),
            business_category=content_info.get("business_category", "None"),
        )

        # ----------------------------------------------------
        # STEP 5 : Calculate Overall Score
        # ----------------------------------------------------
        overall_score = cls.calculate_overall_score(
            content_type=content_info.get("content_type", "Other"),
            image_metrics=image_analysis,
            marketing_analysis=marketing_analysis,
            personal_analysis=personal_analysis,
            caption_analysis=caption_analysis,
        )

        # ----------------------------------------------------
        # STEP 6 : Final Response
        # ----------------------------------------------------
        return {
            "filename": filename,

            "content_type": content_info.get("content_type"),
            "business_category": content_info.get("business_category"),

            "overall_score": overall_score,

            "characters": len(extracted_text),
            "words": len(extracted_text.split()),
            "extracted_text": extracted_text,

            "image_analysis": image_analysis,

            "marketing_analysis": marketing_analysis,

            "personal_analysis": personal_analysis,

            "caption_analysis": caption_analysis,
        }

    # ========================================================
    # Overall Score Logic
    # ========================================================

    @staticmethod
    def calculate_overall_score(
        content_type,
        image_metrics,
        marketing_analysis,
        personal_analysis,
        caption_analysis,
    ):
        """
        Overall score is deterministic (not AI generated).
        """

        # -------- Marketing Posters --------
        if marketing_analysis is not None:

            business_score = marketing_analysis.get("business_score", 0)

            caption_score = (
                caption_analysis.get("engagement_score", 0)
                + caption_analysis.get("catchiness_score", 0)
                + caption_analysis.get("readability_score", 0)
            ) / 3

            visual_score = (
                image_metrics.get("brightness_score", 0)
                + image_metrics.get("contrast_score", 0)
                + image_metrics.get("color_harmony_score", 0)
            ) / 3

            score = (
                business_score * 0.40
                + caption_score * 0.35
                + visual_score * 0.25
            )

            return round(score)

        # -------- Personal / Selfie / Travel --------
        if personal_analysis is not None:

            photo_score = personal_analysis.get("photo_score", 0)

            caption_score = (
                caption_analysis.get("engagement_score", 0)
                + caption_analysis.get("catchiness_score", 0)
                + caption_analysis.get("readability_score", 0)
            ) / 3

            score = (
                photo_score * 0.60
                + caption_score * 0.40
            )

            return round(score)

        # -------- PDF / Text Only --------
        caption_score = (
            caption_analysis.get("engagement_score", 0)
            + caption_analysis.get("catchiness_score", 0)
            + caption_analysis.get("readability_score", 0)
        ) / 3

        return round(caption_score)