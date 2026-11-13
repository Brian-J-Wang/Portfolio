import type { SvgComponent } from "astro/types";
import githubSVG from "./icons/github.svg";
import linkedinSVG from "./icons/linkedin.svg";
import siteSVG from "./icons/site.svg";

import type { PropsWithChildren } from "react";
import type { ProjectLink } from "../projects/project.types";

type LinkType = ProjectLink | "linkedin";

const linkIconMap: Record<
	LinkType,
	{
		src: SvgComponent & ImageMetadata;
		alt: string;
	}
> = {
	linkedin: { src: linkedinSVG, alt: "linkedin" },
	github: { src: githubSVG, alt: "github" },
	live: { src: siteSVG, alt: "live" },
};

type LinkProps = PropsWithChildren & {
	type: LinkType;
	href: string;
};

const IconLink: React.FC<LinkProps> = ({ href, type }) => {
	const { src, alt } = linkIconMap[type];

	return (
		<a
			className="w-11 h-11 p-2.5 rounded-full select-none transition-colors hover:bg-neutral-100"
			href={href}
			target="_blank"
		>
			<img className="w-full h-full" src={src.src} alt={alt} />
		</a>
	);
};

export default IconLink;
