import yaml
import frontmatter
import requests
from pydantic import BaseModel
from app.schemas.project_content import ProjectContent
from app.schemas.project_metadata import ProjectMetadata


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

