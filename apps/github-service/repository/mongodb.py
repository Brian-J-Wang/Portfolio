from pymongo import MongoClient
from config import settings

client = MongoClient(settings.MONGO_URI)
projects = client["projects"]