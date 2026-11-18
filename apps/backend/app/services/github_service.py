from app.schemas.project import GithubProject
from app.schemas.github_events import GithubWebhookEvent, PingEvent
from app.schemas.github_events import PushEvent
from app.services.project_service import ProjectService
from app.schemas.project_metadata import ProjectMetadata
from config import settings
from .project_service import get_project_service

class Github_Service:
	def __init__(self, token, project_service):
		self.token = token
		self.project_service: ProjectService = project_service
		self.header = {
				"Authorization": "Bearer " + self.token,
				"Accept": "application/vnd.github.raw",
				"User-Agent": "Brian-J-Wang/portfolio-service"
			}

	def get_github_url(self, repo_name: str) -> str:
			return f"https://api.github.com/repos/{repo_name}/contents/portfolio.md"

	async def update_github_repo(self, payload: GithubWebhookEvent):
		if isinstance(payload, PushEvent) and payload.ref != "refs/heads/main":
			return

		project = GithubProject.from_github(self.get_github_url(payload.repository.full_name), headers=self.header)
		await self.project_service.upsert_project(payload.repository, project)


github_service = Github_Service(settings.GH_TOKEN, get_project_service())
def get_github_service():
	return github_service
	