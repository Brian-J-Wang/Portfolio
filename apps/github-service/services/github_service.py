from schemas.portfolio_md import Portfolio_MD
from config import settings
import requests
import yaml

class Github_Service:
	def __init__(self, token):
		self.token = token

	#gets and returns portfolio.yaml
	def get_project_metadata(self, project_name: str) -> Portfolio_MD:
		headers = {
				"Authorization": "Bearer " + self.token,
				"Accept": "application/vnd.github.raw",
				"User-Agent": "Brian-J-Wang/portfolio-service"
			}

		response = requests.get("https://api.github.com/repos/{}/contents/portfolio.yaml".format(project_name), headers=headers)
		response.raise_for_status();

		return Portfolio_MD.model_validate(yaml.safe_load(response.text))

github_service = Github_Service(settings.GITHUB_PAT)
def get_github_service():
	return github_service
	