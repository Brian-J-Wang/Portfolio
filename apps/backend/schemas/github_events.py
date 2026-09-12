from pydantic import BaseModel
from datetime import datetime

class Repository(BaseModel):
	created_at: datetime
	updated_at: datetime
	node_id: str
	name: str
	full_name: str
	html_url: str
	description: str | None
	owner: dict

class Commits(BaseModel):
	added: list[str]
	modified: list[str]
	timestamp: str

class PushEvent(BaseModel):
	ref: str
	commits: list[Commits]
	repository: Repository


class PingEvent(BaseModel):
	repository: Repository