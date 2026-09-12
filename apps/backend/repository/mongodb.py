from repository.schemas.project import Project
from config import settings
from pymongo import AsyncMongoClient
from beanie import init_beanie

async def init_database():
	client = AsyncMongoClient(settings.MONGO_URI)
	projects = client["projects"]

	await init_beanie(database=projects, document_models=[Project])