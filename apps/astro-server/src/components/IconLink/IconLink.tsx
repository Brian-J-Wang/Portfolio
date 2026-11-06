import type { SvgComponent } from "astro/types";
import githubSVG from "./icons/github.svg";
import linkedinSVG from "./icons/linkedin.svg";
import siteSVG from "./icons/site.svg";

import type { PropsWithChildren } from "react";

export enum LinkIconsEnum {
	linkedin = "linkedin",
	github = "github",
	site = "site",
}

const linkIconMap: Record<
	LinkIconsEnum,
	{
		src: SvgComponent & ImageMetadata;
		alt: string;
	}
> = {
	linkedin: { src: linkedinSVG, alt: "linkedin" },
	github: { src: githubSVG, alt: "github" },
	site: { src: siteSVG, alt: "site" },
};

type LinkProps = PropsWithChildren & {
	icon: "linkedin" | "github" | "site";
	href: string;
};

const IconLink: React.FC<LinkProps> = ({ href, icon }) => {
	const { src, alt } = linkIconMap[icon];

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
