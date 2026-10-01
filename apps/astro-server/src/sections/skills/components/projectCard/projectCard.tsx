import styles from "./projectCard.module.css";
import ConcaveRadius from "@/components/concaveRadius/concaveRadius";
import TechIcon from "@/components/techIcon/techIcon";
import type { ProjectData } from "@/components/projects/project.types";

type ProjectCardProps = {
	projectData: ProjectData;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
	return (
		<div className={styles.projectCard}>
			<div className={styles.projectCard__background}></div>
			<div>
				<div className="flex justify-end items-end">
					<ConcaveRadius anchor="bottomRight" />
					<div className="flex justify-end gap-4 bg-white p-4 rounded-t-(--border-radius)">
						<div className="w-6 h-6">
							<a
								href="https://www.linkedin.com/in/brian-j-wang/"
								target="_blank"
							>
								<img
									src="linkedin.svg"
									alt="linkedin svg"
									className="w-full h-full"
								/>
							</a>
						</div>
						<div className="w-6 h-6">
							<a
								href="https://github.com/Brian-J-Wang"
								target="_blank"
							>
								<img
									src="github.svg"
									alt="github svg"
									className="w-full h-full"
								/>
							</a>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-tl-(--border-radius) px-8 pt-5">
					<div className="h-72">
						<h3 className="mb-2 text-3xl">{projectData.name}</h3>
						<div className="flex gap-1.5 mb-4">
							{projectData.tech_stack.map((tech) => {
								return (
									<TechIcon
										variant="chip"
										name={tech}
										size="sm"
									/>
								);
							})}
						</div>
						<p className="text-lg">{projectData.description}</p>
					</div>
					<div id="CTA line" className={styles.projectCard__CTA}>
						Read more about it
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
