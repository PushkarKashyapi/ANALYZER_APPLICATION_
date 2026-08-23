from analyzer.services.mongo_service import MongoService

class HealthService:

    @staticmethod
    def check_database():
        database = MongoService.get_database()

        database.command("ping")

        return True