from typing import Annotated
from beanie import Document, Indexed
from schemas.portfolio_md import Portfolio_MD

class Project(Document):
	node_id: Annotated[str, Indexed(unique=True)]
	project_data: Portfolio_MD
	
	class Settings:
		name = "projects"