from rest_framework import serializers


class UploadSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

    def validate_file(self, file):
        if file.size == 0:
            raise serializers.ValidationError("Uploaded file is empty.")
        return file