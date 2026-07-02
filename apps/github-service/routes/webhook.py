from schemas.github_events import PingEvent
from services.project_service import get_project_service
from services.github_service import get_github_service
from repository.schemas.project import Project
from pydantic import ValidationError
from schemas.github_events import PushEvent
from fastapi import Response, Depends, Request, APIRouter, Header 

router = APIRouter()

@router.post("/")
async def github_webhook(
	request: Request, 
	event_type = Header(alias="X-GitHub-Event"), 
	github_service = Depends(get_github_service)
):

	if event_type == "push":
		try:
			payload = PushEvent.model_validate(await request.json())
			await github_service.handle_push_event(payload)
		except Exception as exc:
			print(exc)
			return Response(status_code=500)
	elif event_type == "ping":
		try:
			payload = PingEvent.model_validate(await request.json())
			await github_service.handle_ping_event(payload)
		except Exception as exc:
			print(exc)
			return Response(status_code=500, content=str(exc), headers={
				"Content-Type": "application/json"
			})

	return Response(status_code=200)

