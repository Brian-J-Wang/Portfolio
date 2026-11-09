from datetime import timezone
from typing import Annotated
from datetime import datetime
from beanie import Replace, Insert, Save, Indexed, Document, before_event
from schemas.github_events import Repository
from schemas.portfolio_md import Portfolio_Links, Portfolio_MD

class Project(Document):
	node_id: Annotated[str, Indexed(unique=True)]
	project_data: Portfolio_MD
	created_at: datetime | None = None
	updated_at: datetime | None = None
	
	class Settings:
		name = "projects"

	@classmethod
	def from_source(cls, repository: Repository, project_data: Portfolio_MD):
		project_data.links.append(Portfolio_Links(link_type="github", href=f"https://github.com/{repository.full_name}"))
		return Project(node_id=repository.node_id, project_data=project_data)
	
	@before_event([Insert])
	def set_updated(self):
		self.updated_at = datetime.now(timezone.utc)
	
	@before_event([Replace, Save])
	def update_updated_at(self):
		self.updated_at = datetime.now(timezone.utc)