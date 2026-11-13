import type { Project } from "@/components/projects/project.types";

export const defaultProjects: Project[] = [
	{
		node_id: "portfolio-site",
		project_data: {
			name: "Personal Portfolio & Showcase",
			project_type: "personal",
			description:
				"A modern, responsive portfolio built with Astro, React, and Tailwind CSS. Features dynamic skill filtering, custom negative-radius UI elements, and fast SSR page delivery.",
			tech_stack: ["astro", "react", "typescript", "css3"],
			links: [
				{ link_type: "github", href: "https://github.com" },
				{ link_type: "live", href: "https://brianwang.dev" },
			],
			featured: true,
		},
	},
	{
		node_id: "agentic-evaluator",
		project_data: {
			name: "Agentic Essay Evaluator",
			project_type: "work",
			description:
				"Full-stack evaluation engine for academic writing leveraging multi-agent AI workflows, structured rubric feedback generation, and automated scoring pipelines.",
			tech_stack: ["react", "typescript", "nodejs", "expressjs"],
			links: [
				{ link_type: "github", href: "https://github.com" },
				{ link_type: "live", href: "https://evaluator.example.com" },
			],
			featured: true,
		},
	},
	{
		node_id: "edge-analytics",
		project_data: {
			name: "Edge Analytics & Request Router",
			project_type: "work",
			description:
				"Low-latency serverless request routing and telemetry service deployed on Cloudflare Workers with automated geolocation caching and MongoDB persistence.",
			tech_stack: ["typescript", "cloudflare", "mongodb", "git"],
			links: [{ link_type: "github", href: "https://github.com" }],
			featured: false,
		},
	},
	{
		node_id: "voxel-physics-engine",
		project_data: {
			name: "Cross-Platform Physics Engine",
			project_type: "personal",
			description:
				"A high-performance collision detection and constraint solver built in C# featuring spatial hashing, custom memory pools, and multi-threaded simulation steps.",
			tech_stack: ["csharp", "git"],
			links: [{ link_type: "github", href: "https://github.com" }],
			featured: false,
		},
	},
	{
		node_id: "gcloud-k8s-platform",
		project_data: {
			name: "Cloud Infrastructure & Deployment Hub",
			project_type: "work",
			description:
				"Automated container deployment architecture orchestrating containerized microservices on Google Cloud with GitOps pipelines and zero-downtime rolling updates.",
			tech_stack: ["gcloud", "git", "nodejs"],
			links: [
				{ link_type: "github", href: "https://github.com" },
				{ link_type: "live", href: "https://cloud.google.com" },
			],
			featured: false,
		},
	},
	{
		node_id: "canvas-visualizer",
		project_data: {
			name: "Interactive SVG & Canvas Graph Studio",
			project_type: "personal",
			description:
				"Interactive browser-based visualization tool for node-graph layouts and algorithmic data structures with smooth animations and responsive SVG rendering.",
			tech_stack: ["js", "html5", "css3", "react"],
			links: [
				{ link_type: "github", href: "https://github.com" },
				{ link_type: "live", href: "https://graph-studio.example.com" },
			],
			featured: false,
		},
	},
];
