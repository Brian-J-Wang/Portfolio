from functools import lru_cache
from urllib.parse import quote_plus

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	GH_TOKEN: str
	DB_USER: str
	DB_PASS: str
	DB_HOST: str
	RS_TOKEN: str
	TARGET_EMAIL: str

	@computed_field
	@property
	def MONGO_URI(self) -> str:
		user = quote_plus(self.DB_USER)
		password = quote_plus(self.DB_PASS)
		return f"mongodb://{user}:{password}@{self.DB_HOST}:27017/projects"

	model_config = SettingsConfigDict(
		env_file=".env.backend",
		env_file_encoding="utf-8",
		extra="ignore",
	)


@lru_cache
def get_settings() -> Settings:
	return Settings() #pyright: ignore[reportCallIssue]