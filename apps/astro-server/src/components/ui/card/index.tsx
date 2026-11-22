import {
	Children,
	isValidElement,
	useEffect,
	useRef,
	type ComponentProps,
	type ReactElement,
} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type InsetAnchor = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

type CardInsetProps = ComponentProps<"div"> & {
	anchor?: InsetAnchor;
};

function CardInset({
	anchor = "bottomRight",
	className,
	...props
}: CardInsetProps) {
	return (
		<div
			data-slot="card-inset"
			data-inset-anchor={anchor}
			className={clsx(
				styles["card-inset"],
				styles[`card-inset--${anchor}`],
				className,
			)}
			{...props}
		/>
	);
}

function Card({ className, children, ...props }: ComponentProps<"div">) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const insetRef = useRef<HTMLDivElement>(null);

	const childArray = Children.toArray(children);
	const insetElement = childArray.find(
		(child): child is ReactElement<CardInsetProps> =>
			isValidElement<CardInsetProps>(child) && child.type === CardInset,
	);
	const cardChildren = childArray.filter((child) => child !== insetElement);

	const hasInset = Boolean(insetElement);
	const activeAnchor: InsetAnchor =
		insetElement?.props.anchor ?? "bottomRight";

	useEffect(() => {
		if (!hasInset) return;
		const wrapper = wrapperRef.current;
		const insetEl = insetRef.current;
		if (!wrapper || !insetEl) return;

		const updateSize = () => {
			wrapper.style.setProperty("--inset-w", `${insetEl.offsetWidth}px`);
			wrapper.style.setProperty("--inset-h", `${insetEl.offsetHeight}px`);
		};

		updateSize();
		const observer = new ResizeObserver(updateSize);
		observer.observe(insetEl);

		return () => observer.disconnect();
	}, [hasInset, activeAnchor]);

	if (!insetElement) {
		return (
			<div
				data-slot="card"
				className={clsx(styles.card, className)}
				{...props}
			>
				{children}
			</div>
		);
	}

	return (
		<div ref={wrapperRef} className={styles["card-wrapper"]}>
			<div
				data-slot="card"
				data-inset-anchor={activeAnchor}
				className={clsx(styles.card, styles["card-masked"], className)}
				{...props}
			>
				{cardChildren}
			</div>
			<div
				ref={insetRef}
				data-slot="card-inset"
				className={clsx(
					styles["card-inset"],
					styles[`card-inset--${activeAnchor}`],
					insetElement.props.className,
				)}
			>
				{insetElement.props.children}
			</div>
		</div>
	);
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={clsx(styles["card-header"], className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={clsx(styles["card-title"], className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={clsx(styles["card-description"], className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={clsx(styles["card-action"], className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={clsx(styles["card-content"], className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={clsx(styles["card-footer"], className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardInset,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
