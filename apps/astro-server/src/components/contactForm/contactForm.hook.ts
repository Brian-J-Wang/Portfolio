import { useState } from "react";
import { sendMessage } from "./contactForm.api";
import type { SubmitHandler } from "react-hook-form";
import type { FormData } from "./contactForm.schema";

type Status = "waiting" | "loading" | "success" | "error";

const useSendMessage = () => {
	const [status, setStatus] = useState<Status>("waiting");

	const handleSend: SubmitHandler<FormData> = (data) => {
		setStatus("loading");

		sendMessage(data)
			.then(() => {
				setStatus("success");
			})
			.catch(() => {
				setStatus("error");
			});
	};

	return { handleSend, status };
};

export default useSendMessage;
