"""
Main URL configuration for the Social Media Content Analyzer backend.
"""

from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path("admin/", admin.site.urls),


    path("api/v1/", include("analyzer.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )