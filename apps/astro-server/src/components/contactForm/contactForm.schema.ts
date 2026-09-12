import { z } from "zod";

export const FormDataSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email({ error: "Invalid email format" }),
	role: z.string().min(1, "Role is required"),
	message: z.string().min(1, "Message is required"),
});

export type FormData = z.infer<typeof FormDataSchema>;
