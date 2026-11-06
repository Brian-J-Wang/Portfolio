import { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./topography.module.css";
import vertexShaderSource from "./topography.vert.glsl?raw";
import fragmentShaderSource from "./topography.frag.glsl?raw";

export interface TopographyProps {
	className?: string;
	/** RGB normalized tuple [0..1, 0..1, 0..1] for background color (default: #fffcfa) */
	bgColor?: [number, number, number];
	/** RGB normalized tuple [0..1, 0..1, 0..1] for contour lines (default: subtle slate/neutral) */
	lineColor?: [number, number, number];
	/** Noise spatial frequency scale (default: 1.8) */
	scale?: number;
	/** Number of elevation contour intervals (default: 14.0) */
	levels?: number;
	/** Contour line thickness in pixels (default: 1.25) */
	lineWidth?: number;
}

function compileShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string,
): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(
			"WebGL shader compile error:",
			gl.getShaderInfoLog(shader),
		);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function createProgram(
	gl: WebGL2RenderingContext,
	vertSource: string,
	fragSource: string,
): WebGLProgram | null {
	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertSource);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
	if (!vertexShader || !fragmentShader) return null;

	const program = gl.createProgram();
	if (!program) return null;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(
			"WebGL program link error:",
			gl.getProgramInfoLog(program),
		);
		gl.deleteProgram(program);
		return null;
	}

	return program;
}

export default function Topography({
	className,
	bgColor = [1.0, 0.988, 0.98], // #fffcfa (--color-neutral-50)
	lineColor = [0.951, 0.939, 0.931], // #f3f0ee (50/50 mix of --color-neutral-50 & --color-neutral-100)
	scale = 16,
	levels = 10,
	lineWidth = 0.5,
}: TopographyProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl2", {
			alpha: false,
			antialias: true,
			powerPreference: "low-power",
		});
		if (!gl) {
			console.warn("WebGL2 is not supported in this browser.");
			return;
		}

		const program = createProgram(
			gl,
			vertexShaderSource,
			fragmentShaderSource,
		);
		if (!program) return;

		// Fullscreen quad (2 triangles)
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);

		const vao = gl.createVertexArray();
		gl.bindVertexArray(vao);

		const positionLoc = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLoc);
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

		// Uniform locations
		const uResolution = gl.getUniformLocation(program, "u_resolution");
		const uTime = gl.getUniformLocation(program, "u_time");
		const uMouse = gl.getUniformLocation(program, "u_mouse");
		const uScroll = gl.getUniformLocation(program, "u_scroll");
		const uBgColor = gl.getUniformLocation(program, "u_bgColor");
		const uLineColor = gl.getUniformLocation(program, "u_lineColor");
		const uScale = gl.getUniformLocation(program, "u_scale");
		const uLevels = gl.getUniformLocation(program, "u_levels");
		const uLineWidth = gl.getUniformLocation(program, "u_lineWidth");

		// Interactive state with smooth damping
		let targetScroll = window.scrollY;
		let currentScroll = window.scrollY;

		const handlePointerMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return;
		};

		const handleScroll = () => {
			targetScroll = window.scrollY / 10;
		};

		const resizeCanvas = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
			const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}
		};

		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(canvas);
		resizeCanvas();

		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		window.addEventListener("scroll", handleScroll, { passive: true });

		let animationFrameId = 0;
		const startTime = performance.now();

		const render = (now: number) => {
			currentScroll += (targetScroll - currentScroll) * 0.05;

			gl.useProgram(program);
			gl.bindVertexArray(vao);

			gl.uniform2f(uResolution, canvas.width, canvas.height);
			gl.uniform1f(uScroll, currentScroll);
			gl.uniform3f(uBgColor, bgColor[0], bgColor[1], bgColor[2]);
			gl.uniform3f(uLineColor, lineColor[0], lineColor[1], lineColor[2]);
			gl.uniform1f(uScale, scale);
			gl.uniform1f(uLevels, levels);
			gl.uniform1f(
				uLineWidth,
				lineWidth * Math.min(window.devicePixelRatio || 1, 2),
			);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
			resizeObserver.disconnect();
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("scroll", handleScroll);
			gl.deleteBuffer(positionBuffer);
			gl.deleteVertexArray(vao);
			gl.deleteProgram(program);
		};
	}, [bgColor, lineColor, scale, levels, lineWidth]);

	return (
		<div className={clsx(styles.container, className)}>
			<canvas
				ref={canvasRef}
				className={styles.canvas}
				aria-hidden="true"
			/>
		</div>
	);
}
