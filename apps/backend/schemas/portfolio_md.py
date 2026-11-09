from typing import Literal
from pydantic import BaseModel

class Portfolio_Links(BaseModel):
	link_type: Literal["github", "website"]
	href: str

class Portfolio_MD(BaseModel):
	name: str
	project_type: Literal["personal", "work"] = "personal"
	description: str
	tech_stack: list[str]
	links: list[Portfolio_Links]
	featured: bool = False