# this file contains api routes that my main portfolio site will use to get projects
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_projects():
	return {}