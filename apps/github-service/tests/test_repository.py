from config import settings
from pymongo import AsyncMongoClient

def test_connecting_to_repo():
	client = AsyncMongoClient(settings.MONGO_URI)
	projects = client["projects"]

	assert client is not None
	