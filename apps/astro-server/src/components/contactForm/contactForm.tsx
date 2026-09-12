import Button from "@/components/ui/button";
import {
	FieldGroup,
	Field,
	FieldLabel,
	FieldError,
	FieldLegend,
} from "@/components/ui/field";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema, type FormData } from "./contactForm.schema";
import useSendMessage from "./contactForm.hook";

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});
	const { handleSend, status } = useSendMessage();

	return (
		<form
			noValidate
			action="submit"
			className="w-100 bg-foreground pt-7 pb-8 px-8 box-content rounded-xl"
			onSubmit={handleSubmit(handleSend)}
		>
			<FieldGroup>
				<h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
				<Field>
					<FieldLabel htmlFor="query-name">Name</FieldLabel>
					<Input
						id="query-name"
						placeholder="Your name"
						required
						{...register("name", { required: true })}
						aria-invalid={errors.name != undefined}
					/>
					<FieldError>{errors.name && "Name is required"}</FieldError>
				</Field>
				<Field>
					<FieldLabel htmlFor="query-email">Email</FieldLabel>
					<Input
						type="email"
						id="query-email"
						placeholder="yourname123@email.com"
						required
						{...register("email")}
						aria-invalid={errors.email != undefined}
					/>
					<FieldError>{errors.email?.message}</FieldError>
				</Field>
				<Field>
					<FieldLabel htmlFor="query-role">Your Role</FieldLabel>
					<Input
						id="query-role"
						placeholder="What are you hiring for?"
						required
						{...register("role", { required: true })}
						aria-invalid={errors.role != undefined}
					/>
					<FieldError>{errors.role && "Role is required"}</FieldError>
				</Field>
				<Field>
					<FieldLabel htmlFor="query-message">
						Your Message
					</FieldLabel>
					<Textarea
						id="query-message"
						required
						{...register("message", { required: true })}
						aria-invalid={errors.message != undefined}
					/>
					<FieldError>
						{errors.message && "Message is required"}
					</FieldError>
				</Field>
				<Button type="submit" disabled={Object.keys(errors).length > 0}>
					{status === "success" && "Message sent!"}
					{status === "error" && "Failed to send message"}
					{status === "loading" && "Sending..."}
					{status === "waiting" && "Send"}
				</Button>
			</FieldGroup>
		</form>
	);
};

export default ContactForm;
