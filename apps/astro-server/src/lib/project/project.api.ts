import { config } from "@config/config";
import type { Project, ProjectType } from "@lib/project/project.types";

type ProjectParams = {
	type?: ProjectType;
	limit?: number;
};

export const getProjects = (params: ProjectParams): Promise<Project[]> => {
	params = Object.assign(
		{
			type: "personal",
			limit: 5,
		} as ProjectParams,
		params,
	);

	const paramString = Object.keys(params)
		.map((key) => `${key}=${params[key as keyof ProjectParams]}`)
		.join("&");

	return fetch(`${config.BACKEND_URL}/projects?${paramString}`).then(
		(res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error(res.statusText);
			}
		},
	);
};

export async function getProject(node: string): Promise<Project> {
	const res = await fetch(`/api/projects/${node}`);
	return await res.json();
}
