import { getProjects } from "@lib/project/project.react.api";
import type { ValidTechIcons } from "@lib/technologies/technologies.data";
import TechChip from "@components/techChip/techChip.tsx";
import { use } from "react";

type RelevantProjectsProps = {
	tagFilter: ValidTechIcons;
};

const RelevantProjects: React.FC<RelevantProjectsProps> = (props) => {
	const projects = use(
		getProjects({
			type: "all",
			limit: 3,
			tagFilter: props.tagFilter,
		}),
	);

	return (
		<>
			{projects.map(({ node_id, project_data }) => {
				return (
					<div key={node_id} className="relative bg-blue-500">
						<h3>{project_data.name}</h3>
						<div>
							{project_data.tech_stack.map((tech) => {
								return (
									<TechChip
										chip={tech as ValidTechIcons}
										key={tech}
									/>
								);
							})}
						</div>
						<div className="absolute inset-0 bg-blue-500/50">
							{project_data.description}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default RelevantProjects;
