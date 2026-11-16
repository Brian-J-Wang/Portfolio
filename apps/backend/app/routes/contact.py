from app.schemas.contact import ContactInformation
from fastapi import Response
from fastapi import HTTPException
from app.services.contact_service import get_contact_service
from fastapi import Depends
from app.routes.projects import router

@router.post("", status_code=204)
async def send_message(
	data: ContactInformation,
	contact_service = Depends(get_contact_service),
):
	success = await contact_service.send_message(data.name, data.email, data.role, data.message)
	
	if not success:
		raise HTTPException(status_code=500, detail="Failed to send message")

	return Response(status_code=204)