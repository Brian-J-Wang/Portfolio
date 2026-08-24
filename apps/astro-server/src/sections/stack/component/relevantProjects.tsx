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
			tagFilter: props.tagFilter,
		}),
	);

	return (
		<>
			{projects.map(({ node_id, project_data }) => {
				return (
					<div key={node_id}>
						<h3 className="mb-1">{project_data.name}</h3>
						<div className="flex gap-2 mb-3">
							{project_data.tech_stack.map((tech) => {
								return (
									<TechChip
										chip={tech as ValidTechIcons}
										key={tech}
										useSolidBackground={true}
									/>
								);
							})}
						</div>
						<div className="inset-0">
							{project_data.description}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default RelevantProjects;
