import clsx from "clsx";
import { useRef, type RefObject } from "react";

type HighlightArmProps = {
	anchor: "top" | "right" | "bottom" | "left";
	highlightElement: RefObject<HTMLDListElement>;
};
/**
 * Highlights an element, requires that the parent container is relatively positioned.
 * @returns ReactNode
 */
const HighlightArm: React.FC<HighlightArmProps> = (props) => {
	const arm = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	const iconWrapper = useRef<HTMLDivElement>(
		null,
	) as RefObject<HTMLDivElement>;

	return (
		<div
			ref={arm}
			className={clsx("absolute right-full flex", styles.iconArm)}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={clsx(
					styles.iconWrapperInset,
					"absolute right-0 -translate-y-full",
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
					styles.iconWrapperInset,
					"absolute right-0 bottom-0 translate-y-full",
				)}
			>
				<path d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z" />
			</svg>

			<div className={styles.iconWrapper} ref={iconWrapper}></div>
		</div>
	);
};
