import styles from "./experienceDisplay.module.css";
import TechChip from "@components/techChip/techChip";
import type { ValidTechIcons } from "@lib/technologies/technologies.data";

type ExperienceEntry = {
	company: string;
	role: string;
	period: string;
	location: string;
	description: string;
	highlights: string[];
	techStack: (ValidTechIcons | string)[];
};

const experiences: ExperienceEntry[] = [
	{
		company: "Freelance",
		role: "Full Stack Developer",
		period: "Jan 2023 – Present",
		location: "Remote",
		description:
			"Designed and deployed full-stack web applications for small businesses and personal projects, handling everything from architecture to deployment.",
		highlights: [
			"Delivered client projects end-to-end, from design mockups to production",
			"Containerized apps with Docker and deployed to cloud via CI/CD pipelines",
			"Built REST APIs with Express.js backed by PostgreSQL databases",
			"Created custom Astro-based portfolio sites with dynamic content management",
		],
		techStack: [
			"astro",
			"react",
			"nodejs",
			"docker",
			"postgresql",
			"github",
		],
	},
];

const ExperienceDisplay: React.FC = () => {
	const active = experiences[0];

	return (
		<div className="flex justify-center w-full">
			<div className={`${styles.detail} w-full max-w-[780px] px-12 py-10`}>
				<div className="flex items-start justify-between gap-4 mb-6">
					<div>
						<h3 className="font-bold text-neutral-900 mb-1.5 tracking-[-0.02em]">
							{active.role}
						</h3>
						<p className="m-0 text-base text-neutral-600">
							{active.company}
							<span className="text-neutral-400">
								&nbsp;·&nbsp;{active.location}
							</span>
						</p>
					</div>
					<span className="shrink-0 text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full whitespace-nowrap">
						{active.period}
					</span>
				</div>

				<p className="text-base text-neutral-600 leading-[1.7] mb-7">
					{active.description}
				</p>

				<ul className="list-none p-0 mb-8 flex flex-col gap-2.5">
					{active.highlights.map((h) => (
						<li key={h} className="flex items-start gap-3 text-base text-neutral-700 leading-[1.6]">
							<span className="shrink-0 w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
							{h}
						</li>
					))}
				</ul>

				<div className="flex flex-wrap gap-2">
					{active.techStack.map((tech) => (
						<TechChip
							key={tech}
							chip={tech}
							useSolidBackground={true}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExperienceDisplay;
