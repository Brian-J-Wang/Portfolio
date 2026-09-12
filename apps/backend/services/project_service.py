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

	async def get_projects(self, project_type: Literal["work", "personal", "all"], limit: int = 5, tagFilter: None | str = None) -> list[Project]:
		query = {}

		if project_type != "all": 
			query["project_data.project_type"] = project_type

		if tagFilter is not None:
			query["project_data.tech_stack"] = tagFilter

		print("type:", repr(type))
		print("tagFilter:", repr(tagFilter))
		print(query)

		projects = await Project.find(query).limit(limit).sort("-updated_at").to_list()

		print(projects)

		return projects
	
	async def get_project(self, node_id: str ) -> Project | None:
		return await Project.find_one({ "node_id": node_id })

project_service = ProjectService()
def get_project_service():
	return project_service
