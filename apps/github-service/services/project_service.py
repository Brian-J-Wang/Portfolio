from typing import Literal
from beanie.odm.operators.update.general import Set
from repository.schemas.project import Project

class ProjectService:
	async def upsert_project(self, node_id, portfolio_document):
		await Project.find_one({ Project.node_id: node_id}).upsert(
				Set({ "project_data" : portfolio_document}),
				on_insert = Project(
					node_id = node_id,
					project_data = portfolio_document
				)
			)

	async def get_projects(self, type: Literal["work", "personal", "all"], limit: int = 5, tagFilter: None | str = None) -> list[Project]:
		query = {}

		if type != "all": 
			query["project_data.project_type": type]

		if tagFilter is not None:
			query["project_data.tech_stack": str]

		projects = await Project.find(query).limit(limit).sort("-updated_at").to_list()

		return projects
	
	async def get_project(self, node_id: str ) -> Project | None:
		return await Project.find_one({ "node_id": node_id })

project_service = ProjectService()
def get_project_service():
	return project_service
