import asyncio
from app.repository.project_repository import get_project_repository
from app.services.project_service import ProjectService
from app.services.github_service import get_github_service
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.repository.mongodb import init_database
from app.routes import contact, github, projects
from config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
	settings = get_settings()
	await init_database(settings.MONGO_URI)

	project_service = ProjectService(get_github_service(), get_project_repository())
	sync_task = asyncio.create_task(project_service.sync_malformed_projects())

	yield

	if not sync_task.done():
		sync_task.cancel()


app = FastAPI(lifespan=lifespan)
app.include_router(github.router, prefix="/github/webhook")
app.include_router(projects.router, prefix="/projects")
app.include_router(contact.router, prefix="/contact")