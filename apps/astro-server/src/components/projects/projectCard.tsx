import styles from "./styles/projectCard.module.css";
import TechChip from "@components/techChip/techChip.tsx";
import LinkButton from "@components/linkButton/linkButton.astro";
import Inset from "@components/inset/inset";
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
						position="top-right"
						className={styles.card__whiteSpace}
					>
						{Object.entries(links).map(([key, value]) => (
							<LinkButton
								link={value}
								icon={getLinkIcon(key)}
								alt={`link to ${key} repo`}
							/>
						))}
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
