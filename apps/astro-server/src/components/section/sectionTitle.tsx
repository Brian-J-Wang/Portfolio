import type { PropsWithChildren } from "react";

type SectionTitleProps = PropsWithChildren & {};

const SectionTitle: React.FC<SectionTitleProps> = ({
	children,
}: SectionTitleProps) => {
	return <h2 className="text-5xl text-center mb-4">{children}</h2>;
};

export default SectionTitle;
