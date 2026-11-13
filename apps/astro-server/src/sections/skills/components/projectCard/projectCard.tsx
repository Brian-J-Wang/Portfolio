import styles from "./projectCard.module.css";
import ConcaveRadius from "@/components/concaveRadius/concaveRadius";
import TechIcon from "@/components/techIcon/techIcon";
import type { ProjectData } from "@/components/projects/project.types";
import IconLink from "@/components/IconLink/IconLink";

type ProjectCardProps = {
	projectData: ProjectData;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
	return (
		<div className={styles.projectCard}>
			<div className={styles.projectCard__background} />
			<div className="relative z-10 w-full">
				<div className="flex justify-between items-center">
					<h3 className={styles.projectCard__title}>
						{projectData.name}
					</h3>
					{projectData.links && (
						<div className="flex justify-end items-end">
							<ConcaveRadius anchor="bottomRight" />
							<div className={styles.projectCard__links}>
								{projectData.links.map((link) => (
									<IconLink
										key={link.href}
										href={link.href}
										type={link.link_type}
									/>
								))}
							</div>
						</div>
					)}
				</div>

				<div className={styles.projectCard__body}>
					<div className="flex flex-col justify-between">
						<div>
							<div className="flex flex-wrap gap-1.5 mb-3">
								{projectData.tech_stack.map((tech) => (
									<TechIcon
										key={tech}
										variant="chip"
										name={tech}
										size="sm"
										showName
									/>
								))}
							</div>
							<p className={styles.projectCard__description}>
								{projectData.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
