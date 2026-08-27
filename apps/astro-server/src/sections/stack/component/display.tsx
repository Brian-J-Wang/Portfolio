import styles from "./display.module.css";
import clsx from "clsx";
import Inset from "@components/inset/inset";
import { skillCategories } from "../skills";
import { useEffect, useReducer, useRef, useState, type RefObject } from "react";
import { colord } from "colord";
import type { TechIcon } from "@lib/technologies/technologies.types";
import techIcons, {
	type ValidTechIcons,
} from "@lib/technologies/technologies.data";
import RelevantProjects from "./relevantProjects";
import HighlightArm from "@components/highlightArm/highlightArm";
import type { Project } from "@/components/projects/project.types";

type SkillDisplayProps = {
	projects: Project[];
};

const SkillDisplay: React.FC<SkillDisplayProps> = ({ projects }) => {
	const [activeSkill, setActiveSkill] = useState<TechIcon | null>(null);
	const [highlightedElement, setHighlightedElement] =
		useState<HTMLElement | null>(null);

	const toggleSkillChip =
		(skill: TechIcon) =>
		(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			setActiveSkill(skill);
			setHighlightedElement(evt.currentTarget);
		};

	return (
		<div className="flex gap-8">
			<div className="flex-1">
				<div className="mb-8 px-12">
					<h2 className="text-center mb-6">My Stack</h2>
					<p>
						These are the tools and technologies I use to build
						modern applications. Why don't you click around and see
						which projects I've done that uses them?
					</p>
				</div>
				<div className="flex flex-col gap-8 items-center pb-12">
					<div id="SkillDisplay" className="">
						{skillCategories.map((category) => {
							return (
								<div
									className="select-none relative z-10 px-6 py-2"
									key={category.name}
								>
									<h3 className="mb-2 text-neutral-900">
										{category.name}
									</h3>
									<div className="flex gap-4">
										{category.skills.map((skill) => {
											const techIcon =
												techIcons[
													skill as ValidTechIcons
												];
											const hoverColor = colord(
												techIcon.color,
											)
												.alpha(0.1)
												.toHex();
											const activeColor = colord(
												techIcon.color,
											)
												.alpha(0.2)
												.toHex();
											return (
												<div
													style={
														{
															"--hover-color":
																hoverColor,
															"--active-color":
																activeColor,
														} as React.CSSProperties
													}
													className={clsx(
														`flex flex-col justify-center items-center gap-2 min-w-16 
													min-h-16 p-2 rounded-sm relative z-10`,
														activeSkill?.name !=
															techIcon.name &&
															"hover:bg-(--hover-color)",
													)}
													key={techIcon.name}
													onMouseDown={toggleSkillChip(
														techIcon,
													)}
												>
													<img
														src={techIcon.icon}
														alt={techIcon.name}
														className="w-8 h-8"
													/>
													<p className="uppercase text-xs text-neutral-950">
														{techIcon.name}
													</p>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div
				className={clsx(
					"flex flex-col flex-1 relative rounded-2xl",
					styles.projectShowcase,
				)}
				style={
					{
						"--background-color": activeSkill?.color
							? colord(activeSkill.color).alpha(0.2).toHex()
							: "var(--color-neutral-50)",
						"--background-color-dark": activeSkill?.color
							? colord(activeSkill.color).alpha(0.4).toHex()
							: "",
					} as React.CSSProperties
				}
			>
				<HighlightArm
					anchor="left"
					highlightElement={highlightedElement}
					initialStyles={{
						translateX: 0,
						translateY: 197,
						height: 660,
						width: 120,
					}}
					id="highlightArm"
				/>

				{activeSkill ? (
					<>
						<Inset
							position="top-left"
							className={styles.projectShowcase__inset}
						>
							Projects that uses {activeSkill?.name}
						</Inset>
						<div className="flex flex-col gap-4 pt-16 px-4">
							<RelevantProjects
								tagFilter={activeSkill.name as ValidTechIcons}
								projects={projects.filter((project) =>
									project.project_data.tech_stack.includes(
										activeSkill.name,
									),
								)}
							/>
						</div>
					</>
				) : (
					<div className="text-center my-auto text-4xl text-neutral-200 px-24">
						Click on an icon to see the different projects that its
						used in.
					</div>
				)}
			</div>
		</div>
	);
};

export default SkillDisplay;
