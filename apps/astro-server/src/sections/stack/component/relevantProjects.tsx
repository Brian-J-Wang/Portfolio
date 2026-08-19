import Inset from "@components/inset/inset";
import { getProjects } from "@lib/project/project.react.api";
import type { ValidTechIcons } from "@lib/technologies/technologies.data";
import { use } from "react";

type RelevantProjectsProps = {
	tagFilter: ValidTechIcons;
};

const RelevantProjects: React.FC<RelevantProjectsProps> = (props) => {
	const projects = use(
		getProjects({ type: "all", limit: 3, tagFilter: props.tagFilter }),
	);

	return (
		<>
			{projects.map(({ node_id, project_data }) => {
				return (
					<div key={node_id} className="relative">
						<Inset position={"top-left"}>
							<h3>{project_data.name}</h3>
						</Inset>
					</div>
				);
			})}
		</>
	);
};

export default RelevantProjects;
