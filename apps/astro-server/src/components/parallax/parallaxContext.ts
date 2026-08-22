import { createContext, useRef, type RefObject } from "react";

type ParallaxContextType = {
	frame?: HTMLDivElement;
	mouseOffset: { x: number; y: number };
};

const ParallaxContext = createContext<ParallaxContextType>({
	frame: undefined,
	mouseOffset: { x: 0, y: 0 },
});

export default ParallaxContext;
