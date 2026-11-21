from app.repository.model.project import Project
from pymongo import AsyncMongoClient
from beanie import init_beanie

async def init_database(mongo_uri: str):
	client = AsyncMongoClient(mongo_uri)
	projects = client["projects"]

	await init_beanie(database=projects, document_models=[Project])