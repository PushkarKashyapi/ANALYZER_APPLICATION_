from pathlib import Path
import logging

from django.conf import settings
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView

from analyzer.serializers.upload_serializer import UploadSerializer
from analyzer.services.analysis_service import AnalysisService
from analyzer.validators.file_validator import FileValidator
from utils.responses import error_response, success_response

logger = logging.getLogger(__name__)


class AnalyzeView(APIView):
    """
    Upload a PDF or Image and return complete AI analysis.
    """

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = UploadSerializer(data=request.data)

        if not serializer.is_valid():
            return error_response(
                message="Invalid request.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        uploaded_file = serializer.validated_data["file"]
        file_path = None

        try:
            # -------------------------------------------------
            # Validate uploaded file
            # -------------------------------------------------
            FileValidator.validate(uploaded_file)

            # -------------------------------------------------
            # Save temporarily
            # -------------------------------------------------
            upload_dir = Path(settings.MEDIA_ROOT) / "uploads"
            upload_dir.mkdir(parents=True, exist_ok=True)

            file_path = upload_dir / uploaded_file.name

            with open(file_path, "wb+") as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            # -------------------------------------------------
            # Run complete analysis
            # -------------------------------------------------
            result = AnalysisService.process_document(
                file_path=file_path,
                filename=uploaded_file.name,
            )

            return success_response(
                message="Document analyzed successfully.",
                data=result,
                status_code=status.HTTP_200_OK,
            )

        except ValueError as error:
            logger.warning(error)

            return error_response(
                message=str(error),
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as error:
            logger.exception(error)

            return error_response(
                message="Something went wrong while analyzing the document.",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        finally:
            # Remove temporary uploaded file
            if file_path and file_path.exists():
                file_path.unlink(missing_ok=True)