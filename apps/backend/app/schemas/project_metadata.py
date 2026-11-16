from typing import Literal
from pydantic import BaseModel, ValidationError, field_validator

class ProjectLinks(BaseModel):
	link_type: Literal["github", "live"]
	href: str

class ProjectMetadata(BaseModel):
	name: str
	project_type: Literal["personal", "work"] = "personal"
	description: str = ""
	tech_stack: list[str] = []
	links: list[ProjectLinks] = []
	featured: bool = False

	@field_validator("links", mode="before")
	@classmethod
	def validate_links(cls, links_list: list[ProjectLinks]):
		def validate_link(link):
			try:
				return ProjectLinks.model_validate(link)
			except ValidationError:
				return None

		valid_links = [validate_link(link) for link in links_list]

		return [link for link in valid_links if link is not None]

		