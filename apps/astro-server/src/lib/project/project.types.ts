export type Project = {
	node_id: string;
	project_data: ProjectData;
};

export type ProjectType = "work" | "personal";

type ProjectData = {
	name: string;
	project_type: ProjectType;
	description: string;
	tech_stack: string[];
	links: Record<string, string>;
	featured: boolean;
};
