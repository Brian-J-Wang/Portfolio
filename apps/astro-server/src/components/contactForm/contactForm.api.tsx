import type { FormData } from "./contactForm.schema";

export const sendMessage = async (data: FormData) => {
	return fetch(`api/contact`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (!res.ok) {
			throw new Error(res.statusText);
		}
	});
};
