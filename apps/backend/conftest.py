import pytest
from config import Settings, get_settings as load_settings
from beanie import init_beanie
from pymongo import AsyncMongoClient
from testcontainers.community.mongodb import MongoDbContainer
from app.repository.model.project import Project

@pytest.fixture
def get_settings() -> Settings:
	return load_settings()

@pytest.fixture(scope="session")
def mongo_uri():
	with MongoDbContainer("mongo:8.0") as mongo:
		yield mongo.get_connection_url()

@pytest.fixture
async def db_client(mongo_uri):
	client = AsyncMongoClient(mongo_uri)
	await init_beanie(database=client["projects_test"], document_models=[Project])
	yield client

	await client.drop_database("projects_test")
	await client.close()