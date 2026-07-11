from repository.mongodb import init_database
from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes import webhook, api

@asynccontextmanager
async def lifespan(app: FastAPI):
	await init_database();
	yield

app = FastAPI(lifespan=lifespan)
app.include_router(webhook.router, prefix="/github/webhook")
app.include_router(api.router, prefix="/projects")

@app.get("/ping")
async def ping():
	return {"message": "pong"}