import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const concaveRadiusVariants = cva("", {
	variants: {
		anchor: {
			topLeft: "",
			topRight: "rotate-90",
			bottomLeft: "rotate-270",
			bottomRight: "rotate-180",
		},
		size: {
			small: "size-2",
			medium: "size-4",
			large: "size-6",
		},
	},
	defaultVariants: {
		anchor: "topLeft",
		size: "medium",
	},
});

type ConcaveRadiusProps = VariantProps<typeof concaveRadiusVariants> &
	React.SVGProps<SVGSVGElement>;

/**
 * Creates a concave radius that is used to create cutouts in the layout.
 *
 * @param anchor - the point where the flat edges of the concave radius meets
 * @param size - the size of the concave radius
 * @param className - additional classes to apply to the SVG
 * @param props - additional props to apply to the SVG
 *
 * @example
 * ```tsx
 * <ConcaveRadius anchor="top-left" size="small" />
 * ```
 *
 * CSS Variables for Styling
 *  - --background-color: colors the main element and the negativeRadii;
 */
const ConcaveRadius: React.FC<ConcaveRadiusProps> = ({
	anchor,
	size,
	className,
	...props
}) => {
	return (
		<svg
			{...props}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			className={clsx(concaveRadiusVariants({ anchor, size }), className)}
		>
			<path d="M20 0C8.95431 0 0 8.95431 0 20V0H20Z" fill="#fffcfa" />
		</svg>
	);
};

export default ConcaveRadius;
