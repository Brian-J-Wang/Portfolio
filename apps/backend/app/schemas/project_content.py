from datetime import datetime, timezone
from pydantic import BaseModel, Field

class ProjectContent(BaseModel):
    date_updated: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    content: str = ""

    @classmethod
    def from_empty(cls):
        return cls();