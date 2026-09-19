import type { SkillKeys } from "@/components/techIcon/skills";

type SkillCategory = {
	name: string;
	skills: SkillKeys[];
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
