from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.repository.mongodb import init_database
from app.routes import contact, github, projects
from config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
	settings = get_settings()
	await init_database(settings.MONGO_URI)
	yield


app = FastAPI(lifespan=lifespan)
app.include_router(github.router, prefix="/github/webhook")
app.include_router(projects.router, prefix="/projects")
app.include_router(contact.router, prefix="/contact")