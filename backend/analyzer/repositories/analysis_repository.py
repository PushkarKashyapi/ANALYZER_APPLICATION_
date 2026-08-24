from analyzer.services.mongo_service import MongoService

class AnalysisRepository:

    def __init__(self):
        database = MongoService.get_database()
        self.collection = database["analyses"]

    def create(self, data):
        result = self.collection.insert_one(data)
        return str(result.inserted_id)

    def get_all(self):
        return list(
            self.collection.find({}, {"_id": 0})
        )

    def delete(self, analysis_id):
        return self.collection.delete_one(
            {"analysisId": analysis_id}
        )