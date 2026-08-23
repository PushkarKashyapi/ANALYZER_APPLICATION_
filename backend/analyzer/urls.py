from django.urls import path

from analyzer.views.health_view import HealthView
from analyzer.views.analyze_view import AnalyzeView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("analyze/", AnalyzeView.as_view(), name="analyze"),
]