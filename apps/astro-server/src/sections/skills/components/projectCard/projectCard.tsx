import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./projectCard.module.css";
import ConcaveRadius from "@/components/concaveRadius/concaveRadius";
import TechIcon from "@/components/techIcon/techIcon";
import type { ProjectData } from "@/features/projects/project.types";
import IconLink from "@/components/IconLink/IconLink";

type ProjectCardProps = {
	projectData: ProjectData;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
	const titleContainerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [overflowDistance, setOverflowDistance] = useState(0);

	useEffect(() => {
		const container = titleContainerRef.current;
		const title = titleRef.current;
		if (!container || !title) return;

		const measure = () => {
			const overflow = Math.ceil(
				title.scrollWidth - container.clientWidth,
			);
			setOverflowDistance(overflow > 0 ? overflow : 0);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(container);
		observer.observe(title);

		return () => observer.disconnect();
	}, [projectData.name]);

	const marqueeStyle =
		overflowDistance > 0
			? ({
					"--marquee-distance": `${overflowDistance}px`,
					"--marquee-duration": `${Math.max(4, overflowDistance / 35)}s`,
				} as React.CSSProperties)
			: undefined;

	return (
		<div className={styles.projectCard}>
			<div className={styles.projectCard__background} />
			<div className="relative z-10 w-full">
				<div className="flex justify-between items-center">
					<div
						ref={titleContainerRef}
						className={styles.projectCard__titleWrapper}
					>
						<h3
							ref={titleRef}
							style={marqueeStyle}
							className={clsx(
								styles.projectCard__title,
								overflowDistance > 0 &&
									styles["projectCard__title--marquee"],
							)}
						>
							{projectData.name}
						</h3>
					</div>
					{projectData.links && (
						<div className="flex justify-end items-end shrink-0 relative">
							<ConcaveRadius
								anchor="bottomRight"
								className="absolute bottom-0 -left-4"
							/>
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
