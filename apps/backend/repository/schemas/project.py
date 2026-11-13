from datetime import timezone
from typing import Annotated
from datetime import datetime
from beanie import Replace, Insert, Save, Indexed, Document, Update, before_event
from pydantic import Field, field_validator
from schemas.github_events import Repository
from schemas.portfolio_md import Portfolio_Links, Portfolio_MD

class Project(Document):
	node_id: Annotated[str, Indexed(unique=True)]
	project_data: Portfolio_MD
	created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
	updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
	
	class Settings:
		name = "projects"

	@field_validator("created_at", mode="before")
	@classmethod
	def validate_created_at(cls, value):
		if value is None:
			return datetime.now(timezone.utc)
		return value

	@field_validator("updated_at", mode="before")
	@classmethod
	def validate_updated_at(cls, value):
		if value is None:
			return datetime.now(timezone.utc)
		return value

	@classmethod
	def from_source(cls, repository: Repository, project_data: Portfolio_MD):
		if not any(link.link_type == "github" for link in project_data.links):
			project_data.links.append(Portfolio_Links(link_type="github", href=repository.html_url))
		return cls(node_id=repository.node_id, project_data=project_data)
	
	@before_event([Insert])
	def before_insert(self):
		self.created_at = datetime.now(timezone.utc)
		self.updated_at = datetime.now(timezone.utc)
	
	@before_event([Replace, Save, Update])
	def before_update(self):
		self.updated_at = datetime.now(timezone.utc)