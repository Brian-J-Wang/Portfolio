import techIcons from "src/data/techIcons";

type Skill = {
	src: string;
	name: string;
	color: string;
};

type SkillCategory = {
	name: string;
	skills: (keyof typeof techIcons)[];
};

export const skillCategories: SkillCategory[] = [
	{
		name: "Languages",
		skills: ["javascript", "typescript", "csharp"],
	},
	{
		name: "Frontend",
		skills: ["astro", "react", "html", "css"],
	},
	{
		name: "Backend",
		skills: ["nodejs", "express", "mongodb"],
	},
	{
		name: "Infrastructure",
		skills: ["cloudflare", "googleCloud", "git"],
	},
	{
		name: "Other",
		skills: ["camera", "video"],
	},
];
