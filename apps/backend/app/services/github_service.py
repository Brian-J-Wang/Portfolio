from fastapi import Depends
from app.schemas.github_project import GithubProject
from app.schemas.github_events import GithubWebhookEvent, PushEvent
from app.repository.project_repository import ProjectRepository, get_project_repository
from config import Settings, get_settings


class GithubService:
	def __init__(self, token: str):
		self.token = token
		self.header = {
			"Authorization": "Bearer " + self.token,
			"Accept": "application/vnd.github.raw",
			"User-Agent": "Brian-J-Wang/portfolio-service",
		}

	def get_github_project_from_url(self, github_link: str):
		return GithubProject.from_github(github_link, headers=self.header)

	def get_github_project(self, repo: str):
		url = self.get_github_url(repo)
		return GithubProject.from_github(url, headers=self.header)

	def get_github_url(self, repo_name: str) -> str:
		return f"https://api.github.com/repos/{repo_name}/contents/portfolio.md"


def get_github_service(
	settings: Settings = Depends(get_settings),
) -> GithubService:
	return GithubService(settings.GH_TOKEN)