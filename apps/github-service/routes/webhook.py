from pydantic import ValidationError
from schemas.github_events import PushEvent
from fastapi import Response, Depends, Request, APIRouter, Header 
from services.webhook import get_webhook_service;

router = APIRouter()

@router.post("/")
async def github_webhook(
	request: Request, 
	event_type = Header(alias="X-GitHub-Event"), 
	webhook_service = Depends(get_webhook_service)
):
	if event_type == "push":
		try:
			payload = PushEvent.model_validate(await request.json());
		except ValidationError as exc:
			return Response(status_code=500)
			
		webhook_service.create_or_update(payload);

		return Response(status_code=200)
	else:
		return Response(status_code=400)