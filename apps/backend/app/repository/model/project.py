from datetime import timezone
from typing import Annotated
from datetime import datetime
from beanie import Replace, Insert, Save, Indexed, Document, Update, before_event
from pydantic import Field, field_validator
from app.schemas.github_events import Repository
from app.schemas.project_content import ProjectContent
from app.schemas.project_metadata import ProjectLinks, ProjectMetadata

class Project(Document):
	node_id: Annotated[str, Indexed(unique=True)]
	project_metadata: ProjectMetadata
	project_content: ProjectContent = ProjectContent.from_empty()
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
	def from_source(cls, repository: Repository, project_metadata: ProjectMetadata):
		if not any(link.link_type == "github" for link in project_metadata.links):
			project_metadata.links.append(ProjectLinks(link_type="github", href=repository.html_url))
		return cls(node_id=repository.node_id, project_metadata=project_metadata)
	
	@before_event([Insert])
	def before_insert(self):
		self.created_at = datetime.now(timezone.utc)
		self.updated_at = datetime.now(timezone.utc)
	
	@before_event([Replace, Save, Update])
	def before_update(self):
		self.updated_at = datetime.now(timezone.utc)