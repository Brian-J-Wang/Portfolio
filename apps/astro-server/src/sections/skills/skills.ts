type SkillCategory = {
	name: string;
	skills: string[];
};

export const skillCategories: SkillCategory[] = [
	{
		name: "Languages",
		skills: ["js", "typescript", "csharp"],
	},
	{
		name: "Frontend",
		skills: ["astro", "react", "html5", "css3"],
	},
	{
		name: "Backend",
		skills: ["nodejs", "expressjs", "mongodb"],
	},
	{
		name: "Infrastructure",
		skills: ["cloudflare", "gcloud", "git"],
	},
];
