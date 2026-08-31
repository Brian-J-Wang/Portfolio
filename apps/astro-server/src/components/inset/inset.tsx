import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import ConcaveRadius from "../concaveRadius/concaveRadius";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface InsetProps {
	className?: string;
	anchor: Position;
	children: ReactNode;
}

const insetVariants = cva(
	"min-h-(calc(var(--inset-radius) * 2)) min-w-(calc(var(--inset-radius) * 2)) absolute bg-neutral-50 w-fit h-fit",
	{
		variants: {
			anchor: {
				topLeft: "top-0 left-0 rounded-br-(--inset-radius)",
				topRight: "top-0 right-0 rounded-bl-(--inset-radius)",
				bottomLeft: "bottom-0 left-0 rounded-tr-(--inset-radius)",
				bottomRight: "bottom-0 right-0 rounded-tl-(--inset-radius)",
			},
		},
	},
);

const concaveRadiusClasses = {
	top: {
		topLeft: "top-0 right-0 translate-x-full",
		topRight: "top-0 right-0 -translate-x-full",
		bottomLeft: "top-0 left-0 -translate-y-full",
		bottomRight: "top-0 right-0 -translate-y-full",
	},
	bottom: {
		topLeft: "bottom-0 left-0 translate-y-full",
		topRight: "bottom-0 right-0 translate-y-full",
		bottomLeft: "bottom-0 right-0 translate-x-full",
		bottomRight: "bottom-0 left-0 -translate-x-full",
	},
};

export default function Inset({ className, anchor, children }: InsetProps) {
	return (
		<div className={insetVariants({ anchor })}>
			<ConcaveRadius
				anchor={anchor}
				size="medium"
				className={clsx(
					"absolute",
					concaveRadiusClasses["top"][anchor],
				)}
			/>
			<div className={className}>{children}</div>
			<ConcaveRadius
				anchor={anchor}
				size="medium"
				className={clsx(
					"absolute",
					concaveRadiusClasses["bottom"][anchor],
				)}
			/>
		</div>
	);
}
