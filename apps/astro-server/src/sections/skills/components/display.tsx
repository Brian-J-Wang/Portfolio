import styles from "./display.module.css";
import clsx from "clsx";
import { skillCategories } from "../skills";
import { defaultProjects } from "../defaultProjects";
import type { Project } from "@/components/projects/project.types";
import TechIcon from "@/components/techIcon/techIcon";
import useList from "@/hooks/useList";
import ProjectCarousel from "./projectCarousel/projectCarousel";

type SkillDisplayProps = {
	projects?: Project[];
};

const SkillDisplay: React.FC<SkillDisplayProps> = ({ projects = [] }) => {
	const { list: activeSkills, toggle, clear } = useList<string>([]);

	const availableProjects = projects.length > 0 ? projects : defaultProjects;

	const filteredProjects =
		activeSkills.length === 0
			? availableProjects
			: availableProjects.filter((project) =>
					project?.project_data?.tech_stack?.some((tech) =>
						activeSkills.some(
							(skill) =>
								skill.toLowerCase() === tech.toLowerCase(),
						),
					),
				);

	return (
		<div className="flex flex-row gap-8 items-start">
			{/* Left Column: Skill Icons by Category */}
			<aside className="px-8 shrink-0 select-none">
				<div className="flex flex-col md:flex-row gap-4 md:gap-16 mb-8 items-start md:items-center">
					<h2 className="text-nowrap">Skills & Tools</h2>
				</div>
				<div className={styles.skillsSidebar}>
					{skillCategories.map((category) => (
						<div
							key={category.name}
							className="flex flex-col gap-2"
						>
							<h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
								{category.name}
							</h3>
							<div className="flex flex-wrap gap-2.5">
								{category.skills.map((skill) => {
									const isSelected =
										activeSkills.includes(skill);
									const isInactive =
										activeSkills.length > 0 && !isSelected;

									return (
										<TechIcon
											variant="badge"
											size="lg"
											name={skill}
											key={skill}
											inactive={isInactive}
											className={clsx(
												styles.skillBadge,
												"cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95",
												isSelected &&
													"ring-2 ring-secondary ring-offset-2 shadow-sm",
											)}
											onClick={() => toggle(skill)}
										/>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</aside>

			<div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
				{filteredProjects.length === 0 ? (
					<div className="text-center py-12 px-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50">
						<p className="text-lg font-medium text-neutral-700 mb-1">
							No projects match the selected skills.
						</p>
						<p className="text-sm text-neutral-500 mb-4">
							Try choosing another skill or reset the active
							filter.
						</p>
						<button
							type="button"
							onClick={() => clear()}
							className="px-4 py-1.5 text-sm font-medium bg-neutral-800 text-neutral-50 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
						>
							Clear all filters
						</button>
					</div>
				) : (
					<ProjectCarousel projects={filteredProjects} />
				)}
			</div>
		</div>
	);
};

export default SkillDisplay;
