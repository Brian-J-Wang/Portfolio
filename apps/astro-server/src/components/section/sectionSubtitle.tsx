import type { PropsWithChildren } from "react";

type SectionSubtitleProps = PropsWithChildren & {};

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
	children,
}: SectionSubtitleProps) => {
	return <p className="text-left">{children}</p>;
};

export default SectionSubtitle;
