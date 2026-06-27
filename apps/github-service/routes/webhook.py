from services.project import get_project_service
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
	github_service = Depends(get_github_service),
	project_service = Depends(get_project_service)
):
	if event_type != "push":
		return Response(status_code=204)

	try:
		payload = PushEvent.model_validate(await request.json())
		if payload.ref != "refs/heads/main":
			return Response(status_code=204)
	except ValidationError as exc:
		return Response(status_code=500)
	
	node_id = payload.repository.node_id
	repo = await project_service.get_project(node_id)

	if repo is None:
		try:
			metadata = github_service.get_project_metadata(payload.repository.full_name)
		except ValidationError as exc:
			return Response(status_code=400, content={ "message": f"Invalid metadata format: {str(exc)}" })
		except Exception as exc:
			return Response(status_code=204, content={ "message": "portfolio.yaml not found"})
		project = Project(
			node_id = node_id,
			project_data = metadata
		)
		await project.insert()
	else:
		try:
			metadata = github_service.get_project_metadata(payload.repository.full_name)
		except ValidationError as exc:
			return Response(status_code=400, content={ "message": f"Invalid metadata format: {str(exc)}" })
		except Exception as exc:
			return Response(status_code=204, content={ "message": "portfolio.yaml not found"})
		repo.project_data = metadata
		await repo.save()

	return Response(status_code=200)
