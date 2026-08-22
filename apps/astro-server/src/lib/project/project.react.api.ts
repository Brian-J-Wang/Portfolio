import type { Project, ProjectType } from "./project.types";

type ProjectParams = {
	type?: ProjectType;
	limit?: number;
	tagFilter: string;
};

const cache = new Map<string, Promise<Project[]>>();

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

	if (!cache.has(paramString)) {
		cache.set(
			paramString,
			fetch(`/api/projects?${paramString}`)
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
				}),
		);
	}

	return cache.get(paramString)!;
};
