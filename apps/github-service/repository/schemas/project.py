from typing import Annotated
from datetime import datetime
from beanie import Replace, Insert, Save, Indexed, Document, before_event
from schemas.portfolio_md import Portfolio_MD

class Project(Document):
	node_id: Annotated[str, Indexed(unique=True)]
	project_data: Portfolio_MD
	updated_at: datetime | None = None
	
	class Settings:
		name = "projects"
	
	@before_event([Insert])
	def set_updated(self):
		self.updated_at = datetime.now()
	
	@before_event([Replace, Save])
	def update_updated_at(self):
		self.updated_at = datetime.now()