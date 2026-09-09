import styles from "./styles/projectCard.module.css";
import Inset from "@/components/inset/inset";
import type { Project } from "./project.types";
import getLinkIcon from "./getLinkIcon";
import TechIcon from "../techIcon/techIcon";

type ProjectCardProps = HTMLDivElement & {
	project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ className, project }) => {
	const { links, name, description, tech_stack } = project.project_data;

	return (
		<div className={`${className} ${styles.card}`}>
			<div className={styles.card__projectImage}>
				{Object.keys(links).length !== 0 && (
					<Inset
						anchor="topRight"
						className={styles.card__whiteSpace}
					>
						Something is supposed to be here
					</Inset>
				)}
			</div>
			<div className={styles.card__content}>
				<div className="mb-4">
					<h3 className={styles.card__title}>{name}</h3>
					<span className="flex flex-row gap-2">
						{tech_stack.map((skill) => (
							<TechIcon variant="chip" name={skill} />
						))}
					</span>
				</div>
				<p className={styles.card__desc}>{description}</p>
			</div>
		</div>
	);
};

export default ProjectCard;
