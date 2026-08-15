import styles from "./display.module.css";
import clsx from "clsx";

import Inset from "@components/inset/inset";
import { skillCategories } from "../skills";
import { useRef, useState, type RefObject } from "react";
import { colord } from "colord";
import type { TechIcon } from "@lib/technologies/technologies.types";
import techIcons, {
	type ValidTechIcons,
} from "@lib/technologies/technologies.data";
import RelevantProjects from "./relevantProjects";

const SkillDisplay: React.FC = () => {
	const [activeSkill, setActiveSkill] = useState<TechIcon | null>(null);
	const projectDisplay = useRef<HTMLDivElement>(
		null,
	) as RefObject<HTMLDivElement>;
	const arm = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	const iconWrapper = useRef<HTMLDivElement>(
		null,
	) as RefObject<HTMLDivElement>;

	const toggleSkillChip =
		(skill: TechIcon) =>
		(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			setActiveSkill(skill);

			const projectDisplayBCR =
				projectDisplay.current.getBoundingClientRect();
			const iconElementBCR = evt.currentTarget.getBoundingClientRect();

			arm.current.style.translate = `0px ${iconElementBCR.y - projectDisplayBCR.y}px`;
			arm.current.style.height = `${iconElementBCR.height}px`;
			arm.current.style.width = `${Math.abs(iconElementBCR.x - projectDisplayBCR.x)}px`;

			projectDisplay.current.style.setProperty(
				"--background-color",
				colord(skill.color).alpha(0.2).toHex(),
			);
			projectDisplay.current.style.setProperty(
				"--background-color-dark",
				colord(skill.color).alpha(0.4).toHex(),
			);

			iconWrapper.current.style.width = `${iconElementBCR.width}px`;
			iconWrapper.current.style.height = `${iconElementBCR.height}px`;
		};

	return (
		<div className="flex gap-8">
			<div className="flex-1">
				<div className="mb-8 px-12">
					<h2 className="text-6xl text-center mb-6">My Stack</h2>
					<p>
						These are the tools and technologies I use to build
						modern applications. Why don't you click around and see
						which projects I've done that uses them?
					</p>
				</div>
				<div className="flex flex-col gap-8 items-center pb-12">
					<div>
						{skillCategories.map((category) => {
							return (
								<div
									className="select-none"
									key={category.name}
								>
									<h3 className="mb-2 text-neutral-600">
										{category.name}
									</h3>
									<div className="flex gap-4">
										{category.skills.map((skill) => {
											const techIcon =
												techIcons[
													skill as ValidTechIcons
												];
											return (
												<div
													style={
														{
															"--hover-color":
																colord(
																	techIcon.color,
																)
																	.alpha(0.1)
																	.toHex(),
															"--active-color":
																colord(
																	techIcon.color,
																)
																	.alpha(0.2)
																	.toHex(),
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
													<p className="uppercase text-xs">
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
				ref={projectDisplay}
			>
				<div
					ref={arm}
					className={clsx("absolute right-full flex", styles.iconArm)}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={clsx(
							styles.iconWrapperInset,
							"absolute right-0 -translate-y-full",
						)}
					>
						<path d="M20 20H0C11.0457 20 20 11.0457 20 0V20Z" />
					</svg>

					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={clsx(
							styles.iconWrapperInset,
							"absolute right-0 bottom-0 translate-y-full",
						)}
					>
						<path d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z" />
					</svg>

					<div className={styles.iconWrapper} ref={iconWrapper}>
						{}
					</div>
				</div>

				{activeSkill ? (
					<>
						<Inset
							position="top-left"
							className={styles.projectShowcase__inset}
						>
							Projects that uses {activeSkill?.name}
						</Inset>
						<div className="pt-16 px-4">
							<RelevantProjects
								tagFilter={activeSkill.name as ValidTechIcons}
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
