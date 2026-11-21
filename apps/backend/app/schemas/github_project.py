from datetime import datetime, timezone
from typing import Literal
import yaml
import frontmatter
import requests
from pydantic import BaseModel, Field, ValidationError, field_validator


class ProjectContent(BaseModel):
    date_updated: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    content: str = ""

    @classmethod
    def from_empty(cls):
        return cls()


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


class GithubProject(BaseModel):
    metadata: ProjectMetadata
    content: ProjectContent

    @classmethod
    def from_github(cls, url: str, headers: dict[str, str]):
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        content_type = response.headers.get("Content-Type", "")
        if "application/json" in content_type:
            raise ValueError(f"Expected raw markdown file, but GitHub returned JSON ({content_type})")

        if not frontmatter.checks(response.text):
            raise ValueError("File is not a valid portfolio markdown file (missing '---' YAML frontmatter)")

        try:
            post = frontmatter.loads(response.text)
        except yaml.YAMLError as err:
            raise ValueError(f"Invalid YAML in markdown frontmatter: {err}") from err

        return cls(
            metadata=ProjectMetadata.model_validate(post.metadata),
            content=ProjectContent(content=post.content),
        )
