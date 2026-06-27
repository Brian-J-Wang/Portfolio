# this file contains api routes that my main portfolio site will use to get projects
from fastapi import Depends
from services.project import get_project_service
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_projects(
	project_service = Depends(get_project_service)
):
	return await project_service.get_projects()