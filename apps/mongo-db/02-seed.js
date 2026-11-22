// FOR DEVELOPMENT ONLY
const projectDatabase = db.getSiblingDB("projects");
const now = new Date();

projectDatabase.projects.insertMany([
    {
        node_id: "portfolio-site",
        project_metadata: {
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
        project_content: {
            date_updated: now,
            content:
                "# Personal Portfolio & Showcase\n\nThis portfolio application was built to showcase software engineering projects with a focus on performance, clean typography, and interactive exploration. Using Astro for server-side rendering alongside React islands and Tailwind CSS, the site delivers fast initial page loads while still supporting dynamic client-side interactions like skill-based project filtering and custom negative-radius UI components.\n\nBehind the scenes, the frontend connects to a FastAPI backend backed by MongoDB and Beanie ODM. Project metadata and long-form writeups are synchronized automatically from GitHub repositories via webhook events, allowing each project's `portfolio.md` file to act as the single source of truth without manual database updates.\n\nFor local development and deployment, the entire stack is containerized with Docker Compose, separating the Astro frontend, FastAPI service, and MongoDB instance across isolated networks. Automated API type generation with `openapi-typescript` keeps the TypeScript client and Python schemas strictly aligned as the project evolves.",
        },
        created_at: now,
        updated_at: now,
    },
    {
        node_id: "agentic-evaluator",
        project_metadata: {
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
        project_content: {
            date_updated: now,
            content:
                "# Agentic Essay Evaluator\n\nThe Agentic Essay Evaluator is a full-stack academic writing assessment platform designed to provide structured, rubric-aligned feedback at scale. Built with React, TypeScript, Node.js, and Express, the application lets instructors upload custom grading rubrics and essay prompts while students receive detailed, actionable commentary on thesis clarity, evidence usage, and organization.\n\nInstead of relying on a single monolithic prompt, the backend orchestrates a multi-agent evaluation pipeline where specialized agents independently analyze grammar, argument structure, and rubric criteria before a synthesizer agent reconciles scores and generates final feedback. This modular workflow significantly improves scoring consistency and makes it easy to audit how each rubric dimension was graded.\n\nTo support real-time classroom usage, evaluation jobs are processed asynchronously with streaming progress updates to the frontend. Structured JSON validation ensures every model response conforms to strict rubric schemas before results are persisted and rendered in the instructor review dashboard.",
        },
        created_at: now,
        updated_at: now,
    },
    {
        node_id: "edge-analytics",
        project_metadata: {
            name: "Edge Analytics & Request Router",
            project_type: "work",
            description:
                "Low-latency serverless request routing and telemetry service deployed on Cloudflare Workers with automated geolocation caching and MongoDB persistence.",
            tech_stack: ["typescript", "cloudflare", "mongodb", "git"],
            links: [{ link_type: "github", href: "https://github.com" }],
            featured: false,
        },
        project_content: {
            date_updated: now,
            content:
                "# Edge Analytics & Request Router\n\nEdge Analytics & Request Router is a low-latency serverless gateway built on Cloudflare Workers and TypeScript to intelligently route incoming traffic and capture lightweight request telemetry at the network edge. By running routing logic close to end users, the service minimizes round-trip latency and offloads geolocation lookups from origin servers.\n\nIncoming requests are inspected for regional headers, cached routing rules, and rate-limit buckets before being forwarded to the optimal upstream target. Aggregated metrics—including status distributions, cache hit ratios, and p95 latency—are batched asynchronously and persisted to MongoDB so analytics collection never blocks the critical request path.\n\nThe project includes automated deployment pipelines and environment-isolated staging routes, allowing routing rule changes to be validated against synthetic traffic before rolling out globally.",
        },
        created_at: now,
        updated_at: now,
    },
    {
        node_id: "voxel-physics-engine",
        project_metadata: {
            name: "Cross-Platform Physics Engine",
            project_type: "personal",
            description:
                "A high-performance collision detection and constraint solver built in C# featuring spatial hashing, custom memory pools, and multi-threaded simulation steps.",
            tech_stack: ["csharp", "git"],
            links: [{ link_type: "github", href: "https://github.com" }],
            featured: false,
        },
        project_content: {
            date_updated: now,
            content:
                "# Cross-Platform Physics Engine\n\nThis project is a custom rigid-body and voxel physics engine written in C# with an emphasis on deterministic simulation and predictable memory behavior. It implements a two-phase collision pipeline using spatial hashing for broad-phase culling and an iterative impulse-based constraint solver for narrow-phase contact resolution.\n\nTo avoid garbage collection pauses during high-object-count scenes, the engine uses custom object pools and contiguous struct arrays for body state, contact manifolds, and solver islands. Independent simulation islands are dispatched across worker threads, enabling smooth frame times even with thousands of active colliding bodies.\n\nA lightweight debug renderer and benchmark harness accompany the core library, making it straightforward to profile broad-phase cell sizes, solver iteration counts, and stacking stability across platforms.",
        },
        created_at: now,
        updated_at: now,
    },
    {
        node_id: "gcloud-k8s-platform",
        project_metadata: {
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
        project_content: {
            date_updated: now,
            content:
                "# Cloud Infrastructure & Deployment Hub\n\nCloud Infrastructure & Deployment Hub is an automated container orchestration and release platform targeting Google Cloud. It standardizes how microservices are built, verified, and promoted across environments using declarative GitOps workflows and reproducible container images.\n\nEach service repository triggers automated build and security checks on push, publishing versioned artifacts and updating environment manifests for zero-downtime rolling deployments. Built-in health probes and automated rollback policies protect production workloads if error rates or startup latency spike after a release.\n\nA companion Node.js status dashboard aggregates deployment history, pod health, and rollout progress in one place so engineers can track releases without digging through raw cluster logs.",
        },
        created_at: now,
        updated_at: now,
    },
    {
        node_id: "canvas-visualizer",
        project_metadata: {
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
        project_content: {
            date_updated: now,
            content:
                "# Interactive SVG & Canvas Graph Studio\n\nInteractive SVG & Canvas Graph Studio is a browser-based tool for building, inspecting, and animating graph data structures and algorithms. Built with React, HTML5 Canvas, and SVG, it lets users create directed or weighted graphs interactively and step through traversals like BFS, DFS, Dijkstra's algorithm, and A* search.\n\nThe rendering layer pairs crisp SVG overlays for labels and interactive handles with an HTML5 Canvas layer for smooth pan, zoom, and high-frame-rate force-directed layout animations. Users can adjust simulation parameters in real time, pause mid-algorithm to inspect frontier queues, and export graphs as JSON or SVG.\n\nDesigned with responsive controls and keyboard shortcuts, the studio serves both as an educational visual aid and a quick scratchpad for prototyping network topologies.",
        },
        created_at: now,
        updated_at: now,
    },
]);
