import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Footer = () => {
	return (
		<footer className="p-120">
			<div></div>
			<form action="submit" className="w-100">
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="query-name">Name</FieldLabel>
						<Input
							id="query-name"
							placeholder="Your name"
							required
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-email">Email</FieldLabel>
						<Input
							type="email"
							id="query-email"
							placeholder="yourname123@email.com"
							required
						/>
						<FieldError> Enter a valid email address.</FieldError>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-role">Your Role</FieldLabel>
						<Input
							id="query-role"
							placeholder="What are you hiring for?"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-message">
							Your Message
						</FieldLabel>
						<Textarea id="query-message" />
					</Field>
				</FieldGroup>
			</form>
		</footer>
	);
};

export default Footer;
