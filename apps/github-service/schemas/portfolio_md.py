from pydantic import BaseModel

class Portfolio_MD(BaseModel):
	name: str
	description: str
	tech_stack: list[str]
	links: list[dict[str, str]] = []
	featured: bool = False