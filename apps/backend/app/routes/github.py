from app.schemas.github_events import PingEvent
from app.services.project_service import get_project_service
from app.services.github_service import get_github_service
from repository.model.project import Project
from pydantic import ValidationError
from app.schemas.github_events import PushEvent
from fastapi import Response, Depends, Request, APIRouter, Header 

router = APIRouter()

@router.post("")
async def github_webhook(
	request: Request, 
	event_type = Header(alias="X-GitHub-Event"), 
	github_service = Depends(get_github_service)
):
	try:
		if event_type == "push":
			payload = PushEvent.model_validate(await request.json())
		elif event_type == "ping":
			payload = PingEvent.model_validate(await request.json())
		else:
			return Response(status_code=200)
	except Exception as exc:
		return Response(status_code=500, content=str(exc), headers={
							"Content-Type": "application/json"
						})

	await github_service.update_github_repo(payload)

	return Response(status_code=200)

