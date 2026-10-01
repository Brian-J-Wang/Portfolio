import { colord } from "colord";
import type { IconName } from "tech-stack-icons";

type TechStackSkills = Record<
	IconName,
	{
		bg: string;
		displayName: string;
		iconOverride?: string;
	}
>;

const techStackSkills: TechStackSkills = {
	astro: {
		bg: "#ff5d01",
		displayName: "Astro",
	},
	css3: {
		bg: "#1572B6",
		displayName: "CSS3",
	},
	csharp: {
		bg: "#512BD4",
		displayName: "C#",
	},
	cloudflare: {
		bg: "#F38020",
		displayName: "Cloudflare",
	},
	expressjs: {
		bg: "#000000",
		displayName: "ExpressJS",
		iconOverride: "Express.svg",
	},
	figma: {
		bg: "#F24E1E",
		displayName: "Figma",
	},
	git: {
		bg: "#F05032",
		displayName: "Git",
	},
	gcloud: {
		bg: "#4285F4",
		displayName: "Google Cloud",
	},
	html5: {
		bg: "#E34F26",
		displayName: "HTML5",
	},
	js: {
		bg: "#F7DF1E",
		displayName: "JavaScript",
	},
	mongodb: {
		bg: "#47A248",
		displayName: "MongoDB",
	},
	nodejs: {
		bg: "#339933",
		displayName: "Node.js",
	},
	react: {
		bg: "#61DAFB",
		displayName: "React",
	},
	typescript: {
		bg: "#3178C6",
		displayName: "TypeScript",
	},
};

export class TechSkill {
	icon: IconName;
	color: string;
	backgroundColorSolid: string;
	backgroundColor: string;
	textColor: string;
	name: string;
	iconOverride?: string;

	constructor(techName: IconName) {
		const { bg, displayName, iconOverride } = techStackSkills[techName] ?? {
			bg: "#00000000",
			displayName: techName,
		};

		this.iconOverride = iconOverride;
		this.icon = techName;
		this.color = bg;
		this.backgroundColorSolid = colord(this.color).alpha(0.25).toHex();
		this.backgroundColor = colord(this.color).alpha(0.25).toHex();
		this.textColor = colord(this.color).darken(0.4).toHex();
		this.name = displayName;
	}
}
