import type { PropsWithChildren } from "react";

type SectionHeaderProps = PropsWithChildren & {};

const SectionHeader: React.FC<SectionHeaderProps> = ({
	children,
}: SectionHeaderProps) => {
	return <div className="mb-8">{children}</div>;
};

export default SectionHeader;
