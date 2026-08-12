import { getProjects } from "@lib/project/project.api";
import { use } from "react";

type RelevantProjectsProps = {
    tagFilter: 
};

const RelevantProjects: React.FC<RelevantProjectsProps> = (props) => {
	const projects = use(getProjects({ type: "all", limit: 3, tagFilter:  }));

	return <>{projects.map((project) => {})}</>;
};
