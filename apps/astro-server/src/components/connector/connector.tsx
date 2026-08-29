import { cva } from "class-variance-authority";
import styles from "./connector.module.css";
import clsx from "clsx";
import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type RefObject,
} from "react";

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
	targetElement: HTMLElement | null;
	initialStyles?: InitialStyles;
	offset?: Offset;
	endStyle?: "negRadius" | "square" | "rounded" | "inherit";
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

const Connector: React.FC<HighlightArmProps> = ({
	targetElement,
	initialStyles,
	offset,
	endStyle = "rounded",
	...props
}) => {
	const arm = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	const [armStyles, setArmStyles] = useState<React.CSSProperties>({});

	useEffect(() => {
		if (!arm.current || !targetElement) {
			return;
		}

		const styles: React.CSSProperties = {};

		const targetBCR = targetElement.getBoundingClientRect();
		const parentBCR = arm.current.parentElement!.getBoundingClientRect();

		const armAnchorPosition = (() => {
			if (
				targetBCR.left > parentBCR.left &&
				targetBCR.right < parentBCR.right
			) {
				if (targetBCR.top < parentBCR.top) {
					return "top";
				} else if (targetBCR.bottom > parentBCR.bottom) {
					return "bottom";
				}
			} else if (
				targetBCR.top > parentBCR.top &&
				targetBCR.bottom < parentBCR.bottom
			) {
				if (targetBCR.left < parentBCR.left) {
					return "left";
				} else if (targetBCR.right > parentBCR.right) {
					return "right";
				}
			}
		})();

		switch (armAnchorPosition) {
			case "top":
				styles.bottom = "100%";
				styles.width = targetBCR.width;
				styles.height = parentBCR.top - targetBCR.top;
				styles.translate = `0px 0px`;
				break;
			case "bottom":
				styles.bottom = 0;
				break;
			case "left":
				styles.right = "100%";
				styles.translate = `0px ${-(parentBCR.top - targetBCR.top)}px`;
				styles.height = targetBCR.height;
				styles.width = Math.abs(targetBCR.left - parentBCR.left);
				styles.borderRadius = "16px 0px 0px 16px";
				break;
			case "right":
				styles.right = 0;
				break;
			default:
				break;
		}

		styles.backgroundColor = "var(--background-color)";

		console.log(styles);

		setArmStyles(styles);
	}, [targetElement]);

	return (
		<div
			{...props}
			ref={arm}
			className={clsx("absolute flex", styles.arm, props.className)}
			style={{
				...props.style,
				...armStyles,
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
					armStyles.inset,
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
					armStyles.inset,
				)}
			>
				<path d="M20 20H0C11.0457 20 20 11.0457 20 0V20Z" />
			</svg>
			{/* <div
				ref={iconWrapper}
				className={clsx(styles.highlight, "highlightWrapper")}
				style={{
					width: `${armStyles.wrapperWidth}px`,
					height: `${armStyles.wrapperHeight}px`,
				}}
			></div> */}
		</div>
	);
};

export default Connector;
