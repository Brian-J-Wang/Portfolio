from pydantic import BaseModel

class ContactInformation(BaseModel):
	name: str
	email: str
	role: str
	message: str