from typing import Literal
from pydantic import BaseModel

class Portfolio_MD(BaseModel):
	name: str
	project_type: Literal["personal", "work"] = "personal"
	description: str
	tech_stack: list[str]
	links: dict[str, str] = {}
	featured: bool = False