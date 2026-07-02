from typing import Literal
from beanie.odm.operators.update.general import Set
from repository.schemas.project import Project

class ProjectService:
	async def upsert_project(self, node_id, portfolio_document):
		await Project.find_one({ Project.node_id: node_id}).upsert(
				Set({Project.project_data: portfolio_document}),
				on_insert = Project(
					node_id = node_id,
					project_data = portfolio_document
				)
			)

	async def get_projects(self, type: Literal["work", "personal"], limit: int = 5) -> list[Project]:
		return await Project.find({ Project.project_data.project_type: type}).limit(limit).sort("-updated_at").to_list()
	
	async def get_project(self, node_id: str ) -> Project | None:
		return await Project.find_one({ "node_id": node_id })

project_service = ProjectService()
def get_project_service():
	return project_service
