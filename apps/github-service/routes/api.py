# this file contains api routes that my main portfolio site will use to get projects
from typing import Literal
from fastapi import Depends
from services.project_service import get_project_service
from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def get_projects(
	project_service = Depends(get_project_service),
	type: Literal["work", "personal"] = "personal",
	limit: int = 5
):
	return await project_service.get_projects(type, limit)