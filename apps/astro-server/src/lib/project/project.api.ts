import { config } from "@config/config";
import type { Project, ProjectType } from "@lib/project/project.types";

export async function getProjects(
	type: ProjectType = "personal",
	limit = 5,
): Promise<Project[]> {
	try {
		const res = await fetch(
			`${config.BACKEND_URL}/projects?type=${type}&limit=${limit}`,
		);
		return await res.json();
	} catch {
		console.warn(
			`Was not able to retrieve projects at ${config.BACKEND_URL}/projects`,
		);
		return [];
	}
}

export async function getProject(node: string): Promise<Project> {
	const res = await fetch(`${config.BACKEND_URL}/projects/${node}`);
	return await res.json();
}
