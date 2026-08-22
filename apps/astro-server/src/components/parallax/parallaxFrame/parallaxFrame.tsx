import { useEffect, useRef, type PropsWithChildren } from "react";
import ParallaxContext from "../parallaxContext";

type ParallaxFrameProps = PropsWithChildren & {};

const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
	children,
	...props
}) => {
	const frame = useRef<HTMLDivElement>(null);
	const mouseOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
            window.innerWidth
			mouseOffset.current = {
				x: e.clientX,
				y: e.clientY,
			};
		};

		document.addEventListener("mousemove", onMouseMove);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	return (
		<ParallaxContext
			value={{
				frame: frame.current!,
				mouseOffset: {
					x: 0,
					y: 0,
				},
			}}
		>
			<div {...props} ref={frame}>
				{children}
			</div>
		</ParallaxContext>
	);
};
