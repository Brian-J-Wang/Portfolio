from pydantic import computed_field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
	GH_TOKEN: str
	DB_USER: str
	DB_PASS: str
	DB_HOST: str

	@computed_field
	@property
	def MONGO_URI(self) -> str:
		return f"mongodb://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:27017/projects"
		

settings = Settings()