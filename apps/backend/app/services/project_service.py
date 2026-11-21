from app.repository.project_repository import get_project_repository
from app.repository.project_repository import ProjectRepository
from app.repository.project_repository import project_repository
from app.repository.model.project import Project
from app.schemas.github_project import ProjectLinks
from fastapi import Depends
from app.schemas.github_events import GithubWebhookEvent, PushEvent
from app.services.github_service import GithubService, get_github_service


class ProjectService():
	def __init__(self, github_service: GithubService, project_repository: ProjectRepository):
		self.github_service = github_service
		self.project_repository = project_repository

	async def sync_project_from_webhook(self, webhook_payload: GithubWebhookEvent):
		#only update db if the event was to the main branch
		if isinstance(webhook_payload, PushEvent) and webhook_payload.ref != "refs/heads/main":
			return

		github_repo = self.github_service.get_github_project(webhook_payload.repository.name)

		if not any(link.link_type == "github" for link in github_repo.metadata.links):
			github_repo.metadata.links.append(ProjectLinks(link_type="github", href=webhook_payload.repository.html_url))
		
		project = Project(node_id=webhook_payload.repository.node_id, project_metadata=github_repo.metadata, project_content=github_repo.content)

		await self.project_repository.upsert_project(webhook_payload.repository.node_id, project)


def get_project_service(
	github_service = Depends(get_github_service),
	project_repository = Depends(get_project_repository)
):
	return ProjectService(github_service, project_repository)