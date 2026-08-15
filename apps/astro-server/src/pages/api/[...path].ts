import type { APIRoute } from "astro";
import { config } from "@config/config";

export const prerender = false;

export const ALL: APIRoute = async ({ params, request }) => {
	const path = params.path ?? "";

	const incomingUrl = new URL(request.url);

	const backendUrl = `${config.BACKEND_URL}/${path}${incomingUrl.search}`;

	const response = await fetch(backendUrl, {
		method: request.method,
		headers: request.headers,
		body:
			request.method === "GET" || request.method === "HEAD"
				? undefined
				: request.body,
	});

	return response;
};
