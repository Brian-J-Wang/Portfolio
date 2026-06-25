from fastapi import FastAPI, Request
from routes import webhook, api

app = FastAPI()

app.include_router(webhook.router, prefix="/github/webhook")
app.include_router(api.router, prefix="/api")

@app.get("/ping")
def ping():
	return "pong"


