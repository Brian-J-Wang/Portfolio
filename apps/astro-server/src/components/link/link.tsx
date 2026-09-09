import type { PropsWithChildren } from "react";

type LinkProps = PropsWithChildren & {
	href: string;
};

const Link: React.FC<LinkProps> = ({ href, children }) => {
	return <a href={href}>{children}</a>;
};

export default Link;
