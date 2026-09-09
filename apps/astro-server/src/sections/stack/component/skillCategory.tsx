import type { PropsWithChildren } from "react";

type SkillCategoryProps = PropsWithChildren & {
	category: string;
};

const SkillCategory: React.FC<SkillCategoryProps> = ({
	category,
	children,
}) => {
	return (
		<div>
			<h3 className="font-bold text-neutral-900">{category}</h3>
			<div className="flex gap-4">{children}</div>
		</div>
	);
};

export default SkillCategory;
