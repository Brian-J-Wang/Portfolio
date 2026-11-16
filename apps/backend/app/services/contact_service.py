from config import settings
import resend
from resend import exceptions


class Contact_Service:
	def __init__(self, rs_token, target_email):
		self.target_email = target_email
		resend.api_key = rs_token

	async def send_message(self, name: str, email: str, role: str, message: str) -> bool:
		params = resend.Emails.SendParams({
			"to": self.target_email,
			"from": "Contacts <contacts@brianjwang.com>",
			"subject": "Hello from {}!".format(name),
			"html": "<p>{} ({}) wants to connect with you.</p><ul><li>Role: {}</li><li>Message: {}</li></ul>".format(name, email, role, message),
		})

		try:
			resend.Emails.send(params)
			return True
		except exceptions.ResendError as e:
			print(f"Error with sending messages: {e}")
			return False
		

contact_service = Contact_Service(settings.RS_TOKEN, settings.TARGET_EMAIL)
def get_contact_service():
	return contact_service