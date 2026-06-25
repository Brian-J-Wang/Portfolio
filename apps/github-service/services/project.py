class ProjectService:
	def __init__(self, collection):
		self.project_collection = collection

	def getProjects(self):
		return self.project_collection.find({})
		
