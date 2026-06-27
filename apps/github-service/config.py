from pydantic_settings import BaseSettings

class Settings(BaseSettings):
	MONGO_URI: str
	GITHUB_PAT: str

	class Config:
		env_file = ".env"
		env_file_encoding = "utf-8"

settings = Settings()