from fastapi import Request
from fastapi import APIRouter

router = APIRouter()

@router.post("github/webhook")
async def github_webhook(request: Request):
	event_type = request.headers['X-Github-Event']
	payload = await request.json()

	if event_type == "push":
		branch = payload['ref'].split('/')[-1]

		# only trigger on main branch pushes
		if branch != "main":
			return {}
		
		# extract file info
		commits = payload['commits']
		
		for commit in commits:
			added: list = commit["added"]
			modified: list = commit["modified"]

			if "README.md" in added or "README.md" in modified:
				#parse the readme file, then add it to the database
				pass