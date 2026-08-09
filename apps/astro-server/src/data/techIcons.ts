export type TechIcon = {
	icon: string;
	color: string;
	name: string;
};

export const techIcons: Record<string, TechIcon> = {
	astro: {
		icon: "icons/Astro.svg",
		color: "#ff5d01",
		name: "Astro",
	},
	css: {
		icon: "icons/CSS3.svg",
		color: "#1572B6",
		name: "CSS3",
	},
	csharp: {
		icon: "icons/CSharp.svg",
		color: "#512BD4",
		name: "C#",
	},
	cloudflare: {
		icon: "icons/Cloudflare.svg",
		color: "#F38020",
		name: "Cloudflare",
	},
	express: {
		icon: "icons/Express.svg",
		color: "#000000",
		name: "ExpressJS",
	},
	figma: {
		icon: "icons/Figma.svg",
		color: "#F24E1E",
		name: "Figma",
	},
	git: {
		icon: "icons/Git.svg",
		color: "#F05032",
		name: "Git",
	},
	googleCloud: {
		icon: "icons/Google Cloud.svg",
		color: "#4285F4",
		name: "Google Cloud",
	},
	html: {
		icon: "icons/HTML5.svg",
		color: "#E34F26",
		name: "HTML5",
	},
	javascript: {
		icon: "icons/JavaScript.svg",
		color: "#F7DF1E",
		name: "JavaScript",
	},
	mongodb: {
		icon: "icons/MongoDB.svg",
		color: "#47A248",
		name: "MongoDB",
	},
	nodejs: {
		icon: "icons/Node.js.svg",
		color: "#339933",
		name: "Node.js",
	},
	react: {
		icon: "icons/React.svg",
		color: "#61DAFB",
		name: "React",
	},
	typescript: {
		icon: "icons/TypeScript.svg",
		color: "#3178C6",
		name: "TypeScript",
	},
	video: {
		icon: "icons/gridicons--video.svg",
		color: "#888888",
		name: "Video Editing",
	},
	camera: {
		icon: "icons/mdi--camera.svg",
		color: "#888888",
		name: "Photography",
	},
};

export default techIcons;
