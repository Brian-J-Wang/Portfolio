import { cva, type VariantProps } from "class-variance-authority";
import { TechSkill } from "./skills";
import { cn } from "@/lib/utils";

const techIconVariants = cva("flex", {
	variants: {
		variant: {
			card: "flex-col",
			chip: "flex-row",
		},
	},
});

type TechIconProps = VariantProps<typeof techIconVariants> & {
	name: string;
	showName?: boolean;
};

const TechIcon: React.FC<TechIconProps> = ({
	variant,
	name,
	showName = false,
}) => {
	const { icon, color, backgroundColor } = new TechSkill(name);

	return (
		<div
			style={{
				backgroundColor: backgroundColor,
			}}
			className={cn(
				techIconVariants({ variant }),
				"flex flex-row py-1 px-1.5 h-6 gap-2 items-center rounded-xs",
			)}
		>
			{icon && (
				<img
					src={icon}
					alt={`image of ${icon} icon`}
					className="h-full"
				/>
			)}
			{showName && <small className="whitespace-nowrap">{name}</small>}
		</div>
	);
};

export default TechIcon;
