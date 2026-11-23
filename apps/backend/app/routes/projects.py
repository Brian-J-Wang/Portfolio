# this file contains api routes that my main portfolio site will use to get projects
from app.repository.model.project import Project
from typing import Literal
from fastapi import Depends
from app.repository.project_repository import get_project_repository
from fastapi import APIRouter

router = APIRouter()

@router.get("", response_model=list[Project])
async def get_projects(
	project_service = Depends(get_project_repository),
	type: Literal["work", "personal", "all"] = "all",
	limit: int = 5,
	tagFilter: str | None = None,
):
	return await project_service.get_projects(type, limit, tagFilter)

@router.get("/{project_id:str}")
async def get_project(
	project_id: str,
	project_service = Depends(get_project_repository)
):
	return await project_service.get_project(project_id)
	
