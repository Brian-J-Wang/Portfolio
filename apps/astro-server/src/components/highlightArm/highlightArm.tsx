import styles from "./highlightArm.module.css";
import clsx from "clsx";
import { useRef, type RefObject } from "react";

type Offset = {
	x?: number;
	y?: number;
};

type InitialStyles = {
	translateX?: number;
	translateY?: number;
	height?: number;
	width?: number;
};

type HighlightArmProps = React.ComponentPropsWithoutRef<"div"> & {
	anchor: "top" | "right" | "bottom" | "left";
	highlightElement: HTMLElement | null;
	initialStyles?: InitialStyles;
	offset?: Offset;
};

/**
 * Highlights an element, requires that the parent container is relatively positioned.
 * @returns ReactNode
 *
 * CSS Variables for Styling
 *  --background-color: colors the main element and the negativeRadii;
 *  --background-color-darl: colors the highlight arm;
 *  --corner-radius: sets the corner radius for the element and the negativeRadii;
 */

const HighlightArm: React.FC<HighlightArmProps> = ({
	anchor,
	highlightElement,
	initialStyles,
	offset,
	...props
}) => {
	const arm = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	const iconWrapper = useRef<HTMLDivElement>(
		null,
	) as RefObject<HTMLDivElement>;

	const armStyles = {
		translateX: initialStyles?.translateX ?? 0,
		translateY: initialStyles?.translateY ?? 0,
		height: initialStyles?.height ?? 0,
		width: initialStyles?.width ?? 0,
		wrapperWidth: 0,
		wrapperHeight: 0,
	};

	const armOffset = { x: offset?.x ?? 0, y: offset?.y ?? 0 };

	if (highlightElement && arm.current) {
		const highlightElementBCR = highlightElement.getBoundingClientRect();
		const parentContainerBCR =
			arm.current.parentElement!.getBoundingClientRect();

		armStyles.translateX = 0;
		armStyles.translateY = highlightElementBCR.y - parentContainerBCR.y;
		armStyles.height = highlightElementBCR.height;
		armStyles.width =
			Math.abs(highlightElementBCR.x - parentContainerBCR.x) -
			armOffset.x;

		armStyles.wrapperWidth = highlightElementBCR.width;
		armStyles.wrapperHeight = highlightElementBCR.height;
	}

	return (
		<div
			{...props}
			ref={arm}
			className={clsx(
				"absolute right-full flex",
				styles.arm,
				props.className,
			)}
			style={{
				...props.style,
				translate: `${armStyles.translateX}px ${armStyles.translateY + armOffset.y}px`,
				height: `${armStyles.height}px`,
				width: `${armStyles.width}px`,
			}}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={clsx(
					"absolute right-0 -translate-y-full",
					styles.inset,
				)}
			>
				<path d="M20 20H0C11.0457 20 20 11.0457 20 0V20Z" />
			</svg>

			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={clsx(
					"absolute right-0 bottom-0 translate-y-full -rotate-90",
					styles.inset,
				)}
			>
				<path d="M20 20H0C11.0457 20 20 11.0457 20 0V20Z" />
			</svg>
			<div
				ref={iconWrapper}
				className={clsx(styles.highlight, "highlightWrapper")}
				style={{
					width: `${armStyles.wrapperWidth}px`,
					height: `${armStyles.wrapperHeight}px`,
				}}
			></div>
		</div>
	);
};

export default HighlightArm;
