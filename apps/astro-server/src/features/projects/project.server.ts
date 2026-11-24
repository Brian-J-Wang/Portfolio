import { config } from "@/config/config";
import type { Project } from "@/features/projects/project.types";

export const getProjects = (): Promise<Project[]> => {
	return fetch(`${config.BACKEND_URL}/projects`).then((res) => {
		if (!res.ok) {
			throw new Error(
				`Failed to fetch projects (${res.status}): ${res.statusText}`,
			);
		}
		return res.json();
	});
};

export const getProject = (node: string): Promise<Project> => {
	return fetch(
		`${config.BACKEND_URL}/projects/${encodeURIComponent(node)}`,
	).then((res) => {
		if (!res.ok) {
			throw new Error(
				`Failed to fetch project (${res.status}): ${res.statusText}`,
			);
		}
		return res.json();
	});
};
