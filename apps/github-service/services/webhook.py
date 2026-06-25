from schemas.github_events import PushEvent
from repository.mongodb import projects

class WebhookService:
	def __init__(self, collection):
		self.project_collection = collection

	def create_or_update(self, payload: PushEvent):
		print(payload.repository)		

webhook_service = WebhookService(projects)

def get_webhook_service():
	return webhook_service