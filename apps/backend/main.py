from repository.mongodb import init_database
from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes import webhook, projects, contact

@asynccontextmanager
async def lifespan(app: FastAPI):
	await init_database();
	yield

app = FastAPI(lifespan=lifespan)
app.include_router(webhook.router, prefix="/github/webhook")
app.include_router(projects.router, prefix="/projects")
app.include_router(contact.router, prefix="/contact")