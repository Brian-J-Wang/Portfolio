import Button from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormData = {
	name: string;
	email: string;
	role: string;
	message: string;
};

const Footer = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		data;
	};

	return (
		<footer className="p-120 ">
			<form
				noValidate
				action="submit"
				className="w-100 p-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="query-name">Name</FieldLabel>
						<Input
							id="query-name"
							placeholder="Your name"
							{...register("name", { required: true })}
							aria-invalid={errors.name != undefined}
						/>
						<div className="min-h-5">
							<FieldError>
								{errors.name && "Name is required"}
							</FieldError>
						</div>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-email">Email</FieldLabel>
						<Input
							type="email"
							id="query-email"
							placeholder="yourname123@email.com"
							{...register("email", { required: true })}
							aria-invalid={errors.email != undefined}
						/>
						<div className="min-h-5">
							<FieldError>
								{errors.email && "Email is required"}
							</FieldError>
						</div>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-role">Your Role</FieldLabel>
						<Input
							id="query-role"
							placeholder="What are you hiring for?"
							{...register("role", { required: true })}
							aria-invalid={errors.role != undefined}
						/>
						<div className="min-h-5">
							<FieldError>
								{errors.role && "Role is required"}
							</FieldError>
						</div>
					</Field>
					<Field>
						<FieldLabel htmlFor="query-message">
							Your Message
						</FieldLabel>
						<Textarea
							id="query-message"
							{...register("message", { required: true })}
							aria-invalid={errors.message != undefined}
						/>
						<div className="min-h-5">
							<FieldError>
								{errors.message && "Message is required"}
							</FieldError>
						</div>
					</Field>
					<Button type="submit">Send</Button>
				</FieldGroup>
			</form>
		</footer>
	);
};

export default Footer;
