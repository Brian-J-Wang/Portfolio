from app.repository.mongodb import init_database
from contextlib import asynccontextmanager
from app.routes import contact, projects
from fastapi import FastAPI
from app.routes import github

@asynccontextmanager
async def lifespan(app: FastAPI):
	await init_database();
	yield

app = FastAPI(lifespan=lifespan)
app.include_router(github.router, prefix="/github/webhook")
app.include_router(projects.router, prefix="/projects")
app.include_router(contact.router, prefix="/contact")