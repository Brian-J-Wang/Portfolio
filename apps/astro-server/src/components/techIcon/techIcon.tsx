import { cva, type VariantProps } from "class-variance-authority";
import { TechSkill } from "./skills";
import clsx from "clsx";
import type React from "react";
import StackIcon from "tech-stack-icons";

const techIconVariants = cva("flex", {
	variants: {
		variant: {
			badge: "flex-col items-center",
			chip: "flex-row flex-nowrap whitespace-nowrap",
		},
		size: {
			sm: "h-6 p-1",
			md: "h-8 p-1.5",
			lg: "h-12 p-2",
			xl: "h-16 p-3",
		},
	},
	defaultVariants: {
		variant: "badge",
		size: "md",
	},
});

const textVariants = cva("whitespace-nowrap capitalize", {
	variants: {
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			xl: "text-xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type TechIconProps = VariantProps<typeof techIconVariants> & {
	name: string;
	className?: string;
	showName?: boolean;
	inactive?: boolean;
	onClick?: () => void;
};

const TechIcon: React.FC<TechIconProps> = ({
	variant,
	name,
	className,
	showName = false,
	inactive = false,
	size,
	onClick,
}) => {
	const { icon, backgroundColor } = new TechSkill(name);

	return (
		<div
			style={{
				backgroundColor: inactive ? "" : backgroundColor,
			}}
			className={clsx(
				techIconVariants({ variant, size }),
				"gap-2 items-center rounded-xs",
				className,
			)}
			onClick={onClick}
		>
			<StackIcon
				name={icon}
				className="h-full"
				variant={inactive ? "grayscale" : "light"}
			/>
			{showName && (
				<small className={textVariants({ size })}>{name}</small>
			)}
		</div>
	);
};

export default TechIcon;
