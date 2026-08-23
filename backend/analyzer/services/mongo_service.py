from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class MongoService:
    _client = None
    _database = None

    @classmethod
    def get_database(cls):
        if cls._database is None:
            cls._client = MongoClient(
                os.getenv("MONGO_URI"),
                serverSelectionTimeoutMS=5000,
            )

            cls._database = cls._client[
                os.getenv("MONGO_DB_NAME")
            ]

        return cls._database