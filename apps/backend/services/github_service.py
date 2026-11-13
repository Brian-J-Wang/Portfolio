from schemas.portfolio_md import Portfolio_Links
from schemas.github_events import PingEvent
from schemas.github_events import PushEvent
from services.project_service import ProjectService
from schemas.portfolio_md import Portfolio_MD
from config import settings
from .project_service import get_project_service
import frontmatter
import requests

class Github_Service:
	def __init__(self, token, project_service):
		self.token = token
		self.project_service: ProjectService = project_service

	#gets and returns portfolio.yaml
	def get_portfolio_md(self, project_name: str) -> Portfolio_MD:
		headers = {
				"Authorization": "Bearer " + self.token,
				"Accept": "application/vnd.github.raw",
				"User-Agent": "Brian-J-Wang/portfolio-service"
			}

		response = requests.get(f"https://api.github.com/repos/{project_name}/contents/portfolio.md", headers=headers)
		response.raise_for_status();

		#Should add more checks to the file when I get the chance:
		# - check to make the sure that the markdown file is properly formed etc.
		return Portfolio_MD.model_validate(frontmatter.loads(response.text).metadata)

	async def handle_push_event(self, payload: PushEvent):
		if payload.ref != "refs/heads/main":
			return

		portfolio_md = self.get_portfolio_md(payload.repository.full_name)

		await self.project_service.upsert_project(payload.repository, portfolio_md)
		
	async def handle_ping_event(self, payload: PingEvent):
		portfolio_md = self.get_portfolio_md(payload.repository.full_name)

		await self.project_service.upsert_project(payload.repository, portfolio_md)

github_service = Github_Service(settings.GH_TOKEN, get_project_service())
def get_github_service():
	return github_service
	