import styles from "./projectCard.module.css";
import ConcaveRadius from "@/components/concaveRadius/concaveRadius";
import TechIcon from "@/components/techIcon/techIcon";
import type { ProjectData } from "@/components/projects/project.types";
import IconLink, { LinkIconsEnum } from "@/components/IconLink/IconLink";
import clsx from "clsx";

type ProjectCardProps = {
	projectData: ProjectData;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
	const links = projectData.links || {};
	const validLinks = Object.keys(links).filter((link) =>
		Object.values(LinkIconsEnum).includes(link as LinkIconsEnum),
	);
	const hasLinks = validLinks.length > 0;

	return (
		<div className={styles.projectCard}>
			<div className={styles.projectCard__background} />
			<div className="relative z-10 w-full">
				<div className="flex justify-between items-center">
					<h3 className="mb-1 text-4xl font-light tracking-tight text-white ml-8">
						{projectData.name}
					</h3>
					{hasLinks && (
						<div className="flex justify-end items-end">
							<ConcaveRadius anchor="bottomRight" />
							<div className="flex justify-end gap-1.5 bg-white px-3 py-1 rounded-t-(--border-radius)">
								{validLinks.map((link) => (
									<IconLink
										key={link}
										href={links[link]}
										icon={link as LinkIconsEnum}
									/>
								))}
							</div>
						</div>
					)}
				</div>

				<div
					className={clsx(
						"bg-white px-8 pt-5 pb-4 transition-colors",
						hasLinks
							? "rounded-tl-(--border-radius)"
							: "rounded-t-(--border-radius)",
					)}
				>
					<div className="flex flex-col justify-between">
						<div>
							<div className="flex flex-wrap gap-1.5 mb-3">
								{projectData.tech_stack.map((tech) => (
									<TechIcon
										key={tech}
										variant="chip"
										name={tech}
										size="sm"
									/>
								))}
							</div>
							<p className="text-base text-neutral-600 line-clamp-3 mb-2 leading-relaxed">
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
