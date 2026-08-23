from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from analyzer.services.health_service import HealthService


class HealthView(APIView):

    def get(self, request):
        try:
            HealthService.check_database()

            return Response({
                "success": True,
                "database": "connected"
            })

        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)