import os


class FileValidator:
    ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

    @classmethod
    def validate(cls, file):
        extension = os.path.splitext(file.name)[1].lower()

        if extension not in cls.ALLOWED_EXTENSIONS:
            raise ValueError("Only PDF, PNG, JPG and JPEG files are allowed.")

        if file.size > cls.MAX_FILE_SIZE:
            raise ValueError("Maximum allowed file size is 10 MB.")

        return True