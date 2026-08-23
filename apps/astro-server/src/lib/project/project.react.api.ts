import type { Project, ProjectType } from "./project.types";

type ProjectParams = {
	type?: ProjectType;
	tagFilter: string;
};

//TODO: make request for projects once and then filter based on params
const projects: Promise<Project[]> = fetch(`/api/projects?type=all`)
	.then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	})
	.catch((err) => {
		console.log(err);
		return [];
	});
const cache = new Map<string, Promise<Project[]>>();

export const getProjects = (params: ProjectParams): Promise<Project[]> => {
	params = Object.assign(
		{
			type: "personal",
		} as ProjectParams,
		params,
	);

	const paramString = Object.keys(params)
		.map((key) => `${key}=${params[key as keyof ProjectParams]}`)
		.join("&");

	if (!cache.has(paramString)) {
		const filtered = projects.then((projects) => {
			return projects.filter((project) => {
				return project.project_data.tech_stack.includes(
					params.tagFilter,
				);
			});
		});
		cache.set(paramString, filtered);
	}

	return cache.get(paramString)!;
};
