const linkIcons = {
	repo: "github.svg",
	live: "link-external.svg",
	default: "link-external.svg",
};

export function getLinkIcon(link: string) {
	if (link in linkIcons) {
		return linkIcons[link as keyof typeof linkIcons];
	} else {
		return linkIcons.default;
	}
}

export default getLinkIcon;
