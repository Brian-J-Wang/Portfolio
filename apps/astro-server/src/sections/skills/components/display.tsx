import styles from "./display.module.css";
import clsx from "clsx";
import { skillCategories } from "../skills";
import { useRef } from "react";
import type { Project } from "@/components/projects/project.types";
import TechIcon from "@/components/techIcon/techIcon";
import useList from "@/hooks/useList";
import ProjectCard from "./projectCard/projectCard";

type SkillDisplayProps = {
	projects: Project[];
};

const SkillDisplay: React.FC<SkillDisplayProps> = ({ projects }) => {
	const { list: activeSkills, toggle } = useList<string>([]);

	const filteredProjects = projects.filter((project) => {
		return project.project_data.tech_stack.includes;
	});

	return (
		<div className="flex flex-col gap-8">
			<div className="flex-1">
				<div className="flex flex-row gap-16 items-center justify-center mt-8">
					{skillCategories.map((category) => {
						return (
							<div
								className="select-none relative z-10"
								key={category.name}
							>
								<h3 className="mb-2 text-neutral-400 text-base text-center">
									{category.name}
								</h3>
								<div className="flex gap-3">
									{category.skills.map((skill) => (
										<TechIcon
											variant="badge"
											size="xl"
											name={skill}
											key={skill}
											inactive={
												!activeSkills.includes(skill)
											}
											className={styles.skillBadge}
											onClick={() => toggle(skill)}
										/>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex gap-8">
				{Array.from({ length: 2 }).map((_, idx) => {
					const project = projects[idx];
					return (
						<ProjectCard
							projectData={project.project_data}
							key={project.node_id}
						/>
					);
				})}
			</div>
			<div className="text-center">
				<a
					className="text-xl opacity-50 hover:opacity-80 cursor-pointer"
					href="/projects"
				>
					View More Projects
				</a>
			</div>
		</div>
	);
};

export default SkillDisplay;
