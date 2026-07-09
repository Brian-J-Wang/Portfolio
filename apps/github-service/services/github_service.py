from schemas.github_events import PingEvent
from schemas.github_events import PushEvent
from services.project_service import ProjectService
from schemas.portfolio_md import Portfolio_MD
from config import settings
from .project_service import get_project_service
import requests
import yaml

class Github_Service:
	def __init__(self, token, project_service):
		self.token = token
		self.project_service: ProjectService = project_service

	#gets and returns portfolio.yaml
	def get_portfolio_yaml(self, project_name: str) -> Portfolio_MD:
		headers = {
				"Authorization": "Bearer " + self.token,
				"Accept": "application/vnd.github.raw",
				"User-Agent": "Brian-J-Wang/portfolio-service"
			}

		response = requests.get("https://api.github.com/repos/{}/contents/portfolio.yaml".format(project_name), headers=headers)
		response.raise_for_status();

		return Portfolio_MD.model_validate(yaml.safe_load(response.text))
	
	#TODO: add some extra checks to see if the payload has actually changed the project.yaml file
	async def handle_push_event(self, payload: PushEvent):
		if payload.ref != "refs/heads/main":
			return

		portfolio_yaml = self.get_portfolio_yaml(payload.repository.full_name)
		
		if ("repo" not in portfolio_yaml.links):
			portfolio_yaml.links["repo"] = "https://github.com/{}".format(payload.repository.full_name)

		await self.project_service.upsert_project(payload.repository.node_id, portfolio_yaml)
		
	async def handle_ping_event(self, payload: PingEvent):
		portfolio_yaml = self.get_portfolio_yaml(payload.repository.full_name)
		if ("repo" not in portfolio_yaml.links):
			portfolio_yaml.links["repo"] = "https://github.com/{}".format(payload.repository.full_name)
			
		await self.project_service.upsert_project(payload.repository.node_id, portfolio_yaml)

github_service = Github_Service(settings.GH_PAT, get_project_service())
def get_github_service():
	return github_service
	