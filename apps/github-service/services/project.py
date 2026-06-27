from repository.schemas.project import Project

class ProjectService:
	async def get_projects(self) -> list[Project]:
		return await Project.find().to_list()
	
	async def get_project(self, node_id: str ) -> Project | None:
		return await Project.find_one({ "node_id": node_id })

project_service = ProjectService()
def get_project_service():
	return project_service
