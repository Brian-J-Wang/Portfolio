import { cva, type VariantProps } from "class-variance-authority";
import { TechSkill } from "./skills";
import clsx from "clsx";
import type React from "react";

const techIconVariants = cva("flex", {
	variants: {
		variant: {
			card: "flex-col items-center",
			chip: "flex-row",
		},
	},
});

type TechIconProps = VariantProps<typeof techIconVariants> & {
	name: string;
	className?: string;
	showName?: boolean;
};

const TechIcon: React.FC<TechIconProps> = ({
	variant,
	name,
	className,
	showName = false,
}) => {
	const { icon, backgroundColor } = new TechSkill(name);

	return (
		<div
			style={{
				backgroundColor: backgroundColor,
			}}
			className={clsx(
				techIconVariants({ variant }),
				"flex flex-row py-1 px-1.5 h-6 gap-2 items-center rounded-xs",
				className,
			)}
		>
			{icon && (
				<img
					src={icon}
					alt={`image of ${icon} icon`}
					className="h-full"
				/>
			)}
			{showName && (
				<small className="whitespace-nowrap text-sm capitalize">
					{name}
				</small>
			)}
		</div>
	);
};

export default TechIcon;
