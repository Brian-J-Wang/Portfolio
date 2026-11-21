from typing import Literal
from beanie.odm.operators.update.general import Set
from app.repository.model.project import Project
from app.schemas.github_events import Repository

class ProjectRepository:
	async def upsert_project(self, repository_id: str, project: Project):
		await Project.find_one({ Project.node_id: repository_id}).upsert(
				Set({ "project_metadata" : project}),
				on_insert = project
			)

	async def get_projects(self, project_type: Literal["work", "personal", "all"], limit: int = 5, tagFilter: None | str = None) -> list[Project]:
		query = {}

		if project_type != "all":
			query["project_data.project_type"] = project_type

		if tagFilter is not None:
			query["project_data.tech_stack"] = tagFilter

		projects = await Project.find(query).limit(limit).sort("-updated_at").to_list()

		return projects
	
	async def get_project(self, node_id: str ) -> Project | None:
		return await Project.find_one({ "node_id": node_id })

project_repository = ProjectRepository()
def get_project_repository():
	return project_repository
