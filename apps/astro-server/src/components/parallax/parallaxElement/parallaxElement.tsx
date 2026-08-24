import type { PropsWithChildren } from "react";

type ParallaxElementProps = PropsWithChildren & {
	children: React.ReactNode;
};

const ParallaxElement: React.FC<ParallaxElementProps> = ({ children }) => {
	return <div className="parallax-element">{children}</div>;
};

export default ParallaxElement;
