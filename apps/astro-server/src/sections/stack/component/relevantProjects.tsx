import type { ValidTechIcons } from "@lib/technologies/technologies.data";
import type { Project } from "@/components/projects/project.types";
import TechIcon from "@/components/techIcon/techIcon";

type RelevantProjectsProps = {
	tagFilter: ValidTechIcons;
	projects: Project[];
};

const RelevantProjects: React.FC<RelevantProjectsProps> = ({ projects }) => {
	return (
		<>
			{projects.map(({ node_id, project_data }) => {
				return (
					<div key={node_id}>
						<h3 className="mb-1">{project_data.name}</h3>
						<div className="flex gap-2 mb-3">
							{project_data.tech_stack.map((tech) => {
								return (
									<TechIcon
										key={tech}
										name={tech as ValidTechIcons}
										variant="chip"
										showName={true}
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
