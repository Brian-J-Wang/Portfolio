import { config } from "@config/config";
import type { Project, ProjectType } from "./project.types";

export const getProjects = (): Promise<Project[]> => {
	return fetch(`${config.BACKEND_URL}/projects`).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	});
};

export async function getProject(node: string): Promise<Project> {
	const res = await fetch(`/api/projects/${node}`);
	return await res.json();
}
